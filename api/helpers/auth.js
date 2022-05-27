const axios = require('axios');
const models = require('../../db/models');

const saveToken = async (authData) => {
  const data = {
    access_token: authData.access_token,
    refresh_token: authData.refresh_token,
    expires_in: Date.now() + authData.expires_in * 1000,
  };
  const [created] = await models.dataAccess.findOrCreate({
    where: {
      client_id: process.env.AMO_CLIENT_ID,
    },
    defaults: data,
  });

  if (created) {
    await models.dataAccess.update(data, {
      where: {
        client_id: process.env.AMO_CLIENT_ID,
      },
    });
  }
};

const send = async (data) => {
  const address = `${process.env.WIDGET_URL}/oauth2/access_token`;
  const req = await axios.post(address, data);
  await saveToken(req.data);
};

const getAccess = async (code, client_id) => {
  const data = {
    client_id,
    code,
    grant_type: 'authorization_code',
    client_secret: process.env.AMO_CLIENT_SECRET,
    redirect_uri: `${process.env.URL}/authorization`,
  };

  await send(data);
};

const refresh = async (authData) => {
  const data = {
    client_id: authData.client_id,
    refresh_token: authData.refresh_token,
    client_secret: process.env.AMO_CLIENT_SECRET,
    redirect_uri: process.env.URL,
    grant_type: 'refresh_token',
  };

  await send(data);
};

const auth = async () => {
  const client_id = process.env.AMO_CLIENT_ID;
  const authData = await models.dataAccess.findByPk(client_id, { raw: true });

  if (authData.expires_in - Date.now() < 10000) {
    await refresh(authData);
    const [access_token] = await models.dataAccess.findByPk(client_id, {
      attributes: ['access_token'], raw: true,
    });
    return `Bearer ${access_token}`;
  }

  return `Bearer ${authData.access_token}`;
};

module.exports = {
  getAccess,
  auth,
};
