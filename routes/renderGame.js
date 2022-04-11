const router = require('express').Router();


const {
    renderWelcome
} = require('../controller/rendersController');


router.get('/renderWelcome', renderWelcome)

module.exports = router;