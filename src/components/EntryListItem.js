import React from 'react'
import { Box, ListItem, ListItemIcon, Typography } from "@mui/material";
import * as icons from "@mui/icons-material";

function useIcons(iconName) {
  const Icon = icons[iconName];
  return Icon;
}

function dateFormat(date) {
  const today = new Date(date);
  return `${today.getDate()}.${today.getMonth()+1}.${today.getFullYear()}`
}

const EntryListItem = ({
  id,
  category,
  type,
  amount,
  date,
  icon,
  handleContextMenu,
  handleUpdatingEntry
}) => {

  const Icon = useIcons(icon);
  
  return (
    <ListItem
      onContextMenu={handleContextMenu}
      onClick={handleUpdatingEntry}
      id={id}
      sx={{
        display: "flex",
        alignItems: "center",
        margin: "0.7rem 0",
        cursor: "context-menu",
      }}
    >
      <ListItemIcon>
        <Icon sx={{ color: "#000000c4" }} />
      </ListItemIcon>
      <Box
        sx={{
          flexGrow: 1,
          borderBottom: "2px solid #dcdcdc",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 0,
          height: "50px",
        }}
      >
        <Box sx={{ color: "#515151" }}>
          <Typography variant="body1" sx={{ textAlign: "start", textTransform:"capitalize" }}>
            {category}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: "0.65rem", textAlign: "start" }}
          >
            {dateFormat(date)}
          </Typography>
        </Box>
        <Box sx={{ color: type === "income" ? "#009561" : "#B00020" }}>
          {type === "income" ? "+" : "-"}
          {amount}
        </Box>
      </Box>
    </ListItem>
  );
};

export default EntryListItem