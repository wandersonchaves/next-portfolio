import React from 'react';

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '';
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || '';
const SCOPES = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-recently-played',
].join(' ');

export const AUTH_URL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
  SCOPES,
)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

const SpotifyLoginButton = () => {
  return (
    <a
      href={AUTH_URL}
      className='inline-block rounded bg-green-500 px-4 py-2 font-semibold text-white shadow transition hover:bg-green-600'
    >
      Conectar com Spotify 🎧
    </a>
  );
};

export default SpotifyLoginButton;
