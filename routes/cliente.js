var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var CLIENTE = require('../database/cliente');
//SERVICIOS PARA CLIENTES
router.post('/cliente',(req, res, next)=>{
    var datosREST = req.body;
    if(datosREST.Password == null){
      res.status(300).json({msn : "El Password es necesario"});
      return;
    }
    if (!/[\w]+/.test(datosREST.Password)){
      res.status(300).json({msn : "Es necesario tener letras en su Password"});
      return;
    }
    if (!/[A-Z]+/.test(datosREST.Password)){
      res.status(300).json({msn : "Es Necesario 1 Mayuscula en su Password"});
      return;
    }
    if (!/[\@\#\!\$\%\^\&\*\(\)\_\+\-\=\]\[\{\}\;\:\'\"\/\?\.\>\,\<]+/.test(datosREST.Password)){
      res.status(300).json({msn : "Es necesario un simbolo para su Password."});
      return;
    }
    datosREST.Password= sha1(datosREST.Password);
    var clienteDB = new CLIENTE(datosREST);
    clienteDB.save((err,docs)=>{
      if(err){
        var errors = err.errors;
        var key = Object.keys(errors);
        var msn = {};
        for (var i=0;i<key.length;i++){
          msn[key[i]] = errors[key[i]].message;
        }
        res.status(500).json(docs);
        return;
      }      
      res.status(200).json({"msn" : "Cliente registrada correctamente..!!"});
      
    });
});
router.get('/cliente',(req, res, next)=> {
  var params = req.query;
  var filter = {};
  var select = {};
  var aux = {};
  var order = {};
  if(params.nombre != null){
    var expresion = new RegExp(params.nombre);
    filter["Nombre"] = expresion;
    console.log(filter);
  };
  if(params.apellido != null){
    var expresion = new RegExp(params.apellido);
    filter["Apellido"] = expresion;
    console.log(filter);
  };
  if(params.edad != null){
    var expresion = parseInt(params.edad);
    filter["Edad"] = expresion;
    console.log(filter);
  };
  if(params.ci != null){
    var expresion = new RegExp(params.ci);
    filter["Ci"] = expresion;
  };
  if(params.filters != null){
    var select = params.filters.toString().replace(/,/g," ");
  };
  if(params.edadgt != null){
    var gt = parseInt(params.edadgt);
    aux["$gt"] = gt;
  };
  if(params.edadlt != null){
    var lt = parseInt(params.edadlt);
    aux["$lt"] = lt;
  };
  if(aux != {}){
    filter["Edad"] = aux;
    //console.log(filter);
  };
  if(params.order != null){
    var data = params.order.split(",");
    var number = parseInt(data[1]);
    order[data[0]] = number;
  };
  CLIENTE.find(filter).select(select).sort(order).exec((err,doc)=>{
    if (err){
      res.status(500).json({msn : "Error en el servidor."});
      return;
    };
    res.status(200).json(doc);
    //console.log(doc);
    return;
  });
});
router.put('/cliente',(req,res,next)=>{
  var params = req.query;
  var datos = req.body;
  if(params.id == null){
    res.status(300).json({msn:"El parametro id es Necesario."});
    return;
  };
  var keylist = ["Nombre","Apellido","Edad"];
  var keys = Object.keys(datos);
  var updateobjectdata = {};
  for (var i=0;i<keys.length;i++){
    if(keylist.indexOf(keys[i])>-1){
      updateobjectdata[keys[i]] = datos[keys[i]];
    }
  }
  CLIENTE.updateOne({_id: params.id}, {$set: updateobjectdata},(err,docs)=>{
    if(err){
      res.status(300).json({msn:"Existen problemas en la base de datos."});
      return;
    }
    res.status(200).json(docs);
    return;
  });
});
router.delete('/cliente',(req, res, next)=>{ 
  var params = req.query;
  if(params.id==null){
    res.status(300).json({msn: "El parametro ID es necesario para eliminar"});
    return;
  }
  CLIENTE.remove({_id: params.id}, (err,docs)=>{
    if(err){
      res.status(500).json({msn: "Existen problemas en la BASE DE DATOS..."});
      console.log(params.id);
      return;
    }
    res.status(200).json(docs);
  });
});
module.exports = router;