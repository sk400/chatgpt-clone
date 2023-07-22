"use client";

import React, { useState } from "react";
import {
  Avatar,
  Box,
  HStack,
  Icon,
  VStack,
  Text,
  Spacer,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@/components/chakraui";
import { AiOutlineMore } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import NewChat from "./NewChat";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import ChatRow from "./ChatRow";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: Props) => {
  const [opened, setOpened] = useState(false);
  const { data: session } = useSession();

  const [chats] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  // console.log(value);

  return (
    <Box>
      {/* md and more screen sidebar */}
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
        <NewChat isDrawer={false} />
        {/* chats */}

        <Box
          sx={{
            overflowY: "auto",
          }}
        >
          {chats?.docs?.map((chat) => (
            <ChatRow key={chat?.id} id={chat?.id} onClose={onClose} />
          ))}
        </Box>
        {/* Footer */}
        {session && (
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
                  name={session?.user?.name!}
                  src={session?.user?.image!}
                  size="sm"
                />
                <Text color="gray.300" fontSize="md">
                  {session?.user?.name!}
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
        )}
      </Box>
      {/* base, sm screen sidebar */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bgColor="gray.900">
          <DrawerCloseButton color="gray.200" />
          {/* New chat button */}
          <DrawerHeader>
            <NewChat isDrawer />
          </DrawerHeader>
          {/* Chats */}
          <DrawerBody>
            {chats?.docs?.map((chat) => (
              <ChatRow key={chat?.id} id={chat?.id} onClose={onClose} />
            ))}
          </DrawerBody>

          {session && (
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
                    name={session?.user?.name!}
                    src={session?.user?.image!}
                    size="sm"
                  />
                  <Text color="gray.300" fontSize="md">
                    {session?.user?.name!}
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
          )}
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
