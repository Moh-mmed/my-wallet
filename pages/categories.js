import React from "react";
import PageHead from "../src/components/PageHead";
import Header from "../src/components/Header";
import TabsBar from "../src/components/TabsBar";
import CategoriesCard from "../src/components/CategoriesCard";
import { Box } from "@mui/system";

export default function categories() {
  return (
    <>
      <PageHead title="Categories" />
      <Box className="container">
        <Header title="Categories" />
        <Box
          sx={{
            width: "100%",
            padding: "16px 20px 50px",
          }}
        >
          <CategoriesCard/>
        </Box>
        <TabsBar />
      </Box>
    </>
  );
}