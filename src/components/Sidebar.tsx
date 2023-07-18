"use client";

import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  VStack,
  Text,
  Spacer,
} from "@/components/chakraui";
import { AiOutlineMore, AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";

type Props = {};

const Sidebar = (props: Props) => {
  const [opened, setOpened] = useState(false);
  return (
    <Box
      sx={{
        bgColor: "gray.900",
        width: "310px",
        height: "99.5vh",
        display: { base: "none", sm: "none", md: "none", lg: "block" },
        p: 2,
        position: "relative",
        zIndex: 5,
      }}
    >
      <Button
        leftIcon={<AiOutlinePlus />}
        colorScheme="gray"
        variant="outline"
        width="100%"
        textAlign="left"
        color="white"
        sx={{
          "&:hover": {
            bgColor: "gray.700",
          },
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        New chat
      </Button>
      {/* chats */}

      {/* Footer */}
      <Box
        sx={{
          borderTop: "solid 1px",
          borderTopColor: "gray.500",
          height: "70px",
          position: "absolute",
          bottom: 0,
          w: "290px",

          pt: 2,
        }}
      >
        <HStack
          sx={{
            "&:hover": {
              bgColor: "#343541",
            },
            bgColor: opened ? "#343541" : "gray.900",
            width: "100%",
            px: 2,
            py: 1,
            borderRadius: "md",
            cursor: "pointer",
          }}
        >
          <HStack>
            <Avatar
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
              size="sm"
            />
            <Text color="gray.300" fontSize="md">
              Dan sulivan
            </Text>
          </HStack>
          <Spacer />
          <Popover>
            <PopoverTrigger>
              <Icon
                boxSize={8}
                color="gray.300"
                mt={2}
                onClick={() => setOpened(true)}
              >
                <AiOutlineMore />
              </Icon>
            </PopoverTrigger>
            <PopoverContent bgColor="gray.900" color="gray.100">
              <PopoverCloseButton />

              <PopoverBody>
                <VStack alignItems="start">
                  <HStack
                    sx={{
                      "&:hover": {
                        bgColor: "#343541",
                      },
                      px: 2,
                      py: 1,
                      borderRadius: "md",
                      width: "270px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setOpened(false);
                    }}
                  >
                    <Icon boxSize={6} mt="8px">
                      <RiDeleteBin5Line />
                    </Icon>
                    <Text fontSize="sm">Clear conversations</Text>
                  </HStack>
                  <HStack
                    sx={{
                      "&:hover": {
                        bgColor: "#343541",
                      },
                      px: 2,
                      py: 1,
                      borderRadius: "md",
                      width: "270px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      signOut();
                      setOpened(false);
                    }}
                  >
                    <Icon boxSize={6} mt="8px">
                      <FiLogOut />
                    </Icon>
                    <Text fontSize="sm">Log out</Text>
                  </HStack>
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
      </Box>
    </Box>
  );
};

export default Sidebar;
