// utils/refreshToken.ts

import { google } from 'googleapis';

export async function refreshAccessToken(refreshToken: string) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/api/auth/callback/google'
  );

  oauth2Client.setCredentials({ refresh_token: refreshToken });

  try {
    const { token } = await oauth2Client.getAccessToken();
    if (!token) {
      throw new Error("Failed to refresh access token");
    }

    return {
      access_token: token,
      expiry_date: oauth2Client.credentials.expiry_date,
    };
  } catch (error) {
    console.error("Failed to refresh access token", error);
    throw error;
  }
}
