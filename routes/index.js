const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productoController = require('../controllers/productoController');
const pedidoController = require('../controllers/pedidoController');

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

    //Mostrar todos los productos
    router.get('/productos', productoController.mostrarProductos);

    //Mostrar producto por ID
    router.get('/productos/:idProducto', productoController.mostrarProducto);

    //Actualizar Producto
    router.put('/productos/:idProducto', 
        productoController.subirArchivo,
        productoController.actualizarProducto
        );

    //Borrar Producto
    router.delete('/productos/:idProducto', productoController.eliminarProducto);

    /* ** Pedidos ** */
    //Crear Pedido
    router.post('/pedidos', pedidoController.crearPedido);
    //Ver todos los pedidos
    router.get('/pedidos', pedidoController.mostrarPedidos);
    //Ver Pedido por ID
    router.get('/pedidos/:idPedido', pedidoController.mostrarPedido);
    //Actualizar Pedido por ID
    router.put('/pedidos/:idPedido', pedidoController.actualizarPedido);
    //Eliminar Pedido por ID
    router.delete('/pedidos/:idPedido', pedidoController.eliminarPedido);



    return router;
}