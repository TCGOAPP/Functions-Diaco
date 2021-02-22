'use strict';
const nodemailer = require('nodemailer')
const functions = require('firebase-functions');
class Email{

  constructor(){
    
    this.config = {
      from: functions.config().emailconfig.email,
      to: '',
      subject: '',
      text:'',
      html:''
    }

    this.trasnporter = nodemailer.createTransport({
    //   host:'tcgoapp.net',
    //   port: 465,
    //  secure: true,
      
      service: 'gmail', 
      auth: {
        user:functions.config().emailconfig.email, // generated ethereal user
        pass: functions.config().emailconfig.pass // generated ethereal password
      }
      
    })
  }
  async sendEmail (){
    return this.trasnporter.sendMail(this.config)
  }
  /**
   * @param {string} email
   */
  set from(email){
    this.config.from = email;
  }
  set to(to){
    this.config.to = to;
  }
  set subject(subject){
    this.config.subject = subject;
  }
  set text (text){
    this.config.text = text;
  }
  set html(html){
    this.config.html = html;
  }
}
module.exports = Email;