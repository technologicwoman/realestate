import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, phone, propertyId, propertyName, message } = await request.json();

    // Create transporter with your Banahost SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'mail.bbrealestate.com.pa',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: 'info@bbrealestate.com.pa', // Where you want to receive emails
      replyTo: email, // User's email for replies
      subject: 'Nuevo Lead de Propiedad',
      html: `
        <h2>Nuevo Interesado: ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Property ID:</strong> ${propertyId}</p>
        <p><strong>Property Name:</strong> ${propertyName}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

// Optional: Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}