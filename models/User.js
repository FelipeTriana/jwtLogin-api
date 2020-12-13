const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    ownerName: {
        type: String,
        required: true,
        max: 150
    },
    userName: {
        type: String,
        required: true,
        max: 255
    },
    ownerId: {
        type: String,
        required: true,
        max: 20
    },
    maxTransferAmount: {
        type: Number,
        required: true,
        minlength: 6,
        maxlength: 8
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
        max: 4,
        min: 4    //4 pass
    },
    ownerAccounts: {
        type: Array,
        required: true,
        min: 11,
        max: 11
    },
  
})

module.exports = mongoose.model('User', userSchema);