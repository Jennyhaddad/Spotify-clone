import React, { useEffect, useState } from "react";
import { Box, Grid, Avatar, Typography } from "@mui/material";
import PlayerControls from "../PlayerControls/PlayerControls";
import PlayerVolume from "../PlayerVolume/PlayerVolume";
import PlayerOverlay from "../PlayerOverlay/PlayerOverlay";
import { loadSpotifySdk } from "../../utils/loadSpotifySdk"; // 🧠 OBS: kontrollera sökvägen

const Player = ({ spotifyApi }) => {
  const token = sessionStorage.getItem("spotifyToken"); // ✅ säkra token från storage

  const [localPlayer, setLocalPlayer] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);
  const [playerOverlayIsOpen, setPlayerOverlayIsOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      console.warn("❌ No token available.");
      return;
    }

    loadSpotifySdk()
      .then(() => {
        const player = new window.Spotify.Player({
          name: "My Player",
          getOAuthToken: cb => cb(token),
          volume: 0.5,
        });

        player.addListener("ready", ({ device_id }) => {
          console.log("✅ Ready with Device ID", device_id);
          setDeviceId(device_id);
          setLocalPlayer(player);
        });

        player.addListener("not_ready", ({ device_id }) => {
          console.warn("⚠️ Device went offline", device_id);
        });

        player.addListener("player_state_changed", (state) => {
          if (!state?.track_window?.current_track) return;

          setDuration(state.track_window.current_track.duration_ms / 1000);
          setProgress(state.position / 1000);
          setIsPaused(state.paused);
          setCurrentTrack(state.track_window.current_track);

          player.getCurrentState().then(s => setActive(!!s));
        });

        player.connect();
      })
      .catch(err => {
        console.error("❌ Spotify SDK load error:", err);
      });

    return () => {
      if (localPlayer) {
        localPlayer.disconnect();
      }
    };
  }, [token]);

  useEffect(() => {
    if (!deviceId) return;

    spotifyApi.transferMyPlayback([deviceId], { play: false }).catch(err =>
      console.error("⚠️ Playback transfer failed:", err)
    );
  }, [deviceId, spotifyApi]);

  return (
    <Box>
      <Grid
        onClick={() => setPlayerOverlayIsOpen(prev => !prev)}
        container
        px={3}
        sx={{
          backgroundColor: "background.paper",
          color: "text.primary",
          height: 100,
          cursor: { xs: "pointer", md: "auto" },
          width: "100%",
          borderTop: "1px solid #292929",
        }}
      >
        <Grid item xs={12} md={4} sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={currentTrack?.album?.images?.[0]?.url}
            alt={currentTrack?.album?.name}
            variant="square"
            sx={{ width: 56, height: 56, marginRight: 2 }}
          />
          <Box>
            <Typography sx={{ fontSize: 14 }}>{currentTrack?.name}</Typography>
            <Typography sx={{ fontSize: 10, color: "text.secondary" }}>
              {currentTrack?.artists?.[0]?.name}
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          md={4}
          sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center", alignItems: "center" }}
        >
          {active ? (
            <PlayerControls
              progress={progress}
              is_paused={isPaused}
              duration={duration}
              player={localPlayer}
            />
          ) : (
            <Box>Please transfer playback</Box>
          )}
        </Grid>

        <Grid
          item
          xs={6}
          md={4}
          sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", justifyContent: "flex-end" }}
        >
          <PlayerVolume player={localPlayer} />
        </Grid>
      </Grid>

      <PlayerOverlay
        playerOverlayIsOpen={playerOverlayIsOpen}
        closeOverlay={() => setPlayerOverlayIsOpen(false)}
        progress={progress}
        is_paused={isPaused}
        duration={duration}
        player={localPlayer}
        current_track={currentTrack}
        active={active}
      />
    </Box>
  );
};

export default Player;
