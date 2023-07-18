import { Box, Flex } from "@/components/chakraui";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        overflowY: "hidden",
      }}
    >
      <Box>
        <Sidebar />
      </Box>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          flex: 1,
        }}
      >
        {/* Navbar */}
        <Box
          sx={{
            position: "sticky",
            top: 0,

            width: "100%",
          }}
        >
          <Navbar />
        </Box>
        {/* Page contents */}
        <Box
          sx={{
            height: "90vh",
            width: "100%",
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
        {/* Footer */}
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            right: 0,
            left: 0,
            width: "100%",
            bgColor: "#343541",
          }}
        >
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
