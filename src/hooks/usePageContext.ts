import { useEffect, useState } from "react";
import { type ClientSDK, type PagesContext } from "@sitecore-marketplace-sdk/client";

export function usePageContext(client: ClientSDK | null): {
  pageContext?: PagesContext;
  loading: boolean;
  error?: Error;
} {
  const [pageContext, setPageContext] = useState<PagesContext>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (!client) return;
    setLoading(true);
    client.query("pages.context", {
      subscribe: true,
      onSuccess: (data) => {
        console.log("Page has been updated:", data);
        setPageContext(data);
        setLoading(false);
        setError(undefined);
      },
      onError: (err: unknown) => {
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      },
    });
  }, [client]);

  return { pageContext, loading, error };
}