import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '../../../../../prisma/db';

type MyToken = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
  id: string;
  error?: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: 'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        //@ts-ignore
        token.accessTokenExpires = account.expires_at * 1000;
      }

      // If the access token has not expired yet, return the token
      //@ts-ignore
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // If the access token has expired, try to refresh it
      return refreshAccessToken(token as MyToken);
    },
    async session({ session, token }) {
      session.user.id = token.sub as string;
      session.accessToken = (token as MyToken).accessToken;
      return session;
    },
    async signIn({ user }) {
      try {
        const email = user.email ?? "";
        const name = user.name ?? "Unknown";
        const image = user.image ?? "";

        if (!email) {
          console.log("User email not provided");
          return false;
        }

        await prisma.user.upsert({
          where: { email },
          update: {
            name,
            image,
          },
          create: {
            email,
            name,
            image,
          },
        });

        return true; 
      } catch (error) {
        console.error('Error upserting user details', error);
        return false; 
      }
    },
  },
};

async function refreshAccessToken(token: MyToken): Promise<MyToken> {
  try {
    const url = 'https://oauth2.googleapis.com/token';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID || "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
        refresh_token: token.refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw new Error(refreshedTokens.error || 'Failed to refresh access token');
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error('Error refreshing access token', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}


