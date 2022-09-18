import React from 'react'
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from '@mui/material';
import Router, { useRouter } from "next/router";

function TabsBar({ handleNewButton, newButton, handleNewEntry }) {
  const [tab, setTab] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    const currPage = router.route.substring(1);
    setTab(currPage);
  }, []);

  const handleAddIncExsButton = (type) => {
    handleNewButton();
    handleNewEntry(type)
  }

  const handleTabClick = (param) => {
    Router.push(`/${param}`);
  };


  return (
    <div className="tabs-bar">
      <div className="tab" onClick={() => handleTabClick("overview")}>
        <HomeIcon sx={{ color: tab === "overview" ? "#03DAC5" : "#fff" }} />
        <Typography
          variant="body2"
          component="p"
          sx={{
            color: tab === "overview" ? "#03DAC5" : "#fff",
            fontSize: "0.7rem",
          }}
        >
          Overview
        </Typography>
      </div>
      <div className="tab" onClick={() => handleTabClick("categories")}>
        <CategoryIcon
          sx={{ color: tab === "categories" ? "#03DAC5" : "#fff" }}
        />
        <Typography
          variant="body2"
          component="p"
          sx={{
            color: tab === "categories" ? "#03DAC5" : "#fff",
            fontSize: "0.7rem",
          }}
        >
          Categories
        </Typography>
      </div>
      <div className="tab" onClick={() => handleTabClick("statistics")}>
        <EqualizerIcon
          sx={{ color: tab === "statistics" ? "#03DAC5" : "#fff" }}
        />
        <Typography
          variant="body2"
          component="p"
          sx={{
            color: tab === "statistics" ? "#03DAC5" : "#fff",
            fontSize: "0.7rem",
          }}
        >
          Statistics
        </Typography>
      </div>
      <div className="add">
        <div className="add-icon">
          <AddIcon onClick={handleNewButton} />
        </div>
      </div>
      {newButton && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            position: "absolute",
            right: "25px",
            bottom: "90px",
          }}
        >
          <Button
            variant="contained"
            onClick={() => handleAddIncExsButton("expense")}
            sx={{
              marginTop: "1rem ",
              backgroundColor: "#6200EE",
              width: "fit-content",
              padding: "2px 10px",
              fontSize: ".75rem",
              "&:hover": {
                backgroundColor: "#6200EE",
              },
            }}
          >
            ADD EXPENSE
          </Button>
          <Button
            variant="contained"
            onClick={() => handleAddIncExsButton("income")}
            sx={{
              marginTop: "1rem ",
              backgroundColor: "#6200EE",
              width: "fit-content",
              padding: "2px 10px",
              fontSize: ".75rem",
              "&:hover": {
                backgroundColor: "#6200EE",
              },
            }}
          >
            ADD INCOME
          </Button>
        </Box>
      )}
    </div>
  );
}

export default TabsBar