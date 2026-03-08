const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { dbConnection } = require('./configs/db');
const { corsOptions } = require('./configs/cors-configuration');
const { configureHelmet } = require('./configs/helmet-configuration');
const { apiLimiter } = require('../middlewares/rate-limit');

const app = express();

dbConnection();

app.use(configureHelmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(apiLimiter);

app.use('/api/v1/users', require('./users/user.routes'));
app.use('/api/v1/roles', require('./roles/role.routes'));
app.use('/api/v1/currencies', require('./currencies/currency.routes'));
app.use('/api/v1/services', require('./services/service.routes'));
app.use('/api/v1/accounts', require('./accounts/account.routes'));
app.use('/api/v1/transactions', require('./transactions/transaction.routes'));
app.use('/api/v1/deposits', require('./deposits/deposit.routes'));
app.use('/api/v1/transfers', require('./transfers/transfer.routes'));
app.use('/api/v1/payments', require('./payments/payment.routes'));
app.use('/api/v1/monitoring', require('./monitoring/monitoring.routes'));

module.exports = app;