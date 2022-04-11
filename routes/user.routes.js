const {
    logout,
    signin,
    renderSigninForm
} = require('../controller/users.controller');

const passport = require('passport');
const { Router } = require('express');
const router = Router()

router.get('/users/signin',renderSigninForm)

router.post('/users/signin', passport.authenticate('local',{
    failureRedirect: '/api/user/users/signin',
    successRedirect: '/api/game/renderWelcome',
    failureFlash: true
}))

router.get('/users/logout', logout)

module.exports = router;