const Clientes = require('../models/clientes');

//agrega un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body);

    try {
        //Almacenar Registro
        await cliente.save();
        res.json({
            //Esta es la respuesta de request
            mensaje: 'Se agrego un nuevo cliente'
        })
    } catch (error) {
        //Mensaje de error
        console.log(error);
        //Es para que se valla al siguiente Midleware
        next();
        
    }
    
}

//Muestra todos los clientes
exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
        
        
    }
}

//Mostrar cliente por ID
exports.mostrarCliente = async (req, res, next) => {
    const cliente = await Clientes.findById(req.params.idCliente);
    
    if(!cliente) {
        res.json({mensaje: 'Ese cliente no existe'});
        return next();
    }
    res.json(cliente);
}

// Actualizar Cliente por id
exports.actualizarCliente = async (req, res,next) => {

    try {
        const cliente = await Clientes.findOneAndUpdate({ _id: req.params.idCliente },
            req.body, {
                new: true
            });
            res.json(cliente);
    } catch (error) {
        console.log(error);
        next();
    }

}

// Eliminar CLiente por Id
exports.eliminarCliente = async (req, res, next) => {
    try {
        await Clientes.findOneAndDelete({_id: req.params.idCliente});        
        res.json({mensaje: 'El cliente se ha eliminado' });
    } catch (error) {
        console.log(error);
        next();
    }
}
