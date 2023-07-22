"use client";

import React, { useState, useEffect } from "react";
import { Box, HStack, Icon, Spacer, Text } from "@/components/chakraui";
import { BsChatLeft } from "react-icons/bs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { useSession } from "next-auth/react";
import { RiDeleteBin6Line } from "react-icons/ri";

type Props = {
  id: string;
  onClose: () => void;
};

const ChatRow = ({ id, onClose }: Props) => {
  const [active, setActive] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!pathname) return;

    if (pathname?.includes(id)) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [pathname]);

  const [messages] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats", id, "messages"),
        orderBy("createdAt", "asc")
      )
  );

  const removeChat = async () => {
    if (
      confirm(`${session?.user?.name}, Do you really want to delete this chat?`)
    ) {
      await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));

      router.replace("/");
    }
  };

  return (
    <Box>
      <Link href={`/chat/${id}`} onClick={onClose}>
        <Box color="gray.200">
          <HStack
            sx={{
              width: "100%",
              alignItems: "center",
              py: 2,
              px: 3,
              cursor: "pointer",
              borderRadius: "sm",
              bgColor: active && "#343541",
              "&:hover": {
                bgColor: "#343541",
              },
            }}
          >
            <HStack>
              <Icon boxSize={6} mt="3">
                <BsChatLeft />
              </Icon>

              <Text>
                {`${
                  messages?.docs[messages?.docs?.length - 1]
                    ?.data()
                    ?.text.substring(0, 30) || "New chat"
                }`}
              </Text>
            </HStack>
            <Spacer />
            {active && (
              <Icon boxSize={6} mt="3" onClick={removeChat}>
                <RiDeleteBin6Line />
              </Icon>
            )}
          </HStack>
        </Box>
      </Link>
    </Box>
  );
};

export default ChatRow;
