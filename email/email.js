require("dotenv").config()
const nodemailer = require("nodemailer")

const sendMail = async (emailContent) => {

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    }
  })

  console.log(emailContent.recevierEmail, emailContent.subject, process.env.SENDER_EMAIL,);

  let mail = await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: emailContent.recevierEmail,
    subject: emailContent.subject,
    html: emailContent.message,
  })

  console.log("Message sent: %s", mail.response);

}

module.exports = sendMail;