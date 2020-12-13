const express = require('express');
const configcn = require('./config');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const authRoutes = require('./routes');
const validarToken = require('./token-validation/validate-token');
const admin = require('./token-validation/admin');
require('dotenv').config();

const app = express();

app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());

// Conexión a la base de datos
const uri = `mongodb+srv://${configcn.USER}:${configcn.PASSWORD}@cluster0.qrku5.mongodb.net/${configcn.DBNAME}?retryWrites=true&w=majority`;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(uri, options)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log('error db:', e))

//Define la ruta raiz y concatena las rutas de authRoutes xd
app.use('/api/user', authRoutes);

//Middleware que valida el token y protege las rutas, si el token es valido va a pasar al admin que nos llevara a las rutas
app.use('/api/admin', validarToken, admin);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Runing in port: ${PORT}`)
})