import React from "react";
import PageHead from "../src/components/PageHead";
import Header from "../src/components/Header";
import TabsBar from "../src/components/TabsBar";
import StaticsChar from "../src/components/StaticsChar";
import { Box } from "@mui/system";
import StaticIncExp from "../src/components/StaticIncExp";

export default function statistics() {
  return (
    <>
      <PageHead title="Statistics" />
      <Box className="container" >
        <Header title="Statistics" />
        <Box
          sx={{
            width: "100%",
            padding: "16px 20px 50px",
          }}
        >
          <StaticsChar type="income"/>
          <StaticsChar type="expense"/>
          <StaticIncExp />
        </Box>
        <TabsBar />
      </Box>
    </>
  );
}
