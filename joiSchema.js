const Joi = require('@hapi/joi');

const schemaLogin = Joi.object({
    userName: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(6).max(1024).required()
});

const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    userName: Joi.string().min(6).max(255).required(),
    doc: Joi.string().min(6).max(20).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    nroCuenta: Joi.string().min(11).max(11).required()
});

module.exports = {
    schemaLogin,
    schemaRegister
}