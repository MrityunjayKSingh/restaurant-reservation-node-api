module.exports = {
  buildResponse: (data) => ({ success: true, data }),
  buildError: (err) => ({ success: false, error: err.message || err })
};
