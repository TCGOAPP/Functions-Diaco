'use strict'


const Email = require('../lib/Email');
const {notificationAginationOportunitie}  =require('../templates/html');
const { Oportunity } = require('../controllers/Oportunity');
const User = require('../controllers/User');
const {Times} = require('../utils/Times');
const  noficateUser = async (idOportunitie) =>{
  try {
    const email = new Email();
    const oportunitie = new Oportunity();
    const userRepo = new User();
    await  oportunitie.getByRegister(idOportunitie);
    const adviser = oportunitie.getAdviser();

    const user = await  userRepo.getByUserUID(adviser[1])
    email.to = user.email
    email.subject = `Asignación de oportunidad de ${oportunitie.getType()}`;
    email.text = `Cordial saludo \nSeño@r ${ adviser[0]} el sistema de gestión de oportunidades Diaco PlataForm se permite informarle que se le ha asignado la oportunidad ${oportunitie.getCode()} para su trámite, registrada  ${Times.convertFecha(oportunitie.getDateRegister())}\nGerdau Diaco\nTeléfono (031) 6003900 – Ext 1688\nwww.gerdaudiaco.com\nwww.facebook.com/GerdauDiaco\nhttps://www.linkedin.com/company/gerdaudiacol`;
    email.html = notificationAginationOportunitie({
      nombre_user: adviser[0],
      codigo:oportunitie.getCode(),
      reporte: Times.convertFecha(oportunitie.getDateRegister()), 
    })
    await email.sendEmail();
   return 'cumplio'
  } catch (error) {
   return 'error'
  }
}


module.exports = noficateUser;