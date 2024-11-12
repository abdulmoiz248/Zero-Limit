import nodemailer from 'nodemailer';

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: process.env.email,
        pass: process.env.emailPassword
    }
});

export async function sendOrderShippedEmail(toEmail: string,  estimatedDelivery: string, trackingId: string, trackingUrl?: string) {
    const trackingInfo = trackingUrl 
        ? `<a href="${trackingUrl}" style="color: #1b03a3;">Track your shipment</a>`
        : `Tracking ID: ${trackingId}`;

    const mailOptions = {
        from: process.env.email,
        to: toEmail,
        subject: 'Your Order Has Been Shipped!',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #1b03a3;">Hello Fearless!</h2>
                <p>We're thrilled to let you know that your order  is on its way!</p>
                <p>Your tracking information is as follows:</p>
                <p><strong>${trackingInfo}</strong></p>
                <p><strong>Estimated Delivery in </strong> ${estimatedDelivery}</p>
                <p>We hope you're excited to receive your items and embrace your fearless style with Limit Zero!</p>
                <p>If you have any questions about your order, feel free to reach out to us at any time.</p>
                <p style="margin-top: 20px;">Thank you for being a part of our fearless community!</p>
                <p>Best regards,</p>
                <p>The Zero Limit  Team</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Order shipment email sent successfully');
    } catch (error) {
        console.error('Error sending order shipment email:', error);
    }
}
