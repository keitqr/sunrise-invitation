import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { response }: { response: string } = await req.json();

    if (!response) {
      return NextResponse.json({ message: 'Missing response' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'cvkriticos@gmail.com',
        pass: 'rhvw psxx kfjc bntp', // Χρησιμοποίησε το App Password αν είναι απαραίτητο
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: 'cvkriticos@gmail.com',
      to: 'qrkeit@gmail.com',
      subject: 'Απάντηση στην πρόσκληση',
      text: `Η Ελένη Παπαλλή απάντησε: ${response}`,
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }
}
