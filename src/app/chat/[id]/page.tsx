import React from "react";
import { Box, Text } from "@/components/chakraui";
import { Chats } from "@/components";

type Props = {
  params: { id: string };
};

const ChatPage = ({ params: { id } }: Props) => {
  return (
    <Box
      color="gray.200"
      sx={{
        pt: "20",
      }}
    >
      <Chats chatId={id} />
    </Box>
  );
};

export default ChatPage;
