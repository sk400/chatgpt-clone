"use client";
import { Box, Flex, Icon, Input } from "@/components/chakraui";
import { MdSend } from "react-icons/md";

type Props = {};

const ChatInput = (props: Props) => {
  return (
    <Flex
      alignItems="center"
      bgColor="#40414f"
      borderRadius="lg"
      justifyItems="center"
    >
      <Input
        variant="filled"
        type="text"
        size="md"
        outline="none"
        focusBorderColor="#40414f"
        bgColor="#40414f"
        textColor="gray.100"
        placeholder="Send a message"
        sx={{
          "&:hover": {
            bgColor: "#40414f",
          },
        }}
      />
      <Icon boxSize={9} color="gray.500" mt={3} cursor="pointer">
        <MdSend />
      </Icon>
    </Flex>
  );
};

export default ChatInput;
