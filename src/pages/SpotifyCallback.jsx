// pages/SpotifyCallback.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/pkce'; // Se till att denna funktion hanterar tokenhämtningen korrekt

const SpotifyCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const runCallback = async (code) => {
      try {
        // Hämta token från Spotify
        const tokenData = await getToken(code);
        
        // Spara token i sessionStorage
        if (tokenData && tokenData.access_token) {
          sessionStorage.setItem('spotifyToken', tokenData.access_token); // Spara access token i sessionStorage
        }
        
        // Redirect user after login
        navigate('/');
      } catch (error) {
        console.error('Error handling Spotify callback:', error);
      }
    };

    const code = new URLSearchParams(window.location.search).get('code');
    const codeVerifier = localStorage.getItem('code_verifier');

    if (!code || !codeVerifier) {
      console.warn('Missing code or code_verifier');
      return;
    }

    runCallback(code);
  }, [navigate]);

  return <p>Logging you in...</p>;
};

export default SpotifyCallback;
