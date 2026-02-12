const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user.model');
const { generateJWT } = require('../helpers/generate-jwt');
const e = require('express');

const register = async (req, res = response) => {
    const { name, surname, email, password, role} =req.body;

    try {
        const user = new User({name, surname, email, password, role });
        
        //encripta ls contraseña 
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        // guardar en DB
        await user.save();

        res.status(201).json({
            msg:'Administrador creado exitosamente',
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error al registrar usuario'});

    }
};

const login = async (req, res = response) => {
    const email = req.body.email.toLowerCase().trim();
    const { password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Usuario no es correcto' });

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) return res.status(400).json({ msg: 'Contraseña Incorrecta' });

        const token = await generateJWT(user.id);

        res.json({ user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Comunicarse con el Administrador' });
    }
};

module.exports = { register, login};


