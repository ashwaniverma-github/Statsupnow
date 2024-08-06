import { NextResponse , NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(req:NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return Response.json({ message: 'Unauthorized' });
  }

  const profile = {
    id: token.id,
    email: token.email,
    name: token.name,
    image: token.picture,
  };

  return NextResponse.json(profile);
}
