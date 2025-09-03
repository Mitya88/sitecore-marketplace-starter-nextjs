"use client";
import { MarketplaceClientProvider } from "@/context/MarketplaceClientProvider";
import {
  Flex,
  Button,
  Icon,
  Stack,
  Text,
  Box,
  ChakraProvider,
} from "@chakra-ui/react";
import {
  mdiHomeVariantOutline,
  mdiAccountMultipleOutline,
  mdiInformationOutline,
  mdiDomain,
  mdiDatabaseSearch,
  mdiWeb,
} from "@mdi/js";
import sitecoreTheme, { toastOptions } from "@sitecore/blok-theme";

const navItems = [
  { label: "Home", to: "/", icon: mdiHomeVariantOutline },
  {
    label: "Application Context",
    to: "/context",
    icon: mdiAccountMultipleOutline,
  },
  {
    label: "MarketplaceClientProvider Info",
    to: "/provider-info",
    icon: mdiInformationOutline,
  },
  { label: "Tenant Selector", to: "/tenant-selector", icon: mdiDomain },
  { label: "Query Example", to: "/query-example", icon: mdiDatabaseSearch },
  { label: "Sites by Tenant", to: "/sites-by-tenant", icon: mdiWeb },
  {
    label: "Mutation Examples",
    to: "/mutation-examples",
    icon: mdiDatabaseSearch,
  },
];

import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        <MarketplaceClientProvider>
          <ChakraProvider theme={sitecoreTheme} toastOptions={toastOptions}>
            <Flex minH="100vh" w="100vw">
              <Box
                bg="chakra-body-bg"
                p={4}
                shadow="base"
                minW="220px"
                maxW="240px"
                h="100vh"
                position="sticky"
                top={0}
              >
                <Stack spacing={2}>
                  {navItems.map((item) => (
                    <Button
                      as="a"
                      href={item.to}
                      key={item.to}
                      isActive={pathname === item.to}
                      leftIcon={
                        <Icon>
                          <path d={item.icon} />
                        </Icon>
                      }
                      variant="ghost"
                      justifyContent="flex-start"
                      w="full"
                    >
                      <Text isTruncated>{item.label}</Text>
                    </Button>
                  ))}
                </Stack>
              </Box>
              <Box flex={1} p={8}>
                {children}
              </Box>
            </Flex>
          </ChakraProvider>
        </MarketplaceClientProvider>
      </body>
    </html>
  );
}
