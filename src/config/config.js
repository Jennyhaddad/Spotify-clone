// src/config/config.js

// Klient-ID från Spotify Developer Dashboard
export const clientId = import.meta.env.VITE_CLIENT_ID;

// Redirect URI från .env-filen
export const redirectUri = import.meta.env.VITE_REDIRECT_URI;

// De scopes du vill begära:
export const scopes = [
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'app-remote-control',
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'ugc-image-upload',
  'user-modify-playback-state',
  'user-read-playback-state',
  'user-read-currently-playing',
  'user-follow-modify',
  'user-follow-read',
  'user-read-recently-played'
];
