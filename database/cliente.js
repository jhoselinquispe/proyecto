var mongoose = require('./connect');
const router = require('../routes/service');
var CLIENTESCHEMA = mongoose.model('cliente',{
    Nombre : {
        type: String,
        required: [true, "EL Nombre es requerido"],
    },
    Apellido : {
        type: String,
        required: [true, "El Apellido es Requerido"],
    },
    Edad : {
        type: Number,
        required: [true, "La edad es requerido"],
    },
    Fecharegistro: {
        type: Date,  // Sera puesta por el servidor de manera automatica.
        default: new Date
    },
    Ci: {
        type: String,
        required: [true, "EL CI o NIT son requeridos"],
        message: props => `${props.value} El CI o NIT son requeridos para su factura.`
    },
    Correo : {
        type: String,
        required: [true, "El correo es necesario"],
        validate: {
            validator: (value) =>{
                //Expresion regular
                return /^[\w\.]+@[\w\.]+\.\w{3,3}$/.test(value);
            },
            message: props => `${props.value} no es valido`
        }
    },
    Password : {
        type: String
    },
    Roles : {
        type: Array,
        default: []
    }
});

module.exports = CLIENTESCHEMA;