

export const resetPasswordEmailTemplate = (name: string, pin: string) => {
  return `
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

}