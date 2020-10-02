'use strict'
const express = require('express');
const cors = require('cors');
const {Oportunity} = require('../controllers/Oportunity') 
const {limitDiferencilaDist} = require('../controllers/limitDiferencilaDist') 
const {CalculatorDist} = require('../utils/CalculatorDist');
const Verify = express();

/**DEFINICION KEY ACCESO */
const ACCES_CODE = 'aff0f319f1b423322999c00aa6872843';
/**CONFIGURACION EXPRESS */
Verify.use(cors({ origin: true }));
Verify.use(express.json());
Verify.use(express.urlencoded({ extended: true }));

//Ruta creacion de tareas
Verify.post('/V1',async (req, res, next) => {
try {
  const {lat,lng} = req.body;
  if (ACCES_CODE !== req.headers.http_x_hash) {
    return next(new Error('Access denied, unauthorized request'));
   }
  const op = new Oportunity();
  const calc = CalculatorDist.init();
  const limit= new limitDiferencilaDist();
  const {value} = await limit.getLimit();
  let registred = false;
  const data = await op.getListNotFill();
  data.map( reg => {
    let valor = calc.getDistanceByCoords(
      {
        x: reg.coordinates.lat,
        y: reg.coordinates.lng
      },
      {
        x: lat,
        y: lng
      }
      )
      
      if(valor*1000 < value){
        registred = true
      }
      return null
  })
  return res.status(200).json({
    data:{
      registred
    } ,
    responseError: null
  });
 } catch (error) {
   const notifyError= error.origin ? error.Mensaje:error.toString()
  return  next(new Error(notifyError))
 }
});


// conytrol de errore en llamado de funciom control de tareas
Verify.use((error, req, res, next) => {
  if (error) {
    console.log(error.number);
    return res.status(500).json({
      responseError: error.message,
      data:[]
    });
  }
  return next();
});


exports.Verify = Verify;