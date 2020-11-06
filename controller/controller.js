const {
    loginUtil,
    registerUtil,
    listUsers
} = require('../util/util');

const login = (req, res) => {
    loginUtil(req, res);
}

const register = (req, res) => {
    registerUtil(req, res);
}

const getAllUsers = (req, res) => {
    listUsers(req, res);
}

module.exports = {
    login,
    register,
    getAllUsers
}