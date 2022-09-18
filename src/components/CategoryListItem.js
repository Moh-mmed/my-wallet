import React from "react";
import { Box, ListItem, ListItemIcon, Typography } from "@mui/material";
import * as icons from "@mui/icons-material";

function useIcons(iconName) {
  let Icon = icons["Favorite"];
  if (iconName !== "") {
    Icon = icons[iconName];
  }
  return Icon;
}


const CategoryListItem = ({
  id,
  icon,
  budget,
  name,
  type,
  handleModalOpen,
  handleUpdatingCategory,
}) => {
  const Icon = useIcons(icon);
  const budgetTypo =
    budget == 0 ? "NO BUDGET LIMIT" : type === "income" ? "PLANNED" : "BUDGET";
  return (
    <ListItem
      onClick={handleUpdatingCategory}
      id={id}
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "context-menu",
        color: type === "income" ? "#009561" : "#B00020",
      }}
    >
      <ListItemIcon>
        <Icon sx={{ color: type === "income" ? "#009561" : "#B00020" }} />
      </ListItemIcon>
      <Box
        sx={{
          flexGrow: 1,
          borderBottom: "2px solid #dcdcdc",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "40px",
        }}
      >
        <Typography
          variant="body1"
          sx={{ textAlign: "start", textTransform: "capitalize" }}
        >
          {name}
        </Typography>
        <Box
          sx={{
            display: " flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          {budget > 0 && <Typography>{budget}</Typography>}
          <Typography
            sx={{ maxWidth: "35px", fontSize: "0.4rem", color: "#636363" }}
          >
            {budgetTypo}
          </Typography>
        </Box>
      </Box>
    </ListItem>
  );
};

export default CategoryListItem;
