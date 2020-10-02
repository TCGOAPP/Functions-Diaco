'use strict'
const {DBinplementation} = require('../lib/DBinplementation') ;

class OpportunitieStatus{
  constructor(){
    this.Db = new DBinplementation("opportunityStatus")
  }

  async getNivelTotype(type){
    const query = await this.Db.query()
            .addCondition('status','==',type)
            .queryExecute()
    const response = [];
    query.forEach( reg =>{
      const resp = reg.data();
      response.push( resp);
    })
    return response[0]

  }
  
  async getList(){
    try {
      const data = [];
      if(!localStorage.getItem('OpportunitieStatus')){
        const query = await this.Db.query().queryExecute();
        query.forEach(element => {
          data.push(element.data());
        })
        localStorage.setItem(`OpportunitieStatus`,JSON.stringify(data));
        return data
      }else{
        return JSON.parse(localStorage.getItem(`OpportunitieStatus`))
      }
   } catch (error) {
     console.log(error);
     return Error ('No fur posible realizar la consulta')
   }
  }

  setlistener(callback){
    this.Db.createOnSnapshot(data => {
      const dataList = [];
      data.forEach(element => {
        dataList.push(element.data());
      })
      localStorage.setItem(`OpportunitieStatus`,JSON.stringify(dataList));
      callback(this)
    })
   
  }

}
exports.OpportunitieStatus = OpportunitieStatus;