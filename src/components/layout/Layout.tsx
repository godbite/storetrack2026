import type { ReactNode } from "react";
import { Box, Container } from "@chakra-ui/react";
import { Navbar } from "./Navbar";
import { AnimatedBackground } from "./AnimatedBackground";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minH="100vh" position="relative" overflow="hidden">
      <AnimatedBackground />
      <Navbar />
      <Container maxW="container.xl" py={8} position="relative" zIndex={1}>
        {children}
      </Container>
    </Box>
  );
};
