import nodemailer from 'nodemailer';

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: process.env.email,
        pass: process.env.emailPassword,
    },
});

export async function sendOrderCancelledEmail(toEmail: string) {
    const mailOptions = {
        from: process.env.email,
        to: toEmail,
        subject: 'Your Order Has Been Cancelled',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #1b03a3;">Hello Fearless!</h2>
                <p>We regret to inform you that your order  has been cancelled.</p>
                <p>If you have any questions regarding this cancellation, feel free to reach out to us. We’re here to help and address any concerns you may have.</p>
                <p>Thank you for your understanding, and we hope to serve you in the future!</p>
                <p>Best regards,</p>
                <p>The Zero Limit Team</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Order cancelled email sent successfully');
    } catch (error) {
        console.error('Error sending order cancelled email:', error);
    }
}
