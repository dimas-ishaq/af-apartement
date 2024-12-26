import nodemailer from "nodemailer"
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { confirmationEmailTemplate } from "../../interfaces/http/api/templates/email/confirmationEmailTemplate";
import { resetPasswordEmailTemplate } from "../../interfaces/http/api/templates/email/resetPasswordEmailTemplate";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || '',
  port: 2525,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASSWORD || '',
  },
} as SMTPTransport.Options)


export const sendConfirmationEmail = async (userId: string, email: string, name: string) => {
  const confirmationUrl = `http://${process.env.APP_URL}/api/auth/userConfirmation?user=${userId}`;

  const mailOptions = {
    from: "hunian@af_apartement.com",
    to: email,
    subject: "Confirmation Email",
    html: confirmationEmailTemplate(name, confirmationUrl)
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Confirmation Email sent successfully");
  } catch (error: any) {
    console.log("Error sending confirmation email:", error.message);
  }
};


export const sendResetPasswordEmail = async (email: string, name: string, pin: string) => {

  const mailOptions = {
    from: "hunian@af_apartement.com",
    to: email,
    subject: "Reset Password Account",
    html: resetPasswordEmailTemplate(name, pin),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Reset Password Account sent successfully");
  } catch (error: any) {
    console.log("Error sending reset password account:", error.message);
  }
}


