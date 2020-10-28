'use strict'
const {DBinplementation} = require('../lib/DBinplementation') ;
const  FirebaseFirestore = require('../lib/Firestore') ;

class AllocationPoints{
  constructor(){
    /**
     * @type {FirebaseFirestore}
     */
    this.DB = new DBinplementation('allocationPoints')
    
  }
  async getByOportunityVNEF(oportunitycode){
    const data = []
    const query = await this.DB.getQuery().
              where('oportunity.code','==',oportunitycode).where('codeType','==', 'VNEF').get()

    query.forEach(  e => {
      data.push(e.data());
    })
    return data
  } 
}

module.exports =AllocationPoints