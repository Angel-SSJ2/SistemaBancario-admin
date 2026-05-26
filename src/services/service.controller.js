'use strict';

import { Service } from './service.model.js';

export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find({ active: true }).select('-__v');
        res.status(200).json({ success: true, total: services.length, services });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener servicios', error: error.message });
    }
};

export const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id).select('-__v');
        if (!service || !service.active) {
            return res.status(404).json({ success: false, message: 'Servicio no encontrado' });
        }
        res.status(200).json({ success: true, service });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el servicio', error: error.message });
    }
};

export const createService = async (req, res) => {
    try {
        const { name, description, price, currency } = req.body;

        const existingService = await Service.findOne({ name });
        if (existingService) {
            return res.status(409).json({ success: false, message: 'El servicio ya existe' });
        }

        const newService = await Service.create({
            name,
            description,
            price,
            currency: currency || 'MXN',
        });

        res.status(201).json({ success: true, message: 'Servicio creado', service: newService });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear el servicio', error: error.message });
    }
};

export const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, currency, active } = req.body;

        const updated = await Service.findByIdAndUpdate(
            id,
            { name, description, price, currency, active },
            { new: true, runValidators: true }
        ).select('-__v');

        if (!updated) {
            return res.status(404).json({ success: false, message: 'Servicio no encontrado' });
        }

        res.status(200).json({ success: true, message: 'Servicio actualizado', service: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar el servicio', error: error.message });
    }
};

export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Service.findByIdAndUpdate(id, { active: false }, { new: true });

        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Servicio no encontrado' });
        }

        res.status(200).json({ success: true, message: 'Servicio desactivado correctamente', service: deleted });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al desactivar el servicio', error: error.message });
    }
};
