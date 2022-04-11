const router = require('express').Router();
const {
    login,
    register,
    getAllUsers
} = require('../controller/controller');

/*const {
    renderRegisterForm,
    renderLoginForm,
    renderWelcome
} = require('./controller/rendersController');*/


router.post('/login', login);
router.post('/register', register);
router.get('/getAll', getAllUsers);

/*router.get('/', (req, res) => {
    res.render('index')
});
router.get('/renderRegister', renderRegisterForm);
router.get('/renderLogin', renderLoginForm);
router.get('/renderWelcome', renderWelcome)*/

module.exports = router;