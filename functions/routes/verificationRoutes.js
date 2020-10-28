'use strict'
const express = require('express');
const cors = require('cors');
const {Oportunity} = require('../controllers/Oportunity') 
const {limitDiferencilaDist} = require('../controllers/limitDiferencilaDist') 
const {CalculatorDist} = require('../utils/CalculatorDist');
const  AllocationPoints  = require('../controllers/allocatinsPoints');
const  ClientHeadquarters  = require('../controllers/ClientHeadquarters');

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
  const allocationIntace = new AllocationPoints()
  const clientHeadquartersInstance = new ClientHeadquarters();
  const Headquarters =await clientHeadquartersInstance.getAll()
  const op = new Oportunity();
  const calc = CalculatorDist.init();
  const limit= new limitDiferencilaDist();
  const {value} = await limit.getLimit();
  const data = await op.getListNotFill();
  let increment = 0,oportunityCodeRegister = null,registred = false, asignationPoints = false;

  do {
    let reg = data[increment]
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
        oportunityCodeRegister = data[increment].codigo;
        registred = true;
      }
      increment++
  } while (increment < data.length && !registred);

  increment = 0

  do {
    let reg = Headquarters[increment]
    let valor = calc.getDistanceByCoords(
      {
        x: reg.latitude,
        y: reg.longitude
      },
      {
        x: lat,
        y: lng
      }
      )
      
      if(valor*1000 < value){
        registred = true
      }
    increment++
  } while (increment < Headquarters.length && !registred);

  if(oportunityCodeRegister){
    const validationAlocation = await allocationIntace.getByOportunityVNEF(oportunityCodeRegister)
    asignationPoints = validationAlocation.length === 0 ? true : false
  }
  return res.status(200).json({
    data:{
      registred,
      asignationPoints
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
    return res.status(500).json({
      responseError: error.message,
      data:[]
    });
  }
  return next();
});


exports.Verify = Verify;