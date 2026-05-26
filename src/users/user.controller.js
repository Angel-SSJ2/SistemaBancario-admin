'use strict';

import { User } from './user.model.js';
import { Account } from '../accounts/account.model.js';

const generateAccountNumber = () =>
    Math.floor(1000000000 + Math.random() * 9000000000).toString();

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ status: true }).select('-__v');
        res.status(200).json({ success: true, total: users.length, users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener usuarios', error: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-__v');
        if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

        const accounts = await Account.find({ userId: user._id.toString(), status: true });
        res.status(200).json({ success: true, user, accounts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener usuario', error: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, surname, email, role, accountType } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ success: false, message: 'El correo ya está registrado' });
        }

        const newUser = await User.create({ name, surname, email, role: role || 'Client' });

        const accountNumber = generateAccountNumber();
        await Account.create({
            accountNumber,
            userId: newUser._id.toString(),
            balance: 0,
            accountType: accountType || 'Ahorro',
        });

        res.status(201).json({
            success: true,
            message: 'Cliente creado con su cuenta bancaria',
            user: newUser,
            accountNumber,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear usuario', error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, name, surname, role } = req.body;

        const updated = await User.findByIdAndUpdate(
            id,
            { email, name, surname, role },
            { new: true, runValidators: true }
        );

        if (!updated) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

        res.status(200).json({ success: true, message: 'Usuario actualizado', user: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar usuario', error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });
        if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

        await Account.updateMany({ userId: id }, { status: false });

        res.status(200).json({ success: true, message: 'Usuario y cuentas desactivados correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al desactivar usuario', error: error.message });
    }
};

export const addExtraAccount = async (req, res) => {
    try {
        const { userId, accountType } = req.body;

        const user = await User.findOne({ _id: userId, status: true });
        if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado o inactivo' });

        const accountNumber = generateAccountNumber();
        const account = await Account.create({
            accountNumber,
            userId,
            balance: 0,
            accountType: accountType || 'Ahorro',
        });

        res.status(201).json({ success: true, message: 'Cuenta adicional creada', account });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al agregar cuenta adicional', error: error.message });
    }
};
