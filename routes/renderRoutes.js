const router = require('express').Router();
/*const {
    login,
    register,
    getAllUsers
} = require('./controller/controller');*/

const {
    renderRegisterForm,
    renderLoginForm,
} = require('../controller/rendersController');


/*router.post('/login', login, next);
router.post('/register', register);
router.get('/getAll', getAllUsers);*/

router.get('/', (req, res) => {
    res.render('index')
});
router.get('/renderRegister', renderRegisterForm);
router.get('/renderLogin', renderLoginForm);

module.exports = router;