const Notification = require('../models/notification.model');

const getNotifications = async (req, res) => {
    try {

        // Admin puede ver todas las notificaciones
        const notifications = await Notification.find();

        res.json({
            success: true,
            notifications
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Error al obtener notificaciones'
        });
    }
};

module.exports = { getNotifications };
