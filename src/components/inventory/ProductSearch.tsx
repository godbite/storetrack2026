import { useState, useEffect } from "react";
import { Input, Box } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "@/hooks/useDebounce";

interface ProductSearchProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const ProductSearch = ({ 
  onSearch, 
  isLoading,
  placeholder = "Search products by name..."
}: ProductSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Effect to trigger search when debounced term changes
  useEffect(() => {
    onSearch(debouncedSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <Box mb={4} position="relative">
      <Box
        position="absolute"
        left={3}
        top="50%"
        transform="translateY(-50%)"
        zIndex={1}
      >
        <FaSearch color="white" opacity={0.7} />
      </Box>
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        bg="whiteAlpha.100"
        backdropFilter="blur(10px)"
        border="1px"
        borderColor="whiteAlpha.200"
        color="white"
        _placeholder={{ color: "whiteAlpha.600" }}
        pl={10}
        disabled={isLoading}
        _focus={{
          borderColor: "purple.400",
          boxShadow: "0 0 0 1px var(--chakra-colors-purple-400)",
        }}
        _hover={{ borderColor: "whiteAlpha.300" }}
      />
    </Box>
  );
};
