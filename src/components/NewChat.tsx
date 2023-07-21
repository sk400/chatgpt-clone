"use client";

import { Button } from "@/components/chakraui";
import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";

type Props = {
  isDrawer: boolean;
};

const NewChat = ({ isDrawer }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();

  //   const createChat = async () => {
  //     try {
  //       const doc = await addDoc(
  //         collection(db, "users", session?.user?.email!, "chats"),
  //         {
  //           userId: session?.user?.email!,
  //           createdAt: serverTimestamp(),
  //         }
  //       );

  //       //   console.log(doc);
  //       console.log("here");

  //       router.push(`/chat/${doc?.id}`);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const createChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );

    //   console.log(doc);
    console.log("here");

    router.push(`/chat/${doc?.id}`);
  };

  return (
    <Button
      leftIcon={<AiOutlinePlus />}
      colorScheme="gray"
      variant="outline"
      width={!isDrawer ? "100%" : "90%"}
      textAlign="left"
      color="white"
      sx={{
        "&:hover": {
          bgColor: "gray.700",
        },
        position: !isDrawer && "sticky",
        top: 0,
        left: 0,
        right: 0,
      }}
      onClick={() => createChat()}
    >
      New chat
    </Button>
  );
};

export default NewChat;
