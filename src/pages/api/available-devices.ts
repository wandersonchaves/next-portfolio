import { parse } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

import { getAvailableDevices } from '@/services/spotify';

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
    const response = await getAvailableDevices(refreshToken);
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
    return res.status(200).json(response.data ?? []);
  } catch (error: unknown) {
    return res
      .status(500)
      .json({ error: 'Erro ao buscar dispositivos do Spotify.' });
  }
}
