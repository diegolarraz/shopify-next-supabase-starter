import { DeliveryMethod, type Session } from "@shopify/shopify-api";

import { dbService } from "@/lib/db/service";

import { setupGDPRWebHooks } from "./gdpr";
import shopify from "./initialize-context";

let initialized = false;

export function addHandlers() {
  if (initialized) return;
  setupGDPRWebHooks("/api/webhooks");

  shopify.webhooks.addHandlers({
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/api/webhooks",
      callback: async (_topic, shop) => {
        await dbService.appInstallations.markUninstalled(shop);
        await dbService.sessions.deleteByShop(shop);
      },
    },
  });

  initialized = true;
}

export async function registerWebhooks(session: Session) {
  addHandlers();
  await shopify.webhooks.register({ session });
}
