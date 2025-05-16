import React from "react";
import {
  Box,
  /*Grid, */
  IconButton,
  Container,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PlayerControls from "../PlayerControls/PlayerControls";

const PlayerOverlay = ({
  playerOverlayIsOpen,
  closeOverlay,
  progress,
  is_paused,
  duration,
  player,
  current_track,
  active,
}) => {
  return (
    <Box
      id="PlayerOverlay"
      sx={{
        width: "100%",
        height: "calc(100vh - 56px)", 
        backgroundColor: "background.paper",
        display: { xs: "block", md: "none" },
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2000,
        transition: "transform 0.3s",
        transform: playerOverlayIsOpen ? "translateY(0)" : "translateY(100vh)",
        overflow: "hidden",
      }}
    >
      <Container
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          py: 2,
        
         
        }}
      >
        {/* Stäng-knapp */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={closeOverlay} sx={{ paddingLeft: 0 }}>
            <KeyboardArrowDownIcon fontSize="large" sx={{ color: "text.primary" }} />
          </IconButton>
        </Box>

        {/* Kvadratisk bild */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 340,
            margin: "0 auto",
            aspectRatio: "1 / 1",
            backgroundImage: `url("${current_track?.album.images?.[0]?.url}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            my: 3,
          }}
        />

        {/* Låtinfo till vänster med mellanrum */}
        <Box sx={{ mb: 3, mt:2, px: 1 }}>
          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 600,
              color: "text.primary",
              textAlign: "left",
              mb: 1,
            }}
          >
            {current_track?.name || "Ingen låt"}
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              color: "text.secondary",
              textAlign: "left",
            }}
          >
            {current_track?.artists?.[0]?.name || ""}
          </Typography>
        </Box>

        <Box sx={{ mt: 3, mb: 1 }}>
          {active ? (
            <PlayerControls
              progress={typeof progress === "number" ? progress : 0}
              is_paused={is_paused}
              duration={typeof duration === "number" ? duration : 0}
              player={player}
            />
          ) : (
            <Box sx={{ textAlign: "center", color: "text.secondary" }}>
              Please transfer playback
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default PlayerOverlay;
