'use strict'
const {DBinplementation} = require('../lib/DBinplementation') ;
const  FirebaseFirestore = require('../lib/Firestore') ;

class ClientHeadquarters{
  constructor(){
    /**
     * @type {FirebaseFirestore}
     */
    this.DB = new DBinplementation('ClientHeadquarters')
    
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