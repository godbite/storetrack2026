import { Link } from "react-router-dom";
import {
  Box,
  HStack,
  Button,
  Heading,
  Container,
  IconButton,
  Drawer,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FaBars, FaTimes } from "react-icons/fa";

export const Navbar = () => {
  const { open, setOpen } = useDisclosure();
  return (
    <Box as="nav" position="sticky" top={4} zIndex={100} px={4} py={4} mb={8}>
      <Container maxW="container.xl">
        <Box
          bg="rgba(45, 27, 78, 0.4)"
          backdropFilter="blur(20px) saturate(180%)"
          border="1px"
          borderColor="rgba(138, 43, 226, 0.3)"
          borderRadius="2xl"
          px={{ base: 4, md: 6, lg: 8 }}
          py={{ base: 3, md: 4, lg: 5 }}
          shadow="2xl"
          boxShadow="0 8px 32px 0 rgba(138, 43, 226, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05) inset"
          position="relative"
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "2xl",
            padding: "1px",
            background:
              "linear-gradient(135deg, rgba(138, 43, 226, 0.4), rgba(75, 0, 130, 0.2))",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          }}
        >
          <HStack justify="space-between" align="center">
            {/* Logo/Brand - Left */}
            <Link to="/">
              <HStack
                gap={3}
                _hover={{ opacity: 0.8, transform: "translateY(-1px)" }}
                transition="all 0.2s"
              >
                <Box
                  width="32px"
                  height="32px"
                  borderRadius="md"
                  bg="linear-gradient(135deg, #8a2be2, #4b0082)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="0 4px 12px rgba(138, 43, 226, 0.4)"
                >
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="white"
                    style={{ display: "block" }}
                  >
                    <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 16H4V8h16v12z" />
                  </svg>
                </Box>
                <Heading
                  size="lg"
                  color="white"
                  fontWeight="700"
                  fontSize={{ base: "lg", md: "2xl" }}
                  letterSpacing="-0.03em"
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  textShadow="0 2px 10px rgba(138, 43, 226, 0.3)"
                >
                  Inventory Dashboard
                </Heading>
              </HStack>
            </Link>

            {/* Navigation Links - Center */}
            <HStack
              gap={2}
              flex="1"
              justify="center"
              display={{ base: "none", md: "flex" }}
            >
              <Link to="/">
                <Button
                  variant="ghost"
                  color="white"
                  _hover={{
                    bg: "rgba(138, 43, 226, 0.2)",
                    color: "white",
                    transform: "translateY(-2px)",
                  }}
                  fontWeight="500"
                  fontSize={{ base: "sm", md: "md" }}
                  px={{ base: 4, md: 5 }}
                  py={{ base: 2, md: 3 }}
                  borderRadius="lg"
                  transition="all 0.2s"
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  letterSpacing="-0.01em"
                >
                  Home
                </Button>
              </Link>
              <Link to="/inventory">
                <Button
                  variant="ghost"
                  color="white"
                  _hover={{
                    bg: "rgba(138, 43, 226, 0.2)",
                    color: "white",
                    transform: "translateY(-2px)",
                  }}
                  fontWeight="500"
                  fontSize={{ base: "sm", md: "md" }}
                  px={{ base: 4, md: 5 }}
                  py={{ base: 2, md: 3 }}
                  borderRadius="lg"
                  transition="all 0.2s"
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  letterSpacing="-0.01em"
                >
                  Inventory
                </Button>
              </Link>
              <Link to="/categories">
                <Button
                  variant="ghost"
                  color="white"
                  _hover={{
                    bg: "rgba(138, 43, 226, 0.2)",
                    color: "white",
                    transform: "translateY(-2px)",
                  }}
                  fontWeight="500"
                  fontSize={{ base: "sm", md: "md" }}
                  px={{ base: 4, md: 5 }}
                  py={{ base: 2, md: 3 }}
                  borderRadius="lg"
                  transition="all 0.2s"
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  letterSpacing="-0.01em"
                >
                  Categories
                </Button>
              </Link>
            </HStack>

            {/* CTA Button - Right */}
            <HStack gap={2}>
              <Link to="/inventory" style={{ display: "contents" }}>
                <Button
                  display={{ base: "none", md: "inline-flex" }}
                  bg="linear-gradient(135deg, #8a2be2, #4b0082)"
                  color="white"
                  border="1px"
                  borderColor="rgba(255, 255, 255, 0.1)"
                  _hover={{
                    bg: "linear-gradient(135deg, #9d4edd, #5a189a)",
                    transform: "translateY(-2px)",
                    shadow: "0 8px 20px rgba(138, 43, 226, 0.4)",
                  }}
                  fontWeight="600"
                  fontSize={{ base: "sm", md: "md", lg: "lg" }}
                  px={{ base: 5, md: 6, lg: 7 }}
                  py={{ base: 2, md: 3 }}
                  borderRadius="lg"
                  transition="all 0.2s"
                  shadow="0 4px 12px rgba(138, 43, 226, 0.3)"
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  letterSpacing="-0.01em"
                >
                  Get Started
                </Button>
              </Link>

              {/* Mobile Menu (Chakra v3 Drawer) */}
              <Drawer.Root
                open={open}
                onOpenChange={(details) => setOpen(details.open)}
                placement="start"
              >
                <Drawer.Trigger asChild>
                  <IconButton
                    aria-label={open ? "Close menu" : "Open menu"}
                    variant="ghost"
                    color="white"
                    fontSize="xl"
                    display={{ base: "inline-flex", md: "none" }}
                    _hover={{ bg: "rgba(138, 43, 226, 0.2)" }}
                  >
                    {open ? <FaTimes /> : <FaBars />}
                  </IconButton>
                </Drawer.Trigger>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content
                    bg="rgba(24, 16, 40, 0.95)"
                    backdropFilter="blur(12px)"
                  >
                    <Drawer.Header color="white">Menu</Drawer.Header>
                    <Drawer.Body>
                      <VStack align="stretch" gap={2}>
                        <Link to="/" onClick={() => setOpen(false)}>
                          <Button
                            variant="ghost"
                            color="white"
                            justifyContent="flex-start"
                          >
                            Home
                          </Button>
                        </Link>
                        <Link to="/inventory" onClick={() => setOpen(false)}>
                          <Button
                            variant="ghost"
                            color="white"
                            justifyContent="flex-start"
                          >
                            Inventory
                          </Button>
                        </Link>
                        <Link to="/categories" onClick={() => setOpen(false)}>
                          <Button
                            variant="ghost"
                            color="white"
                            justifyContent="flex-start"
                          >
                            Categories
                          </Button>
                        </Link>
                      </VStack>
                    </Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Drawer.Root>
            </HStack>
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};
