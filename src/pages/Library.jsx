import { Box, Typography, List } from "@mui/material";
import React, { useEffect, useState } from "react";
import PlaylistItem from "../components/PlaylistItem/PlaylistItem";

const Library = ({ token, spotifyApi }) => {
  const [playlists, setPlaylists] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("📚 Library component mounted");
    async function getPlaylists() {
      if (!spotifyApi || !token) return;

      try {
        const data = await spotifyApi.getUserPlaylists();
        setPlaylists(data.body.items);
        console.log("Your playlists:", data.body.items);
      } catch (err) {
        console.error("❌ ", err);
      } finally {
        setLoading(false);
      }
    }

    getPlaylists();
  }, [spotifyApi, token]);

  const renderPlaylistItem = () => {
    if (loading) {
      return Array.from({ length: 7 }, (_, i) => (
        <PlaylistItem loading key={i} />
      ));
    }

    if (!playlists || playlists.length === 0) {
      return (
        <Typography color="text.secondary">No playlists were found.</Typography>
      );
    }

    return playlists.map((playlist, i) => (
      <PlaylistItem key={playlist.id || i} loading={false} {...playlist} />
    ));
  };

  return (
    <Box
      id="Library"
      px={3}
      sx={{
        display: { xs: 'flex', md: 'none' },
        backgroundColor: 'background.default',
        flex: 1,
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      <Typography
        py={3}
        sx={{
          color: 'text.primary',
          fontSize: 30,
        }}
      >
        Your Library
      </Typography>

      <List>{renderPlaylistItem()}</List>
    </Box>
  );
};

export default Library;
