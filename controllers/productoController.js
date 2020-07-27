const Productos = require('../models/productos');

const multer = require('multer'); //Dependencia controladora de Archivos
const shortid = require('shortid');

/* Almacenamiento de imagen por medio de API Rest */
// Opciones de Multer
const configuracionMulter = {
    //Limites de peso de documento
    //limits : { fileSize : 100000 },
    storage: fileStorage = multer.diskStorage({
        destination : (req, file, cb) => {
            cb(null, __dirname+'../../uploads');
        }, 
        filename : (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
            // el callback se ejecuta como true o false : true cuando la imagen se acepta
            cb(null, true);
        } else {
            cb(new Error('Formato No Válido'));
        }
    }
}

const upload = multer(configuracionMulter).single('imagen');

/* Termina, imagen por API Rest */

//Subir Archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if (error){
            res.json({ mensaje: error })
        }else{
            return next();
        }
    })
}

exports.crearProducto = async (req, res, next) => {
    const producto = new Productos(req.body);
    try {
        if(req.file.filename){
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({
            mensaje: 'Se agrego un producto correctamente'
        })
    } catch (error) {
        console.log(error);
        next();
    }
}