"use client";

import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Text,
  VStack,
  useDisclosure,
} from "@/components/chakraui";
import { HiMenu } from "react-icons/hi";
import { AiOutlinePlus, AiOutlineMore } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";

type Props = {};

const Navbar = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [opened, setOpened] = useState(false);
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
        <Icon
          as={HiMenu}
          color="whiteAlpha.900"
          boxSize={5}
          sx={{
            cursor: "pointer",
          }}
          onClick={onOpen}
          // ref={btnRef}
        />
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

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bgColor="gray.900">
          <DrawerCloseButton color="gray.200" />
          <DrawerHeader>
            <Button
              leftIcon={<AiOutlinePlus />}
              colorScheme="gray"
              variant="outline"
              width="90%"
              textAlign="left"
              color="white"
              sx={{
                "&:hover": {
                  bgColor: "gray.700",
                },
              }}
            >
              New chat
            </Button>
          </DrawerHeader>

          <DrawerBody></DrawerBody>

          <DrawerFooter
            sx={{
              borderTop: "solid 1px",
              borderTopColor: "gray.500",
              height: "70px",
            }}
          >
            <HStack
              spacing="20"
              sx={{
                "&:hover": {
                  bgColor: "#343541",
                },
                bgColor: opened ? "#343541" : "gray.900",
                px: 2,
                py: 1,
                borderRadius: "md",
                width: "270px",
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
                          onClose();
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
                          onClose();
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
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
