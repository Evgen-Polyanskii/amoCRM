const axios = require('axios');
const { auth } = require('../helpers/auth.js');

class LeadsAPI {
  constructor() {
    this.endpoint = `${process.env.WIDGET_URL}/api/v4/leads`;
  }

  async createLeads(contactId) {
    const token = await auth();
    const leads = [{
      _embedded: {
        contacts: [
          { id: contactId },
        ],
      },
    }];

    await axios.post(this.endpoint, leads, {
      headers: { Authorization: token },
    });
  }
}

module.exports = LeadsAPI;
