const router = require('express').Router();
const {
    login,
    register,
    getAllUsers
} = require('./controller/controller');

router.post('/login', login);
router.post('/register', register);
router.get('/getAll', getAllUsers);

module.exports = router;