 'use strict'
 
 class Times{
  /**
   * Metodo para dar Formato de salida a fecha
   * @param {*} objDate 
   */
  static convertFecha(objDate){
    //const month=["January","February ","March","April","May","June","July","August","September","October","November","December"];
    const month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    let hoy
    try {
      hoy = (objDate.getDate() < 10 ? "0" + objDate.getDate() : objDate.getDate()) + " " + month[objDate.getMonth()] + " " +  objDate.getFullYear();
    } catch (error) {
      console.log( error);
      hoy=null;
    }
    return hoy
  }
  /**
     * Metodo para calculo de ferchas 
     * @param { Int } lapso numero de dias  
     * @param { Date } ObjecDate fecha inicial 
     */
  static  calculaTiempo(lapso, ObjecDate) {
    const dia = 1000 * 60 * 60 * 24;
    const tiempo = lapso*dia;
    const fechatras = Object.assign(new Date() ,ObjecDate); 
    fechatras.setMilliseconds(0);
    fechatras.setSeconds(0);
    fechatras.setMinutes(0);
    fechatras.setHours(0);
    const defComp = fechatras.getTime() + tiempo;
    fechatras.setTime(defComp);  
    return fechatras;
  }
  static getDateTextStandar(ObjDate){
    try {
      let fecha,dia, mes,defmes
      if ( typeof ObjDate === 'object'){
        defmes = ObjDate.getMonth();
        mes = ObjDate.getMonth() < 9 ? `0${parseInt(defmes) + 1 }` : (parseInt(defmes) + 1);
        dia = ObjDate.getDate() < 9 ? `0${ObjDate.getDate()}`: ObjDate.getDate();
        return   ObjDate.getFullYear()+"-"+mes+"-"+dia;
      }else{
        fecha=new Date(ObjDate);
        defmes=fecha.getMonth()+1;
        mes=(fecha.getMonth()) < 9 ? "0" + defmes:defmes
        dia=fecha.getDate() < 9 ? "0" + (fecha.getDate()) : (fecha.getDate())
        return   fecha.getFullYear()+"-"+mes+"-"+dia;
      }
     } catch (error) {
        console.log(error);
    
      return "0000-00-00"
     }
  }
}
exports.Times = Times