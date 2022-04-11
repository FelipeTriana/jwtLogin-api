const passport = require('passport');

const renderSigninForm = (req, res) => {
    res.render('users/signin');
}

const signin = passport.authenticate('local',{
    failureRedirect: '/api/user/users/signin',
    successRedirect: '/api/game/renderWelcome',
    failureFlash: true
});

const logout = (req, res) => {
    res.send('logout');
}

module.exports = {
renderSigninForm,
signin,
logout
}