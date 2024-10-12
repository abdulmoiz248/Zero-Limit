import nodemailer from 'nodemailer';

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: process.env.email,
        pass:   process.env.emailPassword 
    }
});


export async function sendOTPEmail(toEmail, otpCode) {
    const mailOptions = {
        from: process.env.email,
        to: toEmail,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otpCode}. It is valid for 5 minutes.`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully');
    } catch (error) {
        console.error('Error sending OTP:', error);
    }
}
