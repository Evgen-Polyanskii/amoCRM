const { getAccess } = require('../helpers/auth.js');

module.exports = (app) => {
  app
    .get('/authorization', async (req, res, next) => {
      try {
        const { code, client_id } = req.query;
        await getAccess(code, client_id);
        res.status(200).send('Access received');
      } catch (err) {
        next(err);
      }
    });
};
