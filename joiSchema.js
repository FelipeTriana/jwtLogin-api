const Joi = require('@hapi/joi');

const schemaLogin = Joi.object({
    userName: Joi.string().max(255).required(),
    password: Joi.string().min(4).max(255).required()
});



module.exports = {
    schemaLogin
}