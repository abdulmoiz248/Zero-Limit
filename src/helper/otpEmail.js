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
        subject: 'Your OTP Code from Limit Zero',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #1b03a3;">Hello Fearless!</h2>
                <p>We're excited to have you on this journey with us at Limit Zero.</p>
                <p>Your one-time password (OTP) is <strong style="font-size: 24px;">${otpCode}</strong>.</p>
                <p>If you didn't request this OTP, please ignore this email.</p>
                <p>Thank you for being a part of our fearless community!</p>
                <p style="margin-top: 20px;">Best regards,</p>
                <p>The Limit Zero Team</p>
            </div>
        `,
    };
    

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully');
    } catch (error) {
        console.error('Error sending OTP:', error);
    }
}

export async function sendOrderEmail(toEmail, otpCode) {
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

