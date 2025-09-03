"use client";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";

import { ReactQueryProvider } from "./query-client";
import SessionProvider from "./session-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PolarisProvider i18n={translations}>
      <ReactQueryProvider>
        <SessionProvider>{children}</SessionProvider>
      </ReactQueryProvider>
    </PolarisProvider>
  );
}
