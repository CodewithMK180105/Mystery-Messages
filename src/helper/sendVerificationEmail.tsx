import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import VerificationEmail from '../../emails/VerificationEmail'; // adjust path if needed

export async function sendVerificationEmail({
  username,
  email,
  otp,
}: {
  username: string;
  email: string;
  otp: string;
}) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const htmlContent = await render(<VerificationEmail username={username} otp={otp} />);

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Your Verification Code',
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Email sent' };
  } catch (err: any) {
    console.error(err);
    return { success: false, message: err.message };
  }
}
