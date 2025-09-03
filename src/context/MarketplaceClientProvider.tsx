import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { ApplicationContext } from "@sitecore-marketplace-sdk/client";
import { useEffect, useState } from "react";
import { useMarketplaceClient } from "@/hooks/useMarketplaceClient";

type MarketplaceClientContextType = ReturnType<typeof useMarketplaceClient> & {
  appContext?: ApplicationContext;
  appContextLoading: boolean;
  appContextError?: Error;
};

const MarketplaceClientContext = createContext<
  MarketplaceClientContextType | undefined
>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export function MarketplaceClientProvider({ children }: ProviderProps) {
  const clientState = useMarketplaceClient();
  const { client, error, isInitialized } = clientState;
  const [appContext, setAppContext] = useState<ApplicationContext>();
  const [appContextLoading, setAppContextLoading] = useState(false);
  const [appContextError, setAppContextError] = useState<Error>();

  useEffect(() => {
    if (!error && isInitialized && client) {
      setAppContextLoading(true);
      client
        .query("application.context")
        .then((res) => {
          if (res.data) {
            setAppContext(res.data);
          } else {
            setAppContextError(new Error("Application context is undefined"));
          }
          setAppContextLoading(false);
        })
        .catch((err: unknown) => {
          setAppContextError(
            err instanceof Error
              ? err
              : new Error("Failed to fetch application context")
          );
          setAppContextLoading(false);
        });
    } else if (error) {
      setAppContextError(error);
    }
  }, [client, error, isInitialized]);

  const value: MarketplaceClientContextType = {
    ...clientState,
    appContext,
    appContextLoading,
    appContextError,
  };

  return (
    <MarketplaceClientContext.Provider value={value}>
      {children}
    </MarketplaceClientContext.Provider>
  );
}

export function useMarketplaceClientContext() {
  const context = useContext(MarketplaceClientContext);
  if (!context) {
    throw new Error(
      "useMarketplaceClientContext must be used within a MarketplaceClientProvider"
    );
  }
  return context;
}
