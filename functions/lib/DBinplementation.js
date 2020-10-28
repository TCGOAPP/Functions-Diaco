const  FirebaseFirestore = require('./Firestore') ;

 class DBinplementation {
  /**
   * 
   * @param {String} collection
   * @return {FirebaseFirestore}
   */
  constructor(collection) {
    return  new FirebaseFirestore(collection)
  } 
 
}
exports.DBinplementation = DBinplementation