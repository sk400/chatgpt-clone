"use client";

import React from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Spacer,
  Text,
} from "@/components/chakraui";
import { HiMenu } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";

type Props = {
  onOpen: () => void;
};

const Navbar = ({ onOpen }: Props) => {
  return (
    <Box
      sx={{
        px: { base: 2, sm: 5, md: 7 },
        py: 3,
        borderBottom: "solid 1px",
        borderBottomColor: "gray.500",
        bgColor: "#343541",
        display: { lg: "none" },
      }}
    >
      <Flex alignItems="center">
        <IconButton
          aria-label="plus"
          onClick={onOpen}
          sx={{
            bgColor: "#343541",
            "&:hover": {
              bgColor: "#343541",
            },
          }}
        >
          <Icon
            as={HiMenu}
            color="whiteAlpha.900"
            boxSize={5}
            sx={{
              cursor: "pointer",
            }}
          />
        </IconButton>

        <Spacer />
        <Text color="whiteAlpha.900">New chat</Text>
        <Spacer />
        <Icon
          as={AiOutlinePlus}
          color="whiteAlpha.900"
          boxSize={5}
          sx={{
            cursor: "pointer",
          }}
        />
      </Flex>
    </Box>
  );
};

export default Navbar;
