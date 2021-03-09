const functions = require('firebase-functions');
const admin = require('firebase-admin');

const {Verify} = require ('./routes/verificationRoutes')
const AuthRoute = require('./onCallFunctios/AuthRoute')
const  noficateUser  = require('./routes/Email');



// let serviceAccount = require(
//   "/home/nova/Documentos/desarrollo_diaco/diaco-function/functions/key/key.json");
  
//  admin.initializeApp( {
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://skilful-sphere-214021.firebaseio.com/"
// } ); 

admin.initializeApp();
const auth = new AuthRoute()
exports.Verify = functions.https.onRequest(Verify)
//exports.Verify = functions.https.onCall(Verify) 

exports.addUser = functions.https.onCall((data,constex) => auth.createAuth({...data})); 
exports.editPassword = functions.https.onCall((data,constex) => auth.updatePassword ({...data})); 
exports.noficateUser = functions.https.onCall((data,context) => noficateUser(data.idOportunitie)); 