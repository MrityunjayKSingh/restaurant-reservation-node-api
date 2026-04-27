const http = require('../config/http');
const createBreaker = require('./circuitBreaker');
const logger = require('./logger');

async function forward(req, targetBaseUrl, stripPrefix) {
  const path = req.originalUrl.replace(new RegExp(`^/${stripPrefix}`), '');
  const url = targetBaseUrl + path;

  const exec = async () => {
    const response = await http({
      method: req.method,
      url,
      data: req.body,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return { status: response.status, data: response.data };
  };

  const breaker = createBreaker(exec);

  try {
    logger.info(`Forwarding ${req.method} ${url}`);
    const result = await breaker.fire();
    return result;
  } catch (err) {
    logger.error(`Gateway error: ${err.message}`);
    if (err.response) {
      return { status: err.response.status, data: err.response.data };
    }
    return { status: 500, data: { message: "Service unavailable", error: err.message } };
  }
}

module.exports = { forward };
