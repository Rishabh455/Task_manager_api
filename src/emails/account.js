const sendgridAPIKey= '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'
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(sendgridAPIKey)
//  
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
      form: 'rishabhchourasia858@gmail.com',
      subject: "thanks for joining in..",
      text: `welcome to the app ${name}`
        
        
    })
}
//
// const sendWelcomeEmail = (email, name) => {
//   const msg = {
//     to: email,
//     form: 'rishabhchourasia858@gmail.com', // Use the email address or domain you verified above
//     subject: "thanks for joining in..",
//     text: `welcome to the app ${name}`
//   }
//   sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })

//}
module.exports = {
  sendWelcomeEmail
}

// const sgMail = require('@sendgrid/mail')

// const sgMailApiKey = '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'

// sgMail.setApiKey(sgMailApiKey)



// module.exports.sendEmail = (email, name) => {
    
//   console.log(email +" : "+name)
//     sgMail.send({
//         to: email,
//         from: 'fixthatdevice@gmail.com',
//         subject: 'Fix That Device Password Reset',
//         text: `Hello. <br> Welocome to Fix That Device. <br> Your new password is: ${name} `,
//         html: `<p>Hello. <br> Welocome to Fix That Device. <br>Your new password is: <b>${name}</b></p>`

//     }).then(() => {}, error => {
//         console.error(error);
     
//         if (error.response) {
//           console.error(error.response.body)
//         }
//       });

// }