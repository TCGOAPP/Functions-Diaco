const  FirebaseFirestore = require('../lib/Firestore') ;

class User{

  constructor (){
    this.db = new FirebaseFirestore('usersInformation');
  }

  async getByUserUID(uid){
    const data = [];
    const query = await this.db.getQuery().where('userUID','=',uid).get();
    query.forEach( reg => {

      data.push({
        ... reg.data(),
        key:reg.id
      })
    })
    if(data.length === 0) return null
    return data[0]
  }

}

module.exports = User;