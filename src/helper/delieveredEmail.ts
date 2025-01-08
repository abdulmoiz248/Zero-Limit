import nodemailer from 'nodemailer';

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: process.env.email,
        pass: process.env.emailPassword,
    },
});

export async function sendOrderDeliveredEmail(toEmail: string, orderID: string) {
    const mailOptions = {
        from: process.env.email,
        to: toEmail,
        subject: 'Your Order Has Been Delivered!',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #1b03a3;">Hello Fearless!</h2>
                <p>We are excited to let you know that your order has been successfully delivered!</p>
                <p>Thank you for choosing Zero Limit! We hope you love your new items and that they help you express your fearless style.</p>
                <p>If you’d like, we’d love to hear your feedback on this order. Please take a moment to <a href="${process.env.NEXT_PUBLIC_API_URL}/order/${orderID}/reviews" style="color: #1b03a3; text-decoration: underline;">leave a review</a>.</p>
                <p>If you have any questions or need further assistance, feel free to reach out to us at any time.</p>
                <p style="margin-top: 20px;">Thank you for being a part of our fearless community!</p>
                <p>Best regards,</p>
                <p>The Zero Limit Team</p>
            </div>
        `,
    };

    try {
       await transporter.sendMail(mailOptions);
        console.log('Order delivered email sent successfully');
    } catch (error) {
        console.error('Error sending order delivered email:', error);
    }
}
