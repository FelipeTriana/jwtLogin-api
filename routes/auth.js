const router = require('express').Router(); 
const User = require('../models/User');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

/*Joi se encarga de hacer las validaciones al meter usuarios xd*/ 
const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    userName: Joi.string().min(6).max(255).required(),
    doc: Joi.string().min(6).max(20).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    nroCuenta: Joi.string().min(11).max(11).required()
})

const schemaLogin = Joi.object({
    userName: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(6).max(1024).required()
})

router.post('/login', async (req, res) => {
    // validaciones
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    if (user.password === req.body.password) {
        const validPassword = user.password;
    } else {
        return res.status(400).json({ error: 'contraseña no válida' })
    }
      
    //El payload esta formado por el nombre del user y el id asignado por mongodb, la segunda parte es la variable de entorno TOKEN_SECRET
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET)

    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })
    
})

router.post('/register', async (req, res) => {
    //Se validan los datos del body antes de crear un usuario
    const { error } = schemaRegister.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })

    const user = new User({
        name: req.body.name,
        userName: req.body.userName,
        doc: req.body.doc,
        email: req.body.email,
        password: req.body.password,
        nroCuenta: req.body.nroCuenta
    });
    try {
        const saveUser = await user.save();
        res.json({
            error: null,
            data: saveUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
})

module.exports = router;