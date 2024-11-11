import { NextResponse } from 'next/server';
import twilio from 'twilio';


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export  async function POST() {
 
    try {
       await client.messages.create({
        body: 'An order has been placed on your e-commerce store!',
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: process.env.YOUR_PHONE_NUMBER,
      });

      return NextResponse.json({
        message:"done",
        success:true
     },{status:200}) 
    } catch (error) {
     console.log(error);
     return NextResponse.json({
        message:"Error",
        success:false
     },{status:500})
    }
  }