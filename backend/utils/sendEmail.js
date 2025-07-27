const transporter = require('../config/email');

const sendEmail = async (options) => {
  const mailOptions = {
    from: `GreenMind Blog <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;