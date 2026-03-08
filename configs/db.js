const mongoose = require('mongoose');

/**
 * Establece la conexión con la base de datos MongoDB utilizando la URI definida en las variables de entorno.
 */
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Base de datos conectada exitosamente');
    } catch (error) {
        console.error('Error al conectar la base de datos:', error);
        process.exit(1);
    }
};

module.exports = { dbConnection };