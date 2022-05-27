const _ = require('lodash');
const ContactsAPI = require('../repositories/ContactsAPI.js');
const LeadsAPI = require('../repositories/LeadsAPI.js');

module.exports = async (query) => {
  const { email, phone } = query;
  const contactsAPI = new ContactsAPI();
  const leadsAPI = new LeadsAPI();
  const allFindContact = await contactsAPI.findContact(email);
  const contacts = [];
  if (allFindContact) {
    const requiredContact = allFindContact._embedded.contacts.filter(({ custom_fields_values }) => {
      let result = false;
      custom_fields_values.forEach((fields) => {
        if (fields.field_code === 'PHONE') {
          result = fields.values[0].value === phone;
        }
      });
      return result;
    });
    contacts.push(...requiredContact);
  }

  if (_.isEmpty(contacts)) {
    const contact = await contactsAPI.findContact(phone);
    if (contact) contacts.push(contact._embedded.contacts[0]);
  }

  const contactId = !_.isEmpty(contacts)
    ? await contactsAPI.updateContact(contacts[0], query)
    : await contactsAPI.createContact(query);

  await leadsAPI.createLeads(contactId);
};
