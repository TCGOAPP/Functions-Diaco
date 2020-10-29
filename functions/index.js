const functions = require('firebase-functions');
const admin = require('firebase-admin');

const {Verify} = require ('./routes/verificationRoutes')
const AuthRoute = require('./onCallFunctios/AuthRoute')


/* let serviceAccount = require(
  "/home/nova/Documentos/diaco-function/functions/private.json");
 admin.initializeApp( {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tggodes.firebaseio.com/"
} );  */

admin.initializeApp();
const auth = new AuthRoute()
exports.Verify = functions.https.onRequest(Verify)
//exports.Verify = functions.https.onCall(Verify) 

exports.addUser = functions.https.onCall((data,constex) => auth.createAuth({...data})); 
exports.editPassword = functions.https.onCall((data,constex) => auth.updatePassword ({...data})); 