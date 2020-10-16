var express = require('express');
var router = express.Router();
var MENUS = require('../database/menu');
/* SERVICIOS PARA MENUS */
router.post('/menus',(req,res,next)=>{
    var datosREST = req.body;
    var menusDB = new MENUS (datosREST);
    menusDB.save((err,docs)=>{
      if(err){
        var errors = err.errors;
        var key = Object.keys(errors);
        var msn = {};
        for (var i=0;i<key.length;i++){
          msn[key[i]] = errors[key[i]].message;
        }     
        res.status(500).json(msn);
        return;
      }
      res.status(200).json({
        "msn" : "Menu Registrado con exito...>!!!"
      });
    });
  });
  router.get('/menus',(req, res, next)=> {
    var params = req.query;
    var filter = {};
    var select = {};
    var aux = {};
    var order = {};
    if(params.nombre != null){
      var expresion = new RegExp(params.nombre);
      filter["Nombre"] = expresion;
    };
    if(params.filters != null){
      var select = params.filters.toString().replace(/,/g," ");
    };
    if(params.preciogt != null){
      var gt = parseInt(params.preciogt);
      aux["$gt"] = gt;
    };
    if(params.preciolt != null){
      var lt = parseInt(params.preciolt);
      aux["$lt"] = lt;
    };
    if(aux != {}){
      filter["Precio"] = aux;
      //console.log(filter);
    };
    if(params.order != null){
      var data = params.order.split(",");
      var number = parseInt(data[1]);
      order[data[0]] = number;
    };
    MENUS.find(filter).select(select).sort(order).exec((err,doc)=>{
      if (err){
        res.status(500).json({msn : "Error en el servidor."});
        return;
      };
      res.status(200).json(doc);
      //console.log(doc);
      return;
    });
  });
  router.put('/menus',(req,res,next)=>{
    var params = req.query;
    var datos = req.body;
    if(params.id == null){
      res.status(300).json({msn:"El parametro id es Necesario."});
      return;
    };
    var keylist = ["Nombre","Precio","Descripcion","Fotoproducto"];
    var keys = Object.keys(datos);
    var updateobjectdata = {};
    for (var i=0;i<keys.length;i++){
      if(keylist.indexOf(keys[i])>-1){
        updateobjectdata[keys[i]] = datos[keys[i]];
      }
    }
    MENUS.updateOne({_id: params.id}, {$set: updateobjectdata},(err,docs)=>{
      if(err){
        res.status(300).json({msn:"Existen problemas en la base de datos."});
        return;
      }
      res.status(200).json(docs);
      return;
    });
  });
  router.delete('/menus',(req, res, next)=>{ 
    var params = req.query;
    if(params.id==null){
      res.status(300).json({msn: "El parametro ID es necesario para eliminar"});
      return;
    }
    MENUS.remove({_id: params.id}, (err,docs)=>{
      if(err){
        res.status(500).json({msn: "Existen problemas en la BASE DE DATOS..."});
        console.log(params.id);
        return;
      }
      res.status(200).json(docs);
    });
  });
  router.get('/getfilemenu',async(req,res)=>{
    var parmas = req.query;
    //console.log(parmas);
    if(parmas == null){
      res.status(300).json({msn : "Error es necesario un ID"});
      return;
    }
    var idRes = parmas.id;
    var imagenDB = await MENUS.find({_id: idRes});
    if(imagenDB.length > 0){
      var path = imagenDB[0].Fotoproducto;
      res.sendFile(path);
      return;
    }
    res.status(300).json({msn: "error en la peticion"});
  });
module.exports = router;