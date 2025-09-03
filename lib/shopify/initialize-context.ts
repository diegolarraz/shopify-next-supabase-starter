import "@shopify/shopify-api/adapters/web-api";
import { shopifyApi, LATEST_API_VERSION, LogSeverity } from "@shopify/shopify-api";

let shopify: ReturnType<typeof shopifyApi> | null = null;

function getShopify() {
  if (!shopify) {
    shopify = shopifyApi({
      apiKey: process.env.SHOPIFY_API_KEY || "placeholder",
      apiSecretKey: process.env.SHOPIFY_API_SECRET || "placeholder",
      scopes: process.env.SCOPES?.split(",") || [],
      hostName: (process.env.HOST || "localhost").replace(/https?:\/\//, ""),
      hostScheme: "https",
      isEmbeddedApp: true,
      apiVersion: LATEST_API_VERSION,
      logger: {
        level: process.env.NODE_ENV === "development" ? LogSeverity.Debug : LogSeverity.Error,
      },
    });
  }
  return shopify;
}

export default getShopify();
