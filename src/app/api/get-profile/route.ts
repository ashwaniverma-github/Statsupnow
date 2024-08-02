import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
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

  return Response.json(profile);
}
