const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || "secret";

module.exports = function auth(req, res, next) {
  if (req.path.startsWith('/auth') || req.path === '/health') return next();

  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token provided" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
