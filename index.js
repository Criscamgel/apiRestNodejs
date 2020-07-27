const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Conectar Mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis', {
    useNewUrlParser: true
})

//Creando el servidor
const app = express();

//habilitar bodyparser ---> Podremos leer los valores que pasemos desde Front
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//llamando rutas de la app
app.use('/', routes());


//puerto
app.listen(5000);