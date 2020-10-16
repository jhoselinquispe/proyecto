var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var CLIENTE = require('../database/cliente');
var fileUpload = require('express-fileupload');
var MENUS = require('../database/menu');
var RESTAURANT = require('../database/restaurant');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
      msn :   "Conexion a Servicios Completa"
  });
});
//SERVICIO PARA LOGIN
router.post('/login', async (req,res)=>{
  var params = req.body;
  if(params.Correo==null){
    res.status(200).json({msn : "El Correo es Necesario para logear"});
    return;
  }
  if(params.Password==null){
    res.status(200).json({msn : "Es necesario introducir su password"});
    return;
  }
  var result = await CLIENTE.find({Correo: params.Correo, Password: sha1(params.Password)});
  if(result.length == 1){
    res.status(200).json({msn:"Bienvenido al Sistema"});
    return;
  } else {
    res.status(200).json({msn:"Credenciales incorrectas"});
  }
  
});

//SERVICIO PARA GUARDAR IMAGEN PRUEBA
router.use(fileUpload({
 limits: { fileSize: 50 * 1024 * 1024 }
}));

router.post('/imgmenu',(req,res)=>{
var imagen = req.files.image;
var path = __dirname.replace(/\/routes/g,("/img"));
var date = new Date();
var sign =  sha1(date.toString().substr(1,5));
var obj = {};
var pathMenu = path + "/" + sign + "_" + imagen.name.replace(/\s/g,"_");
imagen.mv(pathMenu,(err) =>{
  if(err){
    return res.status(300).send({msn : "Error al subir la iamgen al servidor."})
  }
  var rutaMenu = pathMenu.toString();
  /*obj['Fotoproducto'] = ruta;
  var menuDB = new MENUS(obj);
  menuDB.save().then((docs,err)=>{
    if(err){
      res.status(300).send({msn : "Error al almacenar la imagen en laBD"});
      return;
    }
    res.status(200).json ({msn:"Imagen del menu registrado"});
  });*/
  res.status(200).json({msn: rutaMenu});
  });
});

router.post('/imglogo',(req,res)=>{
  var imagen = req.files.image;
  var path = __dirname.replace(/\/routes/g,("/imgLogo"));
  var date = new Date();
  var sign =  sha1(date.toString().substr(1,5));
  var pathRestaurant = path + "/" + sign + "_" + imagen.name.replace(/\s/g,"_");
  obj = {}
  imagen.mv(pathRestaurant,(docs, err) =>{
    if(err){
      res.status(300).send({msn : "Error al subir la imagen al servidor."});
    }
    var rutaLogo = pathRestaurant.toString();
    /*obj['Logo'] = rutaLogo;
    var restaurantDB = new RESTAURANT(obj);
    restaurantDB.save().then((docs,err)=>{
      if(err){
        res.status(300).send({msn : "Error al almacenar la imagen en laBD"});
        return;
      }
      res.status(200).json ({msn:"Imagen de logo registrado"});
    });*/
    res.status(200).json({msn: rutaLogo});
    
    });
  });
   
module.exports = router;