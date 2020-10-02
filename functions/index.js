const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {Verify} = require ('./routes/verificationRoutes')
/* let serviceAccount = require(
  "/home/nova/Documentos/diaco-function/functions/private.json");
admin.initializeApp( {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tggodes.firebaseio.com/"
} )   */ 
admin.initializeApp()

 exports.Verify = functions.https.onRequest(Verify)
 //exports.Verify = functions.https.onCall(Verify)
