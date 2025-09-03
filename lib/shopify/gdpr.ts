import { DeliveryMethod } from "@shopify/shopify-api";

import shopify from "./initialize-context";

export function setupGDPRWebHooks(path: string) {
  shopify.webhooks.addHandlers({
    CUSTOMERS_DATA_REQUEST: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: path,
      callback: async () => {
        // TODO: implement GDPR data request handling
      },
    },
    CUSTOMERS_REDACT: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: path,
      callback: async () => {
        // TODO: implement customer redact handling
      },
    },
    SHOP_REDACT: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: path,
      callback: async () => {
        // TODO: implement shop redact handling
      },
    },
  });
}
