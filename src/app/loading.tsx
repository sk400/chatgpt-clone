import React from "react";
import { Box, Spinner, Text } from "@/components/chakraui";

type Props = {};

const Loading = (props: Props) => {
  return (
    <Box
      color="gray.200"
      sx={{
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#b8b8c3"
        size="xl"
      />
    </Box>
  );
};

export default Loading;
