var mongoose = require('./connect');
var ORDENSCHEMA = mongoose.model('orden',{
    Idmenu:{
        type: Number,
        required: [true,"necesario asignar un id de MENU por el momento."]
    },
    Idrestaurant:{
        type: Number,
        required: [true,"necesario asignar un id de RESTAURANT por el momento."]
    },
    Cantidad:{
        type: Number,
        required: [true,"Es requerido decir la cantidad de su ORDEN"]
    },
    Idcliente:{
        type: Number,
        required: [true,"necesario asignar un id de CLIENTE por el momento."]
    },
    Lugardeenvio: {
        type: Array,
        required: [true,"Es requerido enmarcar donde se realizara el envio."] 
    },
    Pagototal:{
        type: Number,   
    }
});
module.exports=ORDENSCHEMA;