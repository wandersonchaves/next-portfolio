import axios, { AxiosError } from 'axios';
import querystring from 'querystring';

import { PAIR_DEVICES } from '@/common/constant/devices';
import {
  DeviceDataProps,
  DeviceResponseProps,
  NowPlayingResponseProps,
  TopTracksResponseProps,
  TrackProps,
} from '@/common/types/spotify';
import { logger } from '@/lib/logger';

interface SpotifyTrack {
  album: {
    name: string;
    images: { url: string; width: number; height: number }[];
  };
  artists: { name: string }[];
  name: string;
  external_urls: { spotify: string };
}

const BASE_URL = 'https://api.spotify.com/v1';
const ENDPOINTS = {
  devices: `${BASE_URL}/me/player/devices`,
  nowPlaying: `${BASE_URL}/me/player/currently-playing`,
  topTracks: `${BASE_URL}/me/top/tracks`,
  token: 'https://accounts.spotify.com/api/token',
};

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  throw new Error('Spotify client credentials are not set.');
}

const BASIC_TOKEN = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
  'base64',
);

const getAccessToken = async (refreshToken: string): Promise<string> => {
  if (!refreshToken) {
    throw new Error('Refresh token is missing.');
  }

  try {
    const response = await axios.post(
      ENDPOINTS.token,
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      {
        headers: {
          Authorization: `Basic ${BASIC_TOKEN}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return response.data.access_token as string;
  } catch (error) {
    const err = error as AxiosError;
    logger.error(
      'Failed to fetch Spotify access token:',
      err.response?.data || err.message,
    );
    throw new Error('Spotify authentication failed.');
  }
};

export const getAvailableDevices = async (
  refreshToken: string,
): Promise<DeviceResponseProps> => {
  try {
    const accessToken = await getAccessToken(refreshToken);

    const response = await axios.get<DeviceDataProps>(ENDPOINTS.devices, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const devices = response.data.devices.map((device) => ({
      name: device.name,
      is_active: device.is_active,
      type: device.type,
      model: PAIR_DEVICES[device.type]?.model || 'Unknown Device',
      id: PAIR_DEVICES[device.type]?.id || 'wandersonchaves-device',
    }));

    return { status: response.status, data: devices };
  } catch (error) {
    const err = error as AxiosError;
    logger.error('Failed to get devices:', err.response?.data || err.message);
    return { status: 500, data: [] };
  }
};

export const getNowPlaying = async (
  refreshToken: string,
): Promise<NowPlayingResponseProps> => {
  try {
    const accessToken = await getAccessToken(refreshToken);

    const response = await axios.get(ENDPOINTS.nowPlaying, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.status === 204) {
      return { status: 204, isPlaying: false, data: null };
    }

    const { is_playing, item } = response.data;

    if (!item || item.type !== 'track') {
      return { status: response.status, isPlaying: false, data: null };
    }

    const { album, artists, name, external_urls } = item;
    const albumImageUrl = album.images?.[0]?.url ?? '';

    return {
      status: response.status,
      isPlaying: is_playing,
      data: {
        album: album.name,
        albumImageUrl,
        artist: artists.map((a: { name: string }) => a.name).join(', '),
        songUrl: external_urls.spotify,
        title: name,
      },
    };
  } catch (error) {
    const err = error as AxiosError;
    logger.error(
      'Error while fetching now playing:',
      err.response?.data || err.message,
    );
    return { status: 500, isPlaying: false, data: null };
  }
};

export const getTopTracks = async (
  refreshToken: string,
): Promise<TopTracksResponseProps> => {
  try {
    const accessToken = await getAccessToken(refreshToken);

    const response = await axios.get<{ items: SpotifyTrack[] }>(
      `${ENDPOINTS.topTracks}?limit=10`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    const tracks: TrackProps[] = response.data.items.map((track) => {
      const image = track.album.images.find((img) => img.width === 64) ?? {
        url: '',
        width: 64,
        height: 64,
      };

      return {
        album: {
          name: track.album.name,
          image,
        },
        artist: track.artists.map((a) => a.name).join(', '),
        songUrl: track.external_urls.spotify,
        title: track.name,
      };
    });

    return { status: response.status, data: tracks };
  } catch (error) {
    const err = error as AxiosError;
    logger.error(
      'Failed to get top tracks:',
      err.response?.data || err.message,
    );
    return { status: 500, data: [] };
  }
};
