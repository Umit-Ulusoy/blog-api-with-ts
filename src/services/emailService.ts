import nodemailer from 'nodemailer';
import { env } from '@config/env';
import AppError from '@exceptions/AppError';

const {
  SMTP_HOST: host,
  SMTP_PORT: port,
  SMTP_USER: user,
  SMTP_PASS: pass,
  EMAIL_FROM: from
} = env;

interface EmailPayload {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: {
    user,
    pass,
  },
});

export async function sendEmail({ to, subject, text, html }: EmailPayload): Promise<void> {
  try {
    const mailOptions = {
      from,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email gönderildi: ${info.messageId}`);
  } catch (err: any) {
    throw new AppError('Something went wrong in e-mail sending', 500);
  }
}
