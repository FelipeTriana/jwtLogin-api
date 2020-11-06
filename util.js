const User = require('./models/User');
const jwt = require('jsonwebtoken');
const {
    schemaLogin,
    schemaRegister
} = require('./joiSchema');


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
        id: user._id
    }, process.env.TOKEN_SECRET)

    res.header('auth-token', token).json({
        error: null,
        data: {
            token
        }
    })

}

const registerUtil = async (req, res) => {
    //Se validan los datos del body con Joi antes de crear un usuario
    const {
        error
    } = schemaRegister.validate(req.body);
    if (error) return res.status(400).json({
        error: error.details[0].message
    })

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