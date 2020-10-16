var express = require('express');
var router = express.Router();
var ORDEN = require('../database/orden');
/* SERVICIOS PARA ORDENES */
router.post('/orden',(req,res,next)=>{
    var datosREST = req.body;
    var ordenDB = new ORDEN(datosREST);
    ordenDB.save((err,docs)=>{
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
      res.status(200).json({"msn" : "Orden registrada correctamente..!!"});
    });
  });
  router.get('/orden',(req, res, next)=> {
    var params = req.query;
    var filter = {};
    var select = {};
    var order = {};
    if(params.cantidad != null){
      var expresion = parseInt(params.cantidad);
      filter["Cantidad"] = expresion;
    };
    if(params.pago != null){
      var expresion = parseInt(params.pago);
      filter["Pagototal"] = expresion;
    };
    if(params.lugar != null){
      var expresion = new RegExp(params.lugar);
      filter["Lugardeenvio"] = expresion;
    };
    if(params.filters != null){
      var select = params.filters.toString().replace(/,/g," ");
    };
    if(params.order != null){
      var data = params.order.split(",");
      var number = parseInt(data[1]);
      order[data[0]] = number;
    };
    ORDEN.find(filter).select(select).sort(order).exec((err,doc)=>{
      if (err){
        res.status(500).json({msn : "Error en el servidor."});
        return;
      };
      res.status(200).json(doc);
      //console.log(doc);
      return;
    });
  });
  router.put('/orden',(req,res,next)=>{
    var params = req.query;
    var datos = req.body;
    if(params.id == null){
      res.status(300).json({msn:"El parametro id es Necesario."});
      return;
    };
    var keylist = ["Cantidad","Lugardeenvio"];
    var keys = Object.keys(datos);
    var updateobjectdata = {};
    for (var i=0;i<keys.length;i++){
      if(keylist.indexOf(keys[i])>-1){
        updateobjectdata[keys[i]] = datos[keys[i]];
      }
    }
    ORDEN.updateOne({_id: params.id}, {$set: updateobjectdata},(err,docs)=>{
      if(err){
        res.status(300).json({msn:"Existen problemas en la base de datos."});
        return;
      }
      res.status(200).json(docs);
      return;
    });
  });
  router.delete('/orden',(req, res, next)=>{ 
    var params = req.query;
    if(params.id==null){
      res.status(300).json({msn: "El parametro ID es necesario para eliminar"});
      return;
    }
    ORDEN.remove({_id: params.id}, (err,docs)=>{
      if(err){
        res.status(500).json({msn: "Existen problemas en la BASE DE DATOS..."});
        console.log(params.id);
        return;
      }
      res.status(200).json(docs);
    });
  });
  
module.exports = router;