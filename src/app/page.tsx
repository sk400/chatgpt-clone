import React from "react";
import {
  Box,
  Center,
  Flex,
  HStack,
  Heading,
  Icon,
  VStack,
  Text,
  Grid,
  GridItem,
} from "@/components/chakraui";
import { FiSun } from "react-icons/fi";
import { BsArrowRight, BsLightningCharge } from "react-icons/bs";
import { CiWarning } from "react-icons/ci";

const Home = () => {
  return (
    <Box py="32" sx={{ width: "100%", px: { base: 5 } }}>
      <Heading size="2xl" color="whiteAlpha.900" textAlign="center">
        ChatGPT
      </Heading>

      <Grid
        templateColumns="repeat(12, 1fr)"
        gap={5}
        mt={10}
        sx={{
          px: { md: "24", lg: "24", xl: "32" },
        }}
      >
        <GridItem colSpan={{ base: 12, sm: 12, md: 4 }}>
          <Flex direction="column" alignItems="center">
            <HStack alignItems="center" textAlign="center" mb={2}>
              <Icon color="whiteAlpha.900" boxSize={9} mt={3}>
                <FiSun />
              </Icon>
              <Heading size="md" color="whiteAlpha.900" fontWeight="normal">
                Examples
              </Heading>
            </HStack>
            <Flex direction="column" alignItems="center" gap={3}>
              <Text
                color="whiteAlpha.900"
                bgColor="#3e3f4b"
                px="3"
                py="2"
                borderRadius="md"
                fontSize="sm"
                sx={{
                  "&:hover": {
                    bgColor: "gray.800",
                  },
                  cursor: "pointer",
                }}
              >
                "Explain quantum computing in simple terms"
                <Icon color="whiteAlpha.900" boxSize={5} mt={2}>
                  <BsArrowRight />
                </Icon>
              </Text>
              <Text
                color="whiteAlpha.900"
                bgColor="#3e3f4b"
                px="3"
                py="2"
                borderRadius="md"
                fontSize="sm"
                sx={{
                  "&:hover": {
                    bgColor: "gray.800",
                  },
                  cursor: "pointer",
                }}
              >
                "Got any creative idea for a 10 year old's birthday"
                <Icon color="whiteAlpha.900" boxSize={5} mt={2}>
                  <BsArrowRight />
                </Icon>
              </Text>
              <Text
                color="whiteAlpha.900"
                bgColor="#3e3f4b"
                px="3"
                py="2"
                borderRadius="md"
                fontSize="sm"
                sx={{
                  "&:hover": {
                    bgColor: "gray.800",
                  },
                  cursor: "pointer",
                }}
              >
                "How do I make a HTTP request in javascript?"
                <Icon color="whiteAlpha.900" boxSize={5} mt={2}>
                  <BsArrowRight />
                </Icon>
              </Text>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem colSpan={{ base: 12, sm: 12, md: 4 }}>
          <Flex direction="column" alignItems="center">
            <HStack alignItems="center" textAlign="center" mb={2}>
              <Icon color="whiteAlpha.900" boxSize={9} mt={3}>
                <BsLightningCharge />
              </Icon>
              <Heading size="md" color="whiteAlpha.900" fontWeight="normal">
                Capabilities
              </Heading>
            </HStack>
            <Flex direction="column" alignItems="center" gap={3}>
              <Text
                color="whiteAlpha.900"
                bgColor="#3e3f4b"
                px="3"
                py="2"
                borderRadius="md"
                fontSize="sm"
              >
                Remembers what user said earlier in the conversation
              </Text>
              <Text
                color="whiteAlpha.900"
                bgColor="#3e3f4b"
                px="3"
                py="2"
                borderRadius="md"
                fontSize="sm"
              >
                Allows user to provide follow-up corrections
              </Text>
              <Text
                color="whiteAlpha.900"
                bgColor="#3e3f4b"
                px="3"
                py="2"
                borderRadius="md"
                fontSize="sm"
              >
                Trained to decline inappropriate requests
              </Text>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem colSpan={{ base: 12, sm: 12, md: 4 }}>
          <Flex direction="column" alignItems="center">
            <HStack alignItems="center" textAlign="center" mb={2}>
              <Icon color="whiteAlpha.900" boxSize={9} mt={3}>
                <CiWarning />
              </Icon>
              <Heading size="md" color="whiteAlpha.900" fontWeight="normal">
                Limitations
              </Heading>
            </HStack>
            <Flex direction="column" alignItems="center" gap={3}>
              <Text
                color="whiteAlpha.900"
                bgColor="#3e3f4b"
                px="3"
                py="2"
                borderRadius="md"
                fontSize="sm"
              >
                May occasionally generate incorrect information
              </Text>
              <Text
                color="whiteAlpha.900"
                bgColor="#3e3f4b"
                px="3"
                py="2"
                borderRadius="md"
                fontSize="sm"
              >
                May occasionally produce harmful instructions or biased content
              </Text>
              <Text
                color="whiteAlpha.900"
                bgColor="#3e3f4b"
                px="3"
                py="2"
                borderRadius="md"
                fontSize="sm"
              >
                Limited knowledge of world and events after 2021
              </Text>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Home;
