const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productoController = require('../controllers/productoController');

module.exports = function() {
    /* router.get('/', (req, res) => {
        res.send('inicio')
    });
    router.get('/nosotros', (req, res) => {
        res.send('nosotros')
    }) */

    // Agrega nuevos clientes via post
    router.post('/clientes', clienteController.nuevoCliente);

    // Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes);

    //Muestra un cliente por ID
    router.get('/clientes/:idCliente', clienteController.mostrarCliente);

    // Actualizar Cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    // Eliminar Cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);

    // Productos
    //Crear Producto
    router.post('/productos', 
        productoController.subirArchivo,
        productoController.crearProducto
        );

    return router;
}