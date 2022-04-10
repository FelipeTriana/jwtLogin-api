const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 150
    },
    userName: {
        type: String,
        required: true,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 4,
        min: 4    //4 pass
    },
    edad: {
        type: String,
        required: true,
        min: 11,
        max: 11
    },
  
})

module.exports = mongoose.model('User', userSchema);