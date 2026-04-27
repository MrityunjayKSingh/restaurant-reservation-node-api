require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const auth = require('./middleware/auth');
const rateLimiter = require('./middleware/rateLimiter');
const routes = require('./routes');
const logger = require('./utils/logger');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan('combined'));
app.use(rateLimiter);
app.use(auth);

app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`🚀 Enterprise API Gateway running on port ${port}`);
});
