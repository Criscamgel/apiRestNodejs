const Pedidos = require('../models/pedidos');

exports.crearPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({
            mensaje: 'Pedido creado correctamente'
        })
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'productos'
        });
        res.json(pedidos)
    } catch (error) {

        console.log(error);
        next();
                
    }
}

//Mostrar Pedido por ID
exports.mostrarPedido = async (req, res, next) => {
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path: 'pedido.producto',
        model: 'productos'
    });

    if(!pedido) {
        res.json({ mensaje: 'Pedido no existente' });
        return next();
    }
    //Mostrando el pedido encontrado
    res.json(pedido);
}

//Actualizar Pedido
exports.actualizarPedido = async (req, res, next) => {
    try {
        // Construir un nuevo pedido
        const pedido = await Pedidos.findOneAndUpdate({ _id: req.params.idPedido},
            req.body, {
                new: true
            }).populate('cliente').populate({
                path: 'pedido.producto',
                model: 'productos'
            });

            res.json(pedido);
    } catch (error) {
      console.log(error);
      next();  
    }
}

exports.eliminarPedido = async (req, res, next) => {
    try {
        await Pedidos.findByIdAndDelete({_id: req.params.idPedido});
        res.json({ mensaje: 'Pedido eliminado correctamente' })
    } catch (error) {
        console.log(error);
        next();
    }
}
