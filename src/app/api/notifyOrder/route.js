
import { Client } from 'onesignal-node';

// Initialize OneSignal client
const client = new Client({
  app: {
    appAuthKey: process.env.oneSignalAPI,
    appId: process.env.oneSignalAPPID,
  }
});

export async function POST() {
  const notification = {
    contents: { en: 'New order placed!' },
    included_segments: ['Subscribed Users'], // Sends to all subscribed users
  };

  try {
    const response = await client.createNotification(notification);
    res.status(200).json({ message: 'Notification sent successfully', response });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: 'Failed to send notification', details: error.message });
  }
}
