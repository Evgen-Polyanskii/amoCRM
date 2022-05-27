const axios = require('axios');
const { auth } = require('../helpers/auth.js');

class ContactsAPI {
  constructor() {
    this.endpoint = `${process.env.WIDGET_URL}/api/v4/contacts`;
  }

  async findContact(queryParam) {
    const token = await auth();
    const res = await axios.get(`${this.endpoint}?query=${queryParam}`, {
      headers: { Authorization: token },
    });

    return res.data;
  }

  async createContact(data) {
    const token = await auth();
    const contactData = [{
      name: data.name,
      custom_fields_values: [
        {
          field_code: 'PHONE',
          values: [{ value: data.phone }],
        },
        {
          field_code: 'EMAIL',
          values: [{ value: data.email }],
        },
      ],
    }];

    const res = await axios.post(
      this.endpoint,
      contactData,
      {
        headers: { Authorization: token },
      },
    );

    return res.data._embedded.contacts[0].id;
  }

  async updateContact(contact, data) {
    let updated = false;
    const updatedData = {};
    const fields = { phone: 'PHONE', email: 'EMAIL' };

    if (data.name !== contact.name) {
      updatedData.name = data.name;
      updated = true;
    }

    const newCustomFieldsValues = [];

    contact.custom_fields_values.forEach((field) => {
      Object.entries(fields).forEach(([key, value]) => {
        if (field.field_code === value && field.values[0].value !== data[key]) {
          newCustomFieldsValues.push({
            field_id: field.field_id,
            values: [{ value: data[key] }],
          });
          updated = true;
        }
      });
    });

    if (newCustomFieldsValues.length > 0) {
      updatedData.custom_fields_values = newCustomFieldsValues;
    }

    if (updated) {
      const token = await auth();
      await axios.patch(
        `${this.endpoint}/${contact.id}`,
        updatedData,
        {
          headers: { Authorization: token },
        },
      );
    }

    return contact.id;
  }
}

module.exports = ContactsAPI;
