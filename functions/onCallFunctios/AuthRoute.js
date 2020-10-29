const functions = require('firebase-functions');
const FirebaseAuth = require('../lib/Auth');

class AuthRoute {
  constructor(){
    this.auth = new FirebaseAuth();
  }
  
  async  createAuth({email,password}){
    try {
      if(!email)   throw new functions.https.HttpsError('failed-precondition','El correo ingresado es invalido');
      const {uid} = await this.auth.cteateAuth({email,password})
      return {
          uid
      }
    } catch (error) {
       switch (error.code) {
          case 'auth/email-already-exists':
              throw new functions.https.HttpsError('failed-precondition','El correo electrónico ya se encuentra registrado');
              
          case 'auth/invalid-password':
              throw new functions.https.HttpsError('failed-precondition','La contraseña es invalida, debe tener seis caracteres mínimo');
            
          case 'auth/invalid-email':
            throw new functions.https.HttpsError('failed-precondition','El correo ingresado es invalido');
        
          default:
            throw new functions.https.HttpsError('failed-precondition','No  fue posible crear el usuario por  fabor intentelo mas tarde');
       }
    }
  }
  async  updatePassword({userUID,password}){
    try {
      await this.auth.updateAutfinfoUser(userUID,{password})
      return {status:'ok'}
    } catch (error) {
       switch (error.code) {
          case 'auth/user-not-found':
              throw new functions.https.HttpsError('failed-precondition','La referencia de usuario no es reconocida');
           
          case 'auth/argument-error':
              throw new functions.https.HttpsError('Argumento invalido');
            
          case 'auth/invalid-password':
            throw new functions.https.HttpsError('failed-precondition','La contraseña ingresada no es valida, debe tener 6 caracteres minimo');
            
          default:
            throw new functions.https.HttpsError('failed-precondition','No  fue posible crear el usuario por  fabor intentelo mas tarde');
            
       }
     
    }
  }
}


module.exports =  AuthRoute