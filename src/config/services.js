module.exports = {
  AUTH: process.env.AUTH_SERVICE_URL || "http://localhost:3003",
  TABLE: process.env.TABLE_SERVICE_URL || "http://localhost:3001",
  RESERVATION: process.env.RESERVATION_SERVICE_URL || "http://localhost:3002"
};
