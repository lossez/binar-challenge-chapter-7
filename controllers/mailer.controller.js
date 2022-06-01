require("dotenv").config();
const nodemailer = require("nodemailer");

module.exports = {
  sendMail: (email, subject, text, html) => {
    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "1ad29ca321ce44",
        pass: "d538811f83249c",
      },
    });

    transport.sendMail({
      from: "nodemailer@email.com",
      to: email,
      subject,
      text,
      html,
    });
  },
};
