import React from "react";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Skeleton,
  ListItemText
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PlaylistItem = ({ loading, name, images, id }) => {
  const nav = useNavigate();

  if (loading) {
    return (
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemAvatar sx={{ marginRight: '16px' }}>
            <Skeleton variant="rectangular" width={60} height={60} />
          </ListItemAvatar>
          <Skeleton variant="text" width={150} height={20} />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => nav(`/dashboard/playlist/${id}`)}  >
        <ListItemAvatar sx={{ marginRight: '16px' }}>
          <Avatar src={images?.[0]?.url} variant="square" sx={{ width: 60, height: 60 }} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          sx={{ color: 'text.primary' }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default PlaylistItem;
