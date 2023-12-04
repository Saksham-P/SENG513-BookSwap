const nodemailer = require('nodemailer');
const { getUserEmailById } = require('./userController'); // Import the function


const sendEmail = async (req, res) => {
  console.log('Received request body:', req.body);

  // Extract email details from request body
  const { senderEmail, receiverID, subject, message } = req.body;

  // Get the receipient (seller) email by their user id
  const recipientEmail = await getUserEmailById(receiverID);
  console.log(recipientEmail);
  // Nodemailer configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS, // application's email
    to: recipientEmail,
    replyTo: senderEmail, // Sender's email
    subject: subject,
    text: message,
  };

  console.log(transporter.options.auth)
  console.log(mailOptions)

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);

    res.status(400).json({ error: 'Error sending email', details: error });
  }
};

module.exports = { sendEmail };
