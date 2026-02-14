// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Rutas
const authRoutes = require('./routes/auth.routes');
// const userRoutes = require('./routes/user.routes');
const accountRoutes = require('./routes/account.routes');
const transactionRoutes = require('./routes/transactions.routes');
const adminRoutes = require('./routes/admin.routes');

// Middlewares
const validateJWT = require('./middlewares/validate-jwt');

const app = express();

// Middlewares globales
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rutas abiertas
app.use('/banco/v1/auth', authRoutes);

// Rutas protegidas por JWT
// app.use('/banco/v1/users', validateJWT, userRoutes);
app.use('/banco/v1/accounts', validateJWT, accountRoutes);
app.use('/banco/v1/transactions', validateJWT, transactionRoutes);

// Rutas de admin → JWT + ADMIN_ROLE
app.use('/banco/v1/admin', adminRoutes);

module.exports = app;
