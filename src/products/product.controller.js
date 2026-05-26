'use strict';

import { Product } from './product.model.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: true }).select('-__v');
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener productos', error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, type, rate } = req.body;
        const product = await Product.create({ name, description, type, rate });
        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear producto', error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        res.status(200).json({ success: true, message: 'Producto actualizado', product: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar producto', error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true });
        if (!product) return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        res.status(200).json({ success: true, message: 'Producto desactivado' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al desactivar producto', error: error.message });
    }
};
