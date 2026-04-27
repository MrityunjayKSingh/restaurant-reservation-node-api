const express = require('express');
const services = require('../config/services');
const { forward } = require('../utils/proxy');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: "API Gateway is running" });
});

router.use('/auth', async (req, res) => {
  const result = await forward(req, services.AUTH, 'auth');
  res.status(result.status).json(result.data);
});

router.use('/tables', async (req, res) => {
  const result = await forward(req, services.TABLE, 'tables');
  res.status(result.status).json(result.data);
});

router.use('/reservations', async (req, res) => {
  const result = await forward(req, services.RESERVATION, 'reservations');
  res.status(result.status).json(result.data);
});

module.exports = router;
