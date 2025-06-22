import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

import { signToken, verifyToken } from '@/lib/jwt';
import { logger } from '@/lib/logger';

interface SpotifyJwtPayload {
  refresh_token: string;
  access_token?: string;
  expires_in?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.cookies.spotify_jwt;
  if (!token) {
    return res.status(401).json({ error: 'No token provided.' });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'Spotify credentials not set.' });
  }

  try {
    const decoded = verifyToken(token) as SpotifyJwtPayload;
    const refreshToken = decoded.refresh_token;

    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64',
    );

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    const newToken = signToken({
      access_token: data.access_token,
      refresh_token: refreshToken,
      expires_in: Date.now() + data.expires_in * 1000,
    });

    res.setHeader(
      'Set-Cookie',
      serialize('spotify_jwt', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      }),
    );

    return res.status(200).json({ message: 'Token refreshed' });
  } catch (err) {
    logger.error('Token refresh failed:', err);
    return res.status(401).json({ error: 'Invalid token' });
  }
}
