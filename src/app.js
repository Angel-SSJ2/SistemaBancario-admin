const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/banco/v1/auth', authRoutes);

module.exports = app;
// Exportamos la configuración
module.exports = app; 

