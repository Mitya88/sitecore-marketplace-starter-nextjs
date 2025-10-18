"use client";
import { useMarketplaceClientContext } from "@/context/MarketplaceClientProvider";
import { Stack, Text, Flex, Box } from "@chakra-ui/react";
import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from "react";

export default function ColorPickerCustomFieldPage() {
  const { client } = useMarketplaceClientContext();

  const [input, setInput] = useState<string>("");

  // Get the latest value on mount and whenever the client changes
  useEffect(() => {
    if (!client) return;
    const fetchValue = async () => {
      const latest = await client.getValue();
      // If latest is a JSON string, pretty print it
      if (typeof latest === "string") {
        try {
          const parsed = JSON.parse(latest);
          if (typeof parsed === "object" && parsed !== null) {
            setInput(JSON.stringify(parsed, null, 2));
            return;
          }
        } catch {
          // Not a JSON string, continue with the original string
        }
        setInput(latest);
      } else if (typeof latest === "object" && latest !== null) {
        setInput(JSON.stringify(latest, null, 2));
      } else {
        setInput(latest ? String(latest) : "");
      }
    };
    fetchValue();
  }, [client]);
  // Set the input value when the client changes
  const handleSave = async () => {
    try {
      await client?.setValue(input, true);
      client?.closeApp();
    } catch {
      // Optionally handle error
    }
  };

  return (
    <Stack spacing={6} p={8} align="center">
      <Text fontSize="2xl" fontWeight="bold">
        Color Picker
      </Text>
      <Box boxShadow="md" p={4} borderRadius="md" bg="white">
        <HexColorPicker
          color={input}
          onChange={setInput}
          style={{ width: "220px", height: "160px" }}
        />
        <Flex mt={4} align="center" gap={2}>
          <Text fontWeight="semibold">HEX:</Text>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="#RRGGBB"
            style={{
              width: "120px",
              padding: "4px 8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </Flex>
      </Box>
      <Flex gap={4} mt={4}>
        <Box>
          <Stack direction="row" spacing={4}>
            <Box
              as="button"
              onClick={handleSave}
              bg="blue.500"
              color="white"
              px={4}
              py={2}
              borderRadius="md"
              _hover={{ bg: "blue.600" }}
            >
              Save
            </Box>
            <Box
              as="button"
              onClick={() => client?.closeApp()}
              bg="red.500"
              color="white"
              px={4}
              py={2}
              borderRadius="md"
              _hover={{ bg: "red.600" }}
            >
              Close
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Stack>
  );
}
