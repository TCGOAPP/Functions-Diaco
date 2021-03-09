'use strict';
const nodemailer = require('nodemailer')
const functions = require('firebase-functions');
class Email{

  constructor(){
    if(!functions.config().emailconfig){
      console.log('entro aqui');
      require('dotenv').config()
      this.email = process.env.email
      this.pass =process.env.pass
    }else{
      this.email = functions.config().emailconfig.email;
      this.pass = functions.config().emailconfig.pass;
    }

    this.config = {
      from: this.email ,
      to: '',
      subject: '',
      text:'',
      html:''
    }

    this.trasnporter = nodemailer.createTransport({
      host:'tcgoapp.net',
      port: 465,
      secure: true,

      auth: {
        user: this.email,// generated ethereal user
        pass: this.pass // generated ethereal password
      }
     
  
    })
  }
  async sendEmail (){
   try {
    console.log(`enviado a ${this.config.to}`);
    await this.trasnporter.sendMail(this.config)
    return Promise.resolve()
   } catch (error) {
     console.console.log('asdasd');
    return Promise.reject(error)  
   }
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