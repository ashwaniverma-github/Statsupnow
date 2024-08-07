import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/options";
import { google, youtubeAnalytics_v2 } from 'googleapis';


//// FOR CHANNEL NOT FOR USERS 
export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: session.accessToken });

  const youtubeAnalytics = google.youtubeAnalytics({ version: 'v2', auth: oauth2Client });

  try {
    const allTimeResponse = await youtubeAnalytics.reports.query({
      ids: 'channel==MINE',
      startDate: '2000-01-01', // Start date far in the past
      endDate: new Date().toISOString().split('T')[0],
      metrics: 'estimatedMinutesWatched',
    });

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const dailyResponse = await youtubeAnalytics.reports.query({
      ids: 'channel==MINE',
      startDate: yesterday.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
      metrics: 'estimatedMinutesWatched',
    });

    const allTimeWatchTime = allTimeResponse.data.rows?.[0]?.[0] ?? 0;
    const dailyWatchTime = dailyResponse.data.rows?.[0]?.[0] ?? 0;

    return Response.json({
      allTimeWatchTime,
      dailyWatchTime,
    }, { status: 200 });

  } catch (err) {
    console.error("Error fetching watch time data:", err);
    return Response.json({ message: "error" }, { status: 500 });
  }
}
