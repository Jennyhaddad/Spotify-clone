// src/utils/loadSpotifySdk.js
export function loadSpotifySdk() {
    return new Promise((resolve, reject) => {
      if (window.Spotify) {
        resolve(window.Spotify);
        return;
      }
  
      window.onSpotifyWebPlaybackSDKReady = () => {
        resolve(window.Spotify);
      };
  
      const existingScript = document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]');
      if (existingScript) return;
  
      const scriptTag = document.createElement("script");
      scriptTag.src = "https://sdk.scdn.co/spotify-player.js";
      scriptTag.async = true;
      scriptTag.onerror = reject;
      document.body.appendChild(scriptTag);
    });
  }
  