var mongoose = require('mongoose');
mongoose.connect("mongodb://172.22.0.2:27017/pedidos",{useNewUrlParser: true});
var database = mongoose.connection;
database.on("error",()=>{
    console.log("ERROR no se puede conectar al servidor de Base de datos.");
});
database.on("open",()=>{
    console.log("Conexion Exitosa");
});
module.exports = database;