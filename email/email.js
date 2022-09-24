require("dotenv").config()
const nodemailer = require("nodemailer")

const sendMail = async (emailContent) => {

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    }
  })

  let mail = await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: emailContent.recevierEmail,
    subject: emailContent.subject,
    html: emailContent.message,
  })

  console.log("Message sent: %s", mail);

}

module.exports = sendMail;