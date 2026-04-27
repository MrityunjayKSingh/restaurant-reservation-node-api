const CircuitBreaker = require('opossum');

module.exports = function createBreaker(fn) {
  const options = {
    timeout: parseInt(process.env.REQUEST_TIMEOUT_MS || "5000", 10),
    errorThresholdPercentage: 50,
    resetTimeout: 10000
  };
  const breaker = new CircuitBreaker(fn, options);

  breaker.fallback(() => {
    return { fallback: true, message: "Service temporarily unavailable" };
  });

  return breaker;
};
