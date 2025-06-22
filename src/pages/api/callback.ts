import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const code = req.query.code as string;
  if (!code) return res.status(400).send('Missing code');

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return res
      .status(500)
      .json({ error: 'Missing Spotify environment variables' });
  }

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
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return res.status(500).json({ error: data });
  }

  res.setHeader('Set-Cookie', [
    serialize('spotify_access_token', data.access_token, {
      path: '/',
      httpOnly: true,
      maxAge: data.expires_in,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    }),
    serialize('spotify_refresh_token', data.refresh_token, {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    }),
  ]);

  return res.redirect('/');
}
