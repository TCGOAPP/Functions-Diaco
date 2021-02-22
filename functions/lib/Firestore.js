'use estrict'
const admin = require('firebase-admin');

class FirebaseFirestore{
  constructor(collection){
    this.collection = collection;
    this._db = admin.firestore()
    this.WheresConditions = [];
  }
   /**
  * Metodo para almacenamiento de datos en colecciones
  * @param {Object} value datos para almacenar 
  */
 save(value){
  return this._db.collection(this.collection).add(value)
  }
  /**
  * Metodo para modificacion de documentos
  * @param {String} document nombre del documentos 
  * @param {Object} data datos 
  */
  upaDateSet(document,data){
    return this._db.collection(this.collection).doc(document).update(data);
  }
  
  /**
   * metodo para inicializacion de consulta
   * y llamado 
   * @param {String} collection nombre  de la colecion a consultar 
   */
  query(){
    this.queryDb = this._db.collection(this.collection);
    return this
  }
  getQuery(){
   return this._db.collection(this.collection);
  }
  /**
   * Metodo para adicion de condocion de consulta
   * @param {String} key Nombre de key del dato del registro para filtrar
   * @param {String} queryParam parameto de comparacion
   * @param {String} value  valor a comarar
   */
  addCondition(key,queryParam,value){
    this.queryDb.where(key,queryParam,value);
    return this;
  }
  
  /**
   * metodo para ejecucion de  query
   */
  queryExecute(){
    return this.queryDb.get();
  }
  
  /**
   * metodo para retorno de documento espesifico
   * @param {String} collection nombre de la coleccion 
   * @param {String} document nombre del documento
   */
  getDocument(document){
    console.log('aqui',this.collection,document);
    return this._db.collection(this.collection).doc(document).get();
  }

  /**
  * Metodo  que retorna objeto de coneccion Firebase para crear consultas directas
  */
  getConect(){
    return this.firebase._db_conect;
  }
  /**
   * Medodo paea registro de escuchador de cambios  de datos
   * @param {Function} callbabk funcion de devolucion de llamado de funcion 
   */
  createOnSnapshot(callbabk){
    if(this.queryDb){
      return this.queryDb.onSnapshot(data => callbabk(data));
    }else{
      return this._db.collection(this.collection).onSnapshot(data => callbabk(data));
    }
  }
  
}
module.exports = FirebaseFirestore;