import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return res
      .status(500)
      .json({ error: 'Missing SPOTIFY_CLIENT_ID or SPOTIFY_REDIRECT_URI' });
  }

  const scope = [
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
  ].join(' ');

  const queryParams = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
  });

  return res.redirect(
    `https://accounts.spotify.com/authorize?${queryParams.toString()}`,
  );
}
