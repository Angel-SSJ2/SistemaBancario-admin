// src/models/transactions.model.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: [true, 'La cuenta es requerida'],
    },
    type: {
      type: String,
      enum: ['DEPOSITO', 'RETIRO', 'TRANSFERENCIA'],
      required: true,
    },
    amount: {
      type: Number,
      required: [true, 'El monto es requerido'],
      min: [0.01, 'El monto debe ser mayor a 0'],
    },
    currency: {
      type: String,
      default: 'GTQ',
    },
    description: {
      type: String,
      trim: true,
      maxLength: [200, 'La descripción no puede exceder 200 caracteres'],
    },
    status: {
      type: String,
      enum: ['COMPLETADA', 'PENDIENTE', 'RECHAZADA'],
      default: 'COMPLETADA',
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // quién realizó la operación
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
