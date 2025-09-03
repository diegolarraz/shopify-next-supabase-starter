"use client";
import { useEffect } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const app = useAppBridge();

  useEffect(() => {
    // Optionally: on mount, we can ping a server action/route to ensure webhooks are registered
    // without logging secrets, and without registering on every mount.
    // Example pattern (uncomment when backend route exists):
    // (async () => {
    //   const token = await app.idToken();
    //   await fetch("/api/ensure-webhooks", { headers: { authorization: `Bearer ${token}` } });
    // })();
  }, [app]);

  return <>{children}</>;
}
