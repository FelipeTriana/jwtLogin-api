const express = require('express');
const configcn = require('./config');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const exphbs = require('express-handlebars');
const cors = require('cors');
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport');

const authRoutes = require('./routes/routes');
const renderRoutes = require('./routes/renderRoutes')
const renderGame = require('./routes/renderGame')
const userRoutes = require('./routes/user.routes')


const path = require('path');

require('dotenv').config();

const app = express();
require('./config/passport')

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


//Views
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));


//Middlewares
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg')
    next();
});

// Conexión a la base de datos
const uri = `mongodb+srv://root:root@cluster0.anjrj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(uri, options)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log('error db:', e))


//Rutas
app.use('/api/user', authRoutes);
app.use('/api/user', renderRoutes);
app.use('/api/user', userRoutes);
app.use('/api/game',renderGame);
app.use(cors);

const PORT = process.env.PORT || 3001;


app.set('view engine', '.hbs')

//Server
app.listen(PORT, () => {
    console.log(`Runing in port: ${PORT}`)
})