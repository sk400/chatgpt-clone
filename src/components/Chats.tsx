"use client";
import React, { useEffect } from "react";
import { Box, HStack, Text } from "@/components/chakraui";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { useSession } from "next-auth/react";
import { Image } from "@chakra-ui/react";

type Props = {
  chatId: string;
};

const Chats = ({ chatId }: Props) => {
  const { data: session } = useSession();
  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  if (messages?.docs?.length === 0) {
    return (
      <Text
        sx={{
          textAlign: "center",
        }}
      >
        No chats found, start chatting {`${session && session?.user?.name}`}
      </Text>
    );
  }

  return (
    <Box
      sx={{
        pb: 20,
      }}
    >
      {messages?.docs?.map((doc, index) => (
        <Box
          key={index}
          sx={{
            bgColor:
              doc?.data()?.user?.name !== "ChatGPT" ? "#343541 " : "#444654",
          }}
        >
          <HStack
            alignItems="start"
            spacing="5"
            sx={{
              pt: 5,
              pb: 10,
              px: { base: 5, sm: 10 },
              maxWidth: "750px",
              mx: "auto",
            }}
          >
            <Image
              src={doc?.data()?.user?.avatar}
              alt=""
              sx={{
                width: "30px",
                height: "30px",
                borderRadius: "sm",
              }}
            />
            <Text mb={5}>{doc?.data()?.text}</Text>
          </HStack>
        </Box>
      ))}
    </Box>
  );
};

export default Chats;

// #343541 (user)
// #444654 (chatgpt)
