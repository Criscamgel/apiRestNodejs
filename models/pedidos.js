const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pedidosSchema = new Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: 'clientes'
    },
    pedido: [{
        producto: {
            type: Schema.ObjectId,
            ref: 'productos'
        },
        cantidad: Number
    }],
    total: {
        type: Number
    }

});

module.exports = mongoose.model('pedidos', pedidosSchema);