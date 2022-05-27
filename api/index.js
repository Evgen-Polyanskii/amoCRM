const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const addRoutes = require('./routes/index.js');

module.exports = () => {
  const app = express();
  app.use(bodyParser.json());
  addRoutes(app);
  app.use((req, res) => res.status(404).json({
    message: 'Page not found',
  }));
  app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ /* eslint no-unused-vars: 0 */
      message: 'Something went wrong, please try again',
    });
  });
  return app;
};
