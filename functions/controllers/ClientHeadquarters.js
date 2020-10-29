'use strict'
const  FirebaseFirestore = require('../lib/Firestore') ;

class ClientHeadquarters{
  constructor(){
    /**
     * @type {FirebaseFirestore}
     */
    this.DB = new FirebaseFirestore('ClientHeadquarters')
    
  }
  async getAll(){
    const data = []
    const query = await this.DB.query()
        .queryExecute()
    query.forEach(  e => {
      data.push(e.data());
    })
    return data
  } 
}

module.exports = ClientHeadquarters