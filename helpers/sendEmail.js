const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

// const msg = {
//   to: 'velogitara@icloud.com',
//   from: 'velogitara@gmail.com',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent');
//   })
//   .catch(error => {
//     console.error(error);
//   });
const sendEmail = async data => {
  const email = { ...data, from: 'velogitara@gmail.com' };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
