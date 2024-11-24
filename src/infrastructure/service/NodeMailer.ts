import nodemailer from "nodemailer"
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transporter = nodemailer.createTransport({
  host: process.env.NODE_MAILER_HOST || '',
  port: 2525,
  secure: false,
  auth: {
    user: process.env.NODE_MAILER_USER || '',
    pass: process.env.NODE_MAILER_PASSWORD || '',
  },
} as SMTPTransport.Options)


export const sendConfirmationEmail = async (userId: string, email: string, name: string) => {
  const confirmationUrl = `http://localhost:5000/api/auth/userConfirmation?user=${userId}`;

  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmation Email</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f9;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          padding: 20px;
          border: 1px solid #dddddd;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #444;
          font-size: 24px;
        }
        p {
          font-size: 16px;
          line-height: 1.6;
        }
        a {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background: #4caf50;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
        }
        a:hover {
          background: #45a049;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #777;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
      <img alt="" src="data:image/png;base64,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" />
      <h1>Konfirmasi Email Anda</h1>
        <p>Halo, ${name}</p>
        <p>Terima kasih telah mendaftar di AF Apartement. Harap klik tombol di bawah untuk mengonfirmasi email Anda:</p>
        <a href="${confirmationUrl}">Konfirmasi Email</a>
        <p>Jika Anda tidak membuat akun ini, Anda dapat mengabaikan email ini.</p>
        <div class="footer">
          <p>&copy; 2024 AF Apartement. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: "hunian@af_apartement.com",
    to: email,
    subject: "Confirmation Email",
    html: htmlTemplate,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Confirmation Email sent successfully");
  } catch (error: any) {
    console.log("Error sending confirmation email:", error.message);
  }
};


export const sendResetPasswordEmail = async (email: string, name: string, pin: string) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Password</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f9;
          margin: 0;
          padding: 0;
          color: #333;
        }
        .email-container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .email-header {
          background-color: #4CAF50;
          color: #ffffff;
          text-align: center;
          padding: 15px;
          border-radius: 8px 8px 0 0;
        }
        .email-body {
          padding: 20px;
          font-size: 16px;
        }
        .footer {
          font-size: 14px;
          color: #777;
          text-align: center;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h2>Password Reset Request</h2>
        </div>
        <div class="email-body">
          <p>Dear ${name},</p>
          <p>We received a request to reset your password. Please use the following PIN to complete the process:</p>
          <h2 style="font-size: 30px; color: #4CAF50;">${pin}</h2>
          <p>This PIN is valid for 30 minutes.</p>
          <p>If you did not request a password reset, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>If you have any questions, feel free to contact our support team.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: "hunian@af_apartement.com",
    to: email,
    subject: "Reset Password Account",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Reset Password Account sent successfully");
  } catch (error: any) {
    console.log("Error sending reset password account:", error.message);
  }
}


