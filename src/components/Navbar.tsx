"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Spacer,
  Text,
} from "@/components/chakraui";
import { HiMenu } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { useSession } from "next-auth/react";
import { db } from "@/firebase";

type Props = {
  onOpen: () => void;
};

const Navbar = ({ onOpen }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();

  const createChat = async () => {
    if (session?.user?.email?.length !== 0) {
      const doc = await addDoc(
        collection(db, "users", session?.user?.email!, "chats"),
        {
          userId: session?.user?.email!,
          createdAt: serverTimestamp(),
        }
      );

      if (doc?.id) {
        router.push(`/chat/${doc?.id}`);
      }
    }
  };

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
        {/* */}

        <Spacer />
        <HStack spacing={2}>
          <Text color="whiteAlpha.900">Let's chat</Text>
          <Text fontWeight="bold" color="white" fontSize="md">
            {session && session?.user?.name}
          </Text>
        </HStack>
        <Spacer />
        <IconButton
          aria-label="plus"
          sx={{
            bgColor: "#343541",
            "&:hover": {
              bgColor: "#343541",
            },
          }}
          onClick={createChat}
        >
          <Icon
            as={AiOutlinePlus}
            color="whiteAlpha.900"
            boxSize={5}
            sx={{
              cursor: "pointer",
            }}
          />
        </IconButton>
      </Flex>
    </Box>
  );
};

export default Navbar;
