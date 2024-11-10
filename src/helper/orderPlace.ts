import nodemailer from 'nodemailer';

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: process.env.email,
        pass: process.env.emailPassword,
    },
});

export async function sendOrderPlacedEmail(toEmail: string) {
    const mailOptions = {
        from: process.env.EMAIL,
        to: toEmail,
        subject: 'Thank You for Your Order!',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #1b03a3;">Hello Fearless!</h2>
                <p>Thank you for placing an order with Zero Limit. We’re thrilled to have you as part of our fearless community!</p>
                <p>Your order  is being processed and will soon be on its way to you.</p>
                <p>You can track your order status anytime by visiting our website.</p>
                <p>Thank you again for choosing Zero Limit. We’re excited for you to receive your new items!</p>
                <p>Best regards,</p>
                <p>The Zero Limit Team</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Order placed email sent successfully');
    } catch (error) {
        console.error('Error sending order placed email:', error);
    }
}
