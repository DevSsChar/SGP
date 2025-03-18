import { NextResponse } from 'next/server';
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(req) {
  try {
    const { phoneNumber } = await req.json();

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Send SMS using Twilio
    await client.messages.create({
      body: `Your verification code is: ${otp}`,
      from: process.env.TWILIO_NUMBER,
      to: phoneNumber
    });

    // In a real application, you would store this OTP in a database with an expiration time
    // For demo purposes, we'll return it in the response
    return NextResponse.json({ 
      success: true, 
      message: 'OTP sent successfully',
      otp // Remove this in production
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
} 