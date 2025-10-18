"use client";
import { useMarketplaceClientContext } from "@/context/MarketplaceClientProvider";
import { usePageContext } from "@/hooks/usePageContext";
import { Stack, Text, Flex, Box } from "@chakra-ui/react";

export default function PageContextExamplePage() {
  const { client } = useMarketplaceClientContext();

  const { pageContext, loading, error } = usePageContext(client);

  return (
    <Stack spacing={6} p={8} align="center">
      <Text fontSize="2xl" fontWeight="bold">
        Page Context
      </Text>
      <Text fontSize="md" maxW="2xl" textAlign="center" color="gray.600">
        The Page Context provides metadata and configuration about the current
        page as delivered by the Sitecore Marketplace. It typically includes
        details such as route information, page data, rendering parameters, and
        other settings relevant to the page. This information is useful for
        debugging, integration, and understanding how your page is structured
        and rendered within the Sitecore ecosystem.
      </Text>

      {loading && <Text>Loading Page context...</Text>}
      {error && <Text color="red.500">Error: {error.message}</Text>}
      {pageContext && (
        <Flex
          w="100%"
          maxW="1200px"
          gap={8}
          align="flex-start"
          direction={{ base: "column", md: "row" }}
        >
          <Box flex={1}>
            <Text fontWeight="semibold" mb={2}>
              Rendered Version
            </Text>
            <Stack
              spacing={2}
              align="flex-start"
              w="100%"
              bg="gray.50"
              p={6}
              borderRadius={8}
              boxShadow="md"
            >
              {Object.entries(pageContext).map(([key, value]) => (
                <Text key={key} fontSize="sm">
                  <strong>{key}:</strong>{" "}
                  {typeof value === "object"
                    ? JSON.stringify(value, null, 2)
                    : String(value)}
                </Text>
              ))}
            </Stack>
          </Box>
          <Box flex={1}>
            <Text fontWeight="semibold" mb={2}>
              Raw JSON
            </Text>
            <Box
              as="pre"
              w="100%"
              bg="gray.900"
              color="gray.100"
              p={6}
              borderRadius={8}
              boxShadow="md"
              fontSize="sm"
              overflowX="auto"
            >
              {JSON.stringify(pageContext, null, 2)}
            </Box>
          </Box>
        </Flex>
      )}
    </Stack>
  );
}
