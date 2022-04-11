const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.methods.matchPassword = async (password) => {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);