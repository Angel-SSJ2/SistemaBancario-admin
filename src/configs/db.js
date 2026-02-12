const mongoose = require('mongoose');

const dbConnection = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Se conecto a la DB')
    } catch (error) {
        console.log(error)
        console.log('Error al conectar a la DB')
        throw new Error('Error en la conexion')
    }
};

module.exports = { dbConnection };