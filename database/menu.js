/**Nombre, precio, descripción, fechaderegistro, fotografía del producto.  */
var mongoose = require('./connect');
const database = require('./connect');
var MENUSCHEMA = mongoose.model('menus',{
    Nombre: {
        type: String,
        //required: [true, "Es necesario el nombre del Platillo"],
        default: "None"
    },
    Precio: {
        type: Number,
        //required: [true, "Es necesario poner precio a su Platillo"],
        default: 10
    },
    Descripcion: {
        type: String,
        default: "None"
    },
    Fecharegistro: {
        type: Date,
        default: new Date
    },
    Fotoproducto: {
        type: String,
        required: [true, "Es necesario subir una foto del platillo."]
    }
});
module.exports = MENUSCHEMA;