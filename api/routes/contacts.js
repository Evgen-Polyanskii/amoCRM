const _ = require('lodash');
const validate = require('../helpers/validators/contactsValidator.js');
const createDeal = require('../services/createDeal.js');

module.exports = (app) => {
  app
    .get('/', (req, res, next) => {
      try {
        res.status(200).send('Welcome!');
      } catch (err) {
        next(err);
      }
    })
    .get('/contacts', async (req, res, next) => {
      try {
        const errors = validate(req.query);
        if (!_.isEmpty(errors)) {
          res.status(400).json({ errors });
          return;
        }
        await createDeal(req.query);
        res.status(200).send('Deal created!');
      } catch (err) {
        next(err);
      }
    });
};
