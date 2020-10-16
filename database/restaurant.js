// Nombre, Nit, Propietario, Calle, Telefono, Log, Lat, Logo, fechaderegistro, fotolugar
var mongoose = require('./connect');
var RESTAURANTSCHEMA = mongoose.model('restaurant',{
    Nombre: {
        type: String,
        //required: [true, "El nombre del restaurant es REQUERIDO."],
        default: "None"
    },
    Nit: {
        type: String,
        //required: [true, "El CI o NIT son REQUERIDOS."],
        default: "None"
    },
    Propietario: {
        type: String,
        //required: [true, "El nombre del Propietario es requerido"],
        default: "None"
    },
    Calle: {
        type: String,
        //required: [true, "Es requerida la direccion de su establecimiento o restaurant"],
        default: "None"
    },
    Telefono: {
        type: Number,
        //required: [true, "Es necesario su numero para resivir los pedidos"],
        default: 0
    },
    Logo: {
        type:String
    },
    Fecharegistro: {
        type: Date,
        default: new Date
    },
});
module.exports = RESTAURANTSCHEMA;

