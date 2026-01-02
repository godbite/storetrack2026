import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Card,
  Button,
  Box,
  HStack,
} from "@chakra-ui/react";
import { FaBox, FaTh, FaArrowRight } from "react-icons/fa";

const TypewriterText = () => {
  const fullText =
    "Track and manage your inventory with powerful tools and real-time insights.";
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  return (
    <Text
      fontSize="2xl"
      color="rgba(255, 255, 255, 0.85)"
      maxW="3xl"
      lineHeight="1.8"
      fontWeight="500"
      textShadow="0 2px 10px rgba(0, 0, 0, 0.3)"
      minH="80px"
    >
      {displayText}
      <Text
        as="span"
        display="inline-block"
        w="2px"
        h="1em"
        bg="purple.400"
        ml={1}
        animation={
          currentIndex < fullText.length ? "blink 2s infinite" : "none"
        }
        verticalAlign="middle"
      />
    </Text>
  );
};

export const HomePage = () => {
  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      {/* Animated Background Blobs */}
      <Box
        position="absolute"
        top="-50%"
        left="-50%"
        right="-50%"
        bottom="-50%"
        opacity={0.15}
        pointerEvents="none"
      >
        <Box
          position="absolute"
          top="20%"
          left="10%"
          w="500px"
          h="500px"
          bg="purple.500"
          borderRadius="full"
          filter="blur(120px)"
          animation="float 20s ease-in-out infinite"
        />
        <Box
          position="absolute"
          top="60%"
          right="10%"
          w="400px"
          h="400px"
          bg="blue.500"
          borderRadius="full"
          filter="blur(120px)"
          animation="float 25s ease-in-out infinite reverse"
        />
        <Box
          position="absolute"
          bottom="20%"
          left="30%"
          w="350px"
          h="350px"
          bg="pink.500"
          borderRadius="full"
          filter="blur(120px)"
          animation="float 30s ease-in-out infinite"
        />
      </Box>

      {/* Keyframe Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -30px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}
      </style>

      <VStack gap={16} align="stretch" py={20} position="relative" zIndex={1}>
        {/* Hero Section with Glassmorphic Card */}
        <VStack gap={8} maxW="5xl" mx="auto" px={6}>
          <Box
            bg="rgba(255, 255, 255, 0.05)"
            backdropFilter="blur(20px)"
            borderRadius="3xl"
            border="1px solid rgba(255, 255, 255, 0.1)"
            p={12}
            position="relative"
            overflow="hidden"
            boxShadow="0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "200%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
              animation: "shimmer 3s infinite",
            }}
          >
            <VStack gap={6} textAlign="center" position="relative" zIndex={1}>
              <VStack gap={4}>
                <Heading
                  size="3xl"
                  bgGradient="linear(to-r, white, purple.200, white)"
                  bgClip="text"
                  fontWeight="800"
                  lineHeight="1.1"
                  letterSpacing="-0.03em"
                  textShadow="0 0 40px rgba(138, 43, 226, 0.3)"
                >
                  Inventory management you can{" "}
                  <Text
                    as="span"
                    bgGradient="linear(to-r, purple.300, pink.300)"
                    bgClip="text"
                  >
                    build, adapt, and grow
                  </Text>
                </Heading>
                <TypewriterText />
              </VStack>
            </VStack>
          </Box>

          {/* CTA Buttons Below Card */}
          <HStack gap={4} justify="center" flexWrap="wrap" pt={2}>
            <Link to="/inventory">
              <Button
                size="lg"
                bg="linear-gradient(135deg, #8a2be2, #da70d6)"
                color="white"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 30px rgba(138, 43, 226, 0.4)",
                }}
                _active={{
                  transform: "translateY(0)",
                }}
                px={10}
                py={7}
                borderRadius="xl"
                fontSize="md"
                fontWeight="700"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                boxShadow="0 4px 20px rgba(138, 43, 226, 0.3)"
              >
                Get Started
              </Button>
            </Link>
            <Link to="/categories">
              <Button
                size="lg"
                bg="rgba(255, 255, 255, 0.08)"
                backdropFilter="blur(10px)"
                border="1px solid rgba(255, 255, 255, 0.2)"
                color="white"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.15)",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  transform: "translateY(-2px)",
                }}
                _active={{
                  transform: "translateY(0)",
                }}
                px={10}
                py={7}
                borderRadius="xl"
                fontSize="md"
                fontWeight="700"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                Browse Categories
              </Button>
            </Link>
          </HStack>
        </VStack>

        {/* Feature Cards with Enhanced Glassmorphism */}
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={8}
          maxW="5xl"
          mx="auto"
          w="100%"
          px={6}
        >
          {/* Inventory Card */}
          <Link to="/inventory" style={{ textDecoration: "none" }}>
            <Card.Root
              bg="rgba(255, 255, 255, 0.05)"
              backdropFilter="blur(20px)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              borderRadius="2xl"
              overflow="hidden"
              position="relative"
              transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
              boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
              cursor="pointer"
              _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                bgGradient:
                  "linear(to-r, transparent, purple.400, transparent)",
                opacity: 0,
                transition: "opacity 0.3s",
              }}
              _after={{
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "2xl",
                padding: "1px",
                background:
                  "linear-gradient(135deg, rgba(138, 43, 226, 0.5), rgba(218, 112, 214, 0.3))",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                opacity: 0,
                transition: "opacity 0.3s",
              }}
              _hover={{
                transform: "translateY(-12px) scale(1.02)",
                boxShadow:
                  "0 20px 60px rgba(138, 43, 226, 0.4), 0 0 80px rgba(138, 43, 226, 0.2)",
                bg: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(138, 43, 226, 0.4)",
                _before: {
                  opacity: 1,
                },
                _after: {
                  opacity: 1,
                },
              }}
            >
              <Card.Body p={10}>
                <VStack gap={8} align="stretch" h="full">
                  <Box
                    fontSize="6xl"
                    bgGradient="linear(to-br, purple.400, pink.400)"
                    bgClip="text"
                    filter="drop-shadow(0 4px 20px rgba(138, 43, 226, 0.5))"
                    transition="all 0.3s"
                    _groupHover={{
                      transform: "scale(1.1) rotateY(10deg)",
                    }}
                  >
                    <FaBox />
                  </Box>

                  <VStack gap={3} align="stretch" flex={1}>
                    <Heading
                      size="lg"
                      color="white"
                      fontWeight="700"
                      textShadow="0 2px 10px rgba(0, 0, 0, 0.3)"
                    >
                      Inventory Management
                    </Heading>
                    <Text
                      color="rgba(255, 255, 255, 0.7)"
                      fontSize="md"
                      lineHeight="1.6"
                    >
                      Track and manage your inventory with powerful tools and
                      real-time insights.
                    </Text>
                  </VStack>

                  <Box mt="auto">
                    <HStack
                      justify="space-between"
                      color="white"
                      fontWeight="600"
                      fontSize="md"
                      p={4}
                      borderRadius="xl"
                      bg="rgba(138, 43, 226, 0.2)"
                      border="1px solid rgba(138, 43, 226, 0.3)"
                      transition="all 0.3s"
                      _hover={{
                        bg: "rgba(138, 43, 226, 0.3)",
                        borderColor: "rgba(138, 43, 226, 0.5)",
                        transform: "translateX(4px)",
                      }}
                    >
                      <Text>View Inventory</Text>
                      <Box transition="transform 0.3s">
                        <FaArrowRight />
                      </Box>
                    </HStack>
                  </Box>
                </VStack>
              </Card.Body>
            </Card.Root>
          </Link>

          {/* Categories Card */}
          <Link to="/categories" style={{ textDecoration: "none" }}>
            <Card.Root
              bg="rgba(255, 255, 255, 0.05)"
              backdropFilter="blur(20px)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              borderRadius="2xl"
              overflow="hidden"
              position="relative"
              transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
              boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
              cursor="pointer"
              _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                bgGradient:
                  "linear(to-r, transparent, purple.400, transparent)",
                opacity: 0,
                transition: "opacity 0.3s",
              }}
              _after={{
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "2xl",
                padding: "1px",
                background:
                  "linear-gradient(135deg, rgba(138, 43, 226, 0.5), rgba(218, 112, 214, 0.3))",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                opacity: 0,
                transition: "opacity 0.3s",
              }}
              _hover={{
                transform: "translateY(-12px) scale(1.02)",
                boxShadow:
                  "0 20px 60px rgba(138, 43, 226, 0.4), 0 0 80px rgba(138, 43, 226, 0.2)",
                bg: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(138, 43, 226, 0.4)",
                _before: {
                  opacity: 1,
                },
                _after: {
                  opacity: 1,
                },
              }}
            >
              <Card.Body p={10}>
                <VStack gap={8} align="stretch" h="full">
                  <Box
                    fontSize="6xl"
                    bgGradient="linear(to-br, purple.400, pink.400)"
                    bgClip="text"
                    filter="drop-shadow(0 4px 20px rgba(138, 43, 226, 0.5))"
                    transition="all 0.3s"
                    _groupHover={{
                      transform: "scale(1.1) rotateY(10deg)",
                    }}
                  >
                    <FaTh />
                  </Box>

                  <VStack gap={3} align="stretch" flex={1}>
                    <Heading
                      size="lg"
                      color="white"
                      fontWeight="700"
                      textShadow="0 2px 10px rgba(0, 0, 0, 0.3)"
                    >
                      Category Organization
                    </Heading>
                    <Text
                      color="rgba(255, 255, 255, 0.7)"
                      fontSize="md"
                      lineHeight="1.6"
                    >
                      Organize your inventory into smart categories for better
                      control and visibility.
                    </Text>
                  </VStack>

                  <Box mt="auto">
                    <HStack
                      justify="space-between"
                      color="white"
                      fontWeight="600"
                      fontSize="md"
                      p={4}
                      borderRadius="xl"
                      bg="rgba(138, 43, 226, 0.2)"
                      border="1px solid rgba(138, 43, 226, 0.3)"
                      transition="all 0.3s"
                      _hover={{
                        bg: "rgba(138, 43, 226, 0.3)",
                        borderColor: "rgba(138, 43, 226, 0.5)",
                        transform: "translateX(4px)",
                      }}
                    >
                      <Text>Browse Categories</Text>
                      <Box transition="transform 0.3s">
                        <FaArrowRight />
                      </Box>
                    </HStack>
                  </Box>
                </VStack>
              </Card.Body>
            </Card.Root>
          </Link>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};
