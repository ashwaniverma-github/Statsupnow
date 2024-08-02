import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from '../../../../prisma/db';// Adjust the path as necessary
import { google } from 'googleapis';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return Response.json({ message: 'Unauthorized' });
  }

  const accessToken = session.accessToken;
  const email = session.user.email;


  if (!email) {
    return Response.json({ message: 'User email not found' });
  }

  try {
    // Fetch user preferences from the database
    const user = await prisma.user.findUnique({
      where: { email },
      include: { preferences: true },
    });

    if (!user || !user.preferences || user.preferences.length === 0) {
      return Response.json({ message: 'User preferences not found' });
    }

    const preferences = user.preferences[0].topics.toString()
    console.log(preferences)
    // Set up the OAuth2 client
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    // Create YouTube client
    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

    const response = await youtube.search.list({
      part: ['snippet'],
      q: preferences, 
      maxResults: 100,
      type: ['video'],
    });

    const videos = response.data.items || [];

    return Response.json(videos);
  } catch (error) {
    console.error('Failed to fetch YouTube videos:', error);
    return Response.json({ message: 'Internal Server Error' });
  }
}

