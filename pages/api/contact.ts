import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type ResponseData = {
  message: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Create transporter with Hostinger SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your Hostinger email
        pass: process.env.EMAIL_PASS, // Your Hostinger email password
      },
    });

    // Email options
    const mailOptions = {
      from: `"AMLDecoded Contact" <sibe@amldecoded.com>`, // Must be from your domain
      to: 'sibe@amldecoded.com', // Your Hostinger email
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px;">This message was sent from the AMLDecoded contact form.</p>
          <p style="color: #666; font-size: 12px;">Reply to: ${email}</p>
        </div>
      `,
      replyTo: email, // Allow replying directly to the sender
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      message: 'Failed to send email',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}