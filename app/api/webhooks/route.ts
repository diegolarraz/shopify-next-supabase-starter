import { headers } from "next/headers";

import shopify from "@/lib/shopify/initialize-context";
import { addHandlers } from "@/lib/shopify/register-webhooks";

export async function POST(req: Request) {
  const headersList = await headers();
  const topic = headersList.get("x-shopify-topic") || "unknown";
  const handlers = shopify.webhooks.getHandlers(topic);
  if (handlers.length === 0) addHandlers();

  const rawBody = await req.text();
  await shopify.webhooks.process({ rawBody, rawRequest: req });
  return new Response(null, { status: 200 });
}
