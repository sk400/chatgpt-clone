"use client";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Input,
  useToast,
} from "@/components/chakraui";
import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { MdSend } from "react-icons/md";

type Props = {};

const ChatInput = (props: Props) => {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  const params = useParams();
  const toast = useToast();

  const sendMessage = async () => {
    if (!prompt) return;
    if (!params.id) {
      toast({
        title: "Select a chat from sidebar or create one to start chatting.",
        position: "top-right",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    } else {
      const input = prompt?.trim();
      setPrompt("");

      const message: Message = {
        text: input,
        createdAt: serverTimestamp(),
        user: {
          _id: session?.user?.email!,
          name: session?.user?.name!,
          avatar:
            session?.user?.image! ||
            `https://ui-avatars.com/api/?name=${session?.user?.name}`,
        },
      };

      await addDoc(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          params.id,
          "messages"
        ),
        message
      );

      // Toast loading...

      toast({
        title: "chatGPT is thinking....",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      await fetch("/api/askQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
          chatId: params.id,
          model: "text-davinci-003",
          session,
        }),
      })
        .then(() => {
          // Toast notification
          toast({
            title: "chatGPT responded.",
            position: "top-right",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Flex
      alignItems="center"
      bgColor="#40414f"
      borderRadius="lg"
      justifyItems="center"
    >
      <Input
        disabled={!params.id && !session}
        variant="filled"
        type="text"
        size="lg"
        outline="none"
        focusBorderColor="#40414f"
        bgColor="#40414f"
        textColor="gray.100"
        placeholder="Send a message"
        value={prompt}
        onChange={(e) => setPrompt(e?.target?.value)}
        sx={{
          "&:hover": {
            bgColor: "#40414f",
          },
        }}
      />
      <IconButton
        aria-label="submit"
        disabled={!prompt}
        onClick={sendMessage}
        sx={{
          bgColor: prompt ? "#19c37d" : "#40414f",
          cursor: prompt ? "pointer" : "default",
          "&:hover": {
            bgColor: prompt ? "#19c37d" : "#40414f",
          },
        }}
      >
        <Icon
          boxSize={9}
          mt={3}
          ml={3}
          sx={{
            color: prompt ? "white" : "gray.500",
          }}
        >
          <MdSend />
        </Icon>
      </IconButton>
    </Flex>
  );
};

export default ChatInput;
