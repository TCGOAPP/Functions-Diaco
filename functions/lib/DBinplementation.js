const  {FirebaseFirestore} = require('./Firestore') ;

 class DBinplementation {
  /**
   * 
   * @param {String} collection
   * @return {FirebaseFirestore}
   * @returns {FirebaseFirestore}
   */
  constructor(collection) {
    return new FirebaseFirestore(collection);
  } 
}
exports.DBinplementation = DBinplementation