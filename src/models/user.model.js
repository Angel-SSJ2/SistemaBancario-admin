const { Schema, model } = require('mongoose');
const userSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombr es obligatorio']
    }, 

    surname: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },

    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },

    password:{
        type:String,
        required: [true, 'La contraseña es obligatoria']
    },

    role:{
        type: String,
        required: true,
        enum:['ADMIN_ROLE', 'CLIENT_ROLE'],
        default: 'CLIENT_ROLE'
    },

    status:{
        type: Boolean,
        default: true
    }

});
//no devolver contraseña en respuestas json
userSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
};

module.exports = model('User', userSchema);