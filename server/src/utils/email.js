const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodeMailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const htmlContent = `
    <html>
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <!-- Header -->
        <tr>
          <td style="background: #030811; padding: 20px; text-align: center; color: #ffffff; font-size: 24px;">
            Password Reset Notification
          </td>
        </tr>
        <!-- Main Content -->
        <tr>
          <td style="padding: 20px;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; margin: auto; background: #ffffff; border: 1px solid #dddddd; border-radius: 8px; overflow: hidden;">
              <!-- Banner Image -->
              <tr>
                <td style="text-align: center;">
                  <img src="https://res.cloudinary.com/drmaunxsy/image/upload/v1748671208/reset_passss_xalsvp.jpg" alt="Banner Image" style="width:100%; max-width:600px; display: block;">
                </td>
              </tr>
              <!-- Email Body -->
              <tr>
                <td style="padding: 20px; color: #333333;">
                  <h2 style="color: #030811;">Password Reset Request</h2>
                  <p>Hello,</p>
                  <p>Your OTP for password reset is: <strong style="color:#030811;">${otp}</strong></p>
                  <p>This OTP will expire in 10 minutes. Please use it to reset your password.</p>
                  <p>If you did not request a password reset, please ignore this email.</p>
                  <p>Best regards,<br>Your Team</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
      </table>
    </body>
    </html>
  `;

export const sendPasswordResetOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Password Reset OTP",
    text: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};
