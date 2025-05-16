import React from "react";
import { Box, Button } from "@mui/material";
import { generateCodeVerifier, generateCodeChallenge } from '../utils/pkce';
const clientId = import.meta.env.VITE_CLIENT_ID;
const devURL = import.meta.env.VITE_LIVE_URL;

export async function redirectToSpotifyAuth() {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
  
    localStorage.setItem('code_verifier', codeVerifier); // Save for later
  
      const scope = 'playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private app-remote-control streaming user-read-email user-read-private user-library-modify user-library-read user-top-read user-read-playback-position ugc-image-upload user-modify-playback-state user-read-playback-state user-read-currently-playing user-follow-modify user-follow-read user-read-recently-played'
  
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: devURL,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    });
  
    const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
    console.log("🔗 Redirecting to:", authUrl);
    window.location.href = authUrl;
    
  }
// 🔐 PKCE helpers


const Login = () => {

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <img
        src="/Spotify_Logo.png"
        alt="Spotify logo"
        style={{ marginBottom: '300px', width: '70%', maxWidth: '500px' }}
      />
      <Button color="primary" size="large" variant="contained" onClick={redirectToSpotifyAuth}>
        Login to Spotify
      </Button>
    </Box>
  );
};

export default Login;
