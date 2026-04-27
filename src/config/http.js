const axios = require('axios');

const timeout = parseInt(process.env.REQUEST_TIMEOUT_MS || "5000", 10);

const http = axios.create({
  timeout
});

module.exports = http;
