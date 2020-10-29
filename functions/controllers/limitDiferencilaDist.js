'use strict'
const  FirebaseFirestore = require('../lib/Firestore') ;
class limitDiferencilaDist{
  constructor(){
    this.Db = new FirebaseFirestore("limitDiferencilaDist");
  }
  async getLimit(){
    const query =await this.Db.getDocument('limite');
    return query.data();
  }
}
exports.limitDiferencilaDist = limitDiferencilaDist;