

const renderRegisterForm = (req, res) => {
    res.render('users/register');
}

const renderLoginForm = (req, res) => {
    res.render('users/login');
}

const renderWelcome = (req, res) => {
    console.log(req.header)
    res.render('users/welcome');
}

module.exports = {
    renderRegisterForm,
    renderLoginForm,
    renderWelcome
}