import React from "react";
import { Box } from "@/components/chakraui";
import ChatInput from "./ChatInput";

type Props = {};

const Footer = (props: Props) => {
  return (
    <Box>
      <Box
        sx={{
          height: "90px",
          borderTop: {
            base: "solid 1px",
            sm: "solid 1px",
            md: "solid 1px",
            lg: "none",
          },
          borderTopColor: {
            base: "gray.500",
            sm: "gray.500",
            md: "gray.500",
            lg: "#40414f",
          },
          p: 3,
        }}
      >
        <ChatInput />
      </Box>
    </Box>
  );
};

export default Footer;
