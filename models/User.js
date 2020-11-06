const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    userName: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    doc: {
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    nroCuenta: {
        type: String,
        required: true,
        min: 11,
        max: 11
    }  
})

module.exports = mongoose.model('User', userSchema);