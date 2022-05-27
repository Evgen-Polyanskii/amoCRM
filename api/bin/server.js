#! /usr/bin/env node

const getApp = require('../index.js');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 4000;

getApp().listen(PORT, HOST, (err) => {
  if (err) {
    console.log(`App crashed ${err}`);
    process.exit(1);
  }
  console.log(`Server was started on '${PORT}'`);
});
