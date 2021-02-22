'use strict'
const {OpportunitieStatus} = require('./OpportunitieStatus') ;
const  FirebaseFirestore = require('../lib/Firestore') ;
const {Times} = require('../utils/Times') ;
const T = Times
class Oportunity{
  constructor (){
   
    this.db = new FirebaseFirestore('opportunities');
    this.oportunityStatusInstance = new  OpportunitieStatus()
  }
/**
 * Metodo para obtencion de lista total de oportunidades en el rango de fecha
 * @param {Date} dateInitial Objeto Date con valor de fecha inicial
 * @param {Date} dateFinal Objeto Date con valor de fecha final
 */
  async getListAll(dateInitial,dateFinal){
    const list = [];
    const query = await this.db.query()
        .addCondition('fecha','>=',T.getDateTextStandar(dateInitial))
        .addCondition('fecha','<=',T.getDateTextStandar(dateFinal))
        .queryExecute();

    query.forEach( reg => {
      const data =  reg .data()
      list.push({
        ...data,
        id: reg.id
      });
    })
    return list;
  }
  /**
 * Metodo para obtencion de lista total de oportunidades en el rango de fecha
 * @param {Date} dateInitial Objeto Date con valor de fecha inicial
 * @param {Date} dateFinal Objeto Date con valor de fecha final
 */
async getListNotFill(){
  const list = [];
 
  const query = await this.db.query()
      .queryExecute();
  
  query.forEach( reg => {
    const data =  reg .data()
    list.push({
      ...data,
      id: reg.id
    });
  })
  return list;
}
  /**
 * Metodo para obtencion de lista de oportunidades asignadas a usuario  en el rango de fecha
 * @param {Date} dateInitial Objeto Date con valor de fecha inicial
 * @param {Date} dateFinal Objeto Date con valor de fecha final
 * @param {String} dateFinal codigo UID de usuario a consultar
 */
  async getListAllbyAccessory(dateInitial,dateFinal,uid){
    const list = [];    
    const query = await this.db.query()
        .addCondition('fecha','>=',T.getDateTextStandar(dateInitial))
        .addCondition('fecha','<=',T.getDateTextStandar(dateFinal))
        .addCondition('userAccessory.userUID','==',uid)
        .queryExecute();
    query.forEach( data => {
      list.push({
        data:data.data(),
        id:data.id
      });
    })
    return list;
  }

  /**
   * Merodo para Captura de informacion de oporunidad
   * @param {Strimg} register id de registro
   */
  async getByRegister(register){
    const query = await this.db.getDocument(register);
    const response = query.data();
    this.idRegister = register;
    for (const key in response) {
      if (response.hasOwnProperty(key)) {
        this[key] = response[key];
      }
    }
   
    if(!response.images){
      this.images = null
    }
  }
  getIdRegister(){
    return  this.idRegister;
  }
  getCode(){
    return this.codigo;
  }

  getDateRegister(){
    const date = new Date(this.fecha);
    date.setDate(date.getDate() + 1);
    return date;
  }
  
  getLatitude(){
    return this.coordinates.lat;
  }
  getImage(){
    return this.images || []
  }
  getLongitude(){
    return this.coordinates.lng;
  }
  getState(){
    return this.opportunityStatus;
  }
  getType(){
    return this.type;
  }
  getUserCampAsignate(){
    return this.userCamp.name;
  }
  getUserCampAsignateCode(){
    return this.userCamp.userUID;
  }
  getDescription(){
    return this.description;
  }
  getDirection(){
    return this.direction;
  }
  getLocalization(){
    return[this.country,this.state,this.city];
  }
  getTextNotes(){
    let nota = ""
    let tiesp = "\n" 
    for (const key in this.tracing) {
      if (this.tracing.hasOwnProperty(key)) {
        const element = this.tracing[key];
        nota = nota + tiesp + "----------------"
        nota = nota + tiesp + `Nota: ${element.note}`
        nota = nota + tiesp + `Usuario: ${element.userName}`
        nota = nota + tiesp + `Fecha: ${element.date}`
        nota = nota + tiesp + "----------------"+tiesp
      }
    }
    return nota
  }
  getDataTracing(){
    return this.tracing;
  }
  getContactName(){
    return this.infoContact.name;
  }
  getContactIdenty(){
    return this.infoContact.identification;
  }
  getContactTel1(){
    return this.infoContact.tel1;
  }
  getContactTel2(){
    return this.infoContact.tel2;
  }
  getContactObservations(){
    return this.infoContact.observations;
  }
  /**
   * Mrdodo para recuperacion de informacion de usuario asesor 
   */
  getAdviser(){
    return [this.userAccessory.name,this.userAccessory.userUID]
  }

  async setState(newState,newLevel,forse = false){
    const {level} = await this.oportunityStatusInstance.getNivelTotype(this.getState());
    if(!forse && newLevel < level) throw  new Error('No se puede asignar al proceso un estado inferior al actual');
    if(newState === 'En Validación' && (this.getAdviser()[1] === '' || !this.getAdviser()[1])) throw new Error('No se puede asignar el estado sin asignar un usuario asesor');
    this.opportunityStatus = newState;
    return this;
  }

  setAdviser(userName,userUid){
    this.userAccessory.name = userName;
    this.userAccessory.userUID = userUid;
    return this
  }

  setgetDescription(description){
    this.description = description;
    return this;
  }

  setDirection(direction){
    this.direction = direction;
    return this;
  }
  
  setLatitude(lat){
    this.coordinates.lat = lat;
    return this;
  }

  setLongitude(lng){
    this.coordinates.lat = lng;
    return this;
  }

  setLocation(codeCountry,codeState,codeCity){
    this.country = codeCountry;
    this.state = codeState;  
    this.city = codeCity;
    return this
  }
  setContactName(name){
    this.infoContact.name = name; 
    return this;
  }
  setContactIdentification(identification){
    this.infoContact.identification = identification;
    return this;
  }
  setContactTel1(tel){
    this.infoContact.tel1 = tel; 
    return this;
  }
  setContactTel2(tel){
    this.infoContact.tel2 = tel 
    return this;
  }

  setContacObservation(observarion){ 
    this.infoContact.observations = observarion
    return this;
  }
  addNoteTracin(note = '', userName = '', userUID = ''){
  
    const base = {
      date: T.getDateTextStandar(new Date()),
      note,
      userName,
      userUID
    }
    this.tracing.push(base)
    return this;
  }

  async upadate(){
    const adviser  = this.getAdviser();
    const location = this.getLocalization()
    const data = {
      coordinates:{
        lat: this.getLatitude(),
        lng: this.getLongitude()
      },
      description: this.getDescription(),
      direction: this.getDirection(),
      infoContact:{
        identification: this.getContactIdenty(),
        name:this.getContactName(),
        observations: this.getContactObservations(),
        tel1: this.getContactTel1(),
        tel2: this.getContactTel2()
      },     
      tracing:this.getDataTracing(),
      userAccessory:{
        name: adviser[0],
        userUID:adviser[1]
      },
      country: location[0] || '',
      state: location[1] || '',
      city: location[2] || '',
      opportunityStatus: this.getState()
    }
    return this.db.upaDateSet(this.idRegister,data)
  }
}
exports.Oportunity = Oportunity