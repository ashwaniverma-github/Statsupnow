import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { google } from 'googleapis';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return Response.json({ message: 'Unauthorized' });
  }

  const { subscriptionId } = await req.json()

  if (!subscriptionId) {
    return Response.json({ message: 'Subscription ID is required' });
  }

  try {
    const accessToken = session.accessToken;
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

    await youtube.subscriptions.delete({
      id: subscriptionId,
    });

    return Response.json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    console.error('Failed to unsubscribe:', error);
    return Response.json({ message: 'Internal Server Error' });
  }
}
