const contacts = require('./contacts.js');
const auth = require('./authorization.js');

const controllers = [contacts, auth];

module.exports = (app) => controllers.forEach((f) => f(app));
