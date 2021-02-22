'use strict'

const notificationAginationOportunitie = ({
  nombre_user,
codigo,
 reporte,
}) => {

  return `
  <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;1,300;1,400&display=swap" rel="stylesheet">
<style>
  .email_contend{
    font-family: 'Roboto', sans-serif;
  }
</style>
<div class="email_contend">
  <strong>Cordial saludo</strong>
<br>
<br>
Seño@r ${nombre_user} el sistema de gestión de oportunidades Diaco PlataForm se permite informarle que se le ha asignado la oportunidad ${codigo}
para su trámite, registrada  ${reporte}
<br>
<br>

<p style ="font-size: 1.3rem;">Gerdau Diaco</p>

<p style ="margin: 0;">Calle 93b # 18 – 12, Piso: 8</p>

<p style ="margin: 0;">Teléfono (031) 6003900 – Ext 1688</p>

<p style ="margin: 0;">www.gerdaudiaco.com</p>

<p style ="margin: 0;">www.facebook.com/GerdauDiaco</p>

<p style ="margin: 0;">https://www.linkedin.com/company/gerdaudiacol</p>
<br>
<img src="https://firebasestorage.googleapis.com/v0/b/skilful-sphere-214021.appspot.com/o/imagescorp%2FpieEmail.jpg?alt=media&token=1abd1431-93c1-457f-bcd3-2a56c8271875" alt="">
</div>`;
};

module.exports = {
  notificationAginationOportunitie
}