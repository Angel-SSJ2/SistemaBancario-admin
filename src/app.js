const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { dbConnection } = require('./configs/db');

const app = express();



// Conectar a la base de datos
dbConnection();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

module.exports = app;6