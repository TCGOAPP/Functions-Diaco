'use strict'
const {DBinplementation} = require('../lib/DBinplementation') ;

class limitDiferencilaDist{
  constructor(){
    this.Db = new DBinplementation("limitDiferencilaDist");
  }
  async getLimit(){
    const query =await this.Db.getDocument('limite');
    return query.data();
  }
}
exports.limitDiferencilaDist = limitDiferencilaDist;