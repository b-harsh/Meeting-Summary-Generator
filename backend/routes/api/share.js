const express = require('express');
const router = express.Router();
const { marked } = require('marked');
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { recipientEmail, summaryText, transcript } = req.body;

  if (!recipientEmail || !summaryText) {
    return res
      .status(400)
      .json({ msg: 'Recipient Mail and Summary are Required .' });
  }

  const summaryHtml = marked(summaryText);

  // the transporter

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: `'Meeting Summarizer' <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    subject: 'Your Meeting Summary',
    html: `
        
     <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h1 style="color: #1a73e8;">Meeting Summary</h1>
        <p>Here is the summary you requested:</p>
        <div style="background-color:#f5f5f5; border-left: 4px solid #1a73e8; padding: 1px 15px; border-radius: 4px;">
          ${summaryHtml}
        </div>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <h3 style="color: #555;">Original Transcript (Excerpt)</h3>
        <p style="font-size: 0.9em; color: #666;">${transcript.substring(
          0,
          500
        )}...</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ msg: 'Email sent Successfully !' });
  } catch (err) {
    console.error('Error sending email: ', error);
    res.status(500).send('Server error: Failed to send email.');
  }
});

module.exports = router;
