import { parse } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

import { getNowPlaying } from '@/services/spotify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const cookies = parse(req.headers.cookie || '');
  const refreshToken = cookies.spotify_refresh_token;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ error: 'Refresh token não encontrado nos cookies.' });
  }

  try {
    const nowPlaying = await getNowPlaying(refreshToken);
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
    return res.status(200).json(nowPlaying?.data ?? {});
  } catch (error: unknown) {
    return res.status(500).json({ error: 'Erro ao buscar dados do Spotify.' });
  }
}
