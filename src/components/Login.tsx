"use client";

import React from "react";
import { Button, Center, Text, VStack } from "@/components/chakraui";
import Image from "next/image";
import { signIn } from "next-auth/react";

type Props = {};

const Login = (props: Props) => {
  return (
    <Center
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        bgColor: "#343541",
      }}
    >
      <VStack spacing="3">
        <Image
          width="70"
          height="70"
          alt="chatgpt logo"
          src="/assets/logo.png"
        />
        <VStack spacing="2">
          <Text color="white">Welcome to ChatGPT</Text>
          <Text color="white">Login with your Google account to continue</Text>
        </VStack>
        <Button
          bgColor="#10a37f"
          variant="solid"
          color="white"
          onClick={() => signIn("google")}
        >
          Log in
        </Button>
      </VStack>
    </Center>
  );
};

export default Login;
