const express = require('express');
const mongoose = require('mongoose'); 
const bodyparser = require('body-parser');
const authRoutes = require('./routes/auth'); //Importa las rutas
const validarToken = require('./routes/validate-token');
const admin = require('./routes/admin');
require('dotenv').config();

const app = express();

// Configuracion del middleware body-parser para capturar datos del body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Conexión a Base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.qrku5.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(uri, options)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))

//Define la ruta raiz y concatena las rutas de authRoutes xd
app.use('/api/user', authRoutes); 
app.use('/api/admin', validarToken, admin);   //Middleware que valida el token, si el token se valida va a pasar al admin que nos llevara a las rutas

//Pone a correr el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Runing in port: ${PORT}`)
})