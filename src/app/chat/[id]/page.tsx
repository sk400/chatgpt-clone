import React from "react";
import { Suspense } from "react";
import { Box, Text } from "@/components/chakraui";
import { Chats } from "@/components";
import Loading from "./loading";

type Props = {
  params: { id: string };
};

const ChatPage = ({ params: { id } }: Props) => {
  return (
    <Suspense fallback={<Loading />}>
      <Box
        color="gray.200"
        sx={{
          pt: "20",
        }}
      >
        <Chats chatId={id} />
      </Box>
    </Suspense>
  );
};

export default ChatPage;
