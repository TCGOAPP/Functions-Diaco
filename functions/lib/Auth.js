'use strict';
const admin = require('firebase-admin');

class FirebaseAuth{
  constructor(){
    this.auth = admin.auth()
  }

  cteateAuth({email, password}){ 
   return this.auth.createUser({email, password})
  }

  updateAutfinfoUser(uid,data){
   return  this.auth.updateUser(uid,data)
  }
  
} 

module.exports = FirebaseAuth;