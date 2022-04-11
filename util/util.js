const User = require('../models/User');
const configcn = require('../config');
const jwt = require('jsonwebtoken');
const {
    schemaLogin
} = require('../joiSchema');
const { header } = require('express/lib/request');


const loginUtil = async (req, res) => {
    // Valida con Joi los campos al loguearse
    const {
        error
    } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({
        error: error.details[0].message
    })

    const user = await User.findOne({
        userName: req.body.userName
    });
    if (!user) return res.status(400).json({
        error: 'Usuario no encontrado'
    });

    if (user.password === req.body.password) {
        const validPassword = user.password;
    } else {
        return res.status(400).json({
            error: 'contraseña no válida'
        })
    }

    //El payload esta formado por el nombre del user y el id asignado por mongodb, la segunda parte es la variable de entorno TOKEN_SECRET
    const token = jwt.sign({
        name: user.name,
        userName: user.userName,
        edad: user.edad,
        id: user._id
    }, configcn.TOKEN_SECRET)
    res.set({
        'auth-token': token
      })
    /*res.header('auth-token', token).json({
        error: null,
        data: {
            token
        }
    })*/
    res.redirect('/api/user');//Se añadio esto
    
    

}
 
const registerUtil = async (req, res) => {
 
    const user = new User({
        name: req.body.name,
        userName: req.body.userName,
        password: req.body.password,
        edad: req.body.edad

    });
    try {
        const saveUser = await user.save();
        /*res.json({
            error: null,
            data: saveUser
        })*/
        req.flash('success_msg', 'Registro exitoso!');
        res.redirect('/api/user/users/signin'); //Se añadio esto
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

const listUsers = async (req, res) => {
    User.find({}, function (err, users) {
        let userMap = {};

        users.forEach(function (user) {
            userMap[user._id] = user;
        });

        res.send(userMap);
    });
}

module.exports = {
    loginUtil,
    registerUtil,
    listUsers
}