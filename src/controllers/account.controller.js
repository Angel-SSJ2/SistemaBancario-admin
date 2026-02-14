// src/controllers/account.controller.js
const Account = require('../models/account.model');
const Audit = require('../models/audit.model');

// Ver cuentas
const getAccounts = async (req, res) => {
    try {
        let accounts;

        if (req.user.role === 'ADMIN_ROLE') {
            // Admin ve todas las cuentas
            accounts = await Account.find().populate('owner', 'name surname email');
        } else {
            // Cliente ve solo sus cuentas
            accounts = await Account.find({ owner: req.user.uid }).populate('owner', 'name surname email');
        }

        res.status(200).json({ success: true, accounts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: 'Error al obtener cuentas' });
    }
};

// Crear cuenta → solo ADMIN_ROLE
const createAccount = async (req, res) => {
    try {
        const { owner, type } = req.body;

        // Generar número de cuenta aleatorio
        const accountNumber = Math.floor(100000 + Math.random() * 900000).toString();

        const account = new Account({
            owner,
            type,
            accountNumber
        });

        await account.save();

        // Registrar auditoría
        await Audit.create({
            adminId: req.user.uid,
            action: 'CREAR_CUENTA',
            targetId: owner,
            description: `Cuenta creada por ${req.user.name}`,
            ipAddress: req.ip
        });

        res.status(201).json({ success: true, account });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: 'Error al crear cuenta' });
    }
};

module.exports = { getAccounts, createAccount };
