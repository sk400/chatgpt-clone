"use client";
import React from "react";
import { Box, HStack, Icon, Spacer, Text } from "@/components/chakraui";
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

  // console.log(messages?.docs[messages?.docs?.length - 1]?.data());

  return (
    <Box
      sx={{
        pb: 20,
      }}
    >
      {messages?.docs?.map((doc) => (
        <Box
          sx={{
            bgColor:
              doc?.data()?.user?.name !== "ChatGPT" ? "#343541 " : "#444654",
          }}
        >
          <HStack
            alignItems="start"
            spacing="5"
            sx={{
              py: 5,
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
