import { RequestedTokenType } from "@shopify/shopify-api";

import shopify from "./initialize-context";

import type { Session } from "@shopify/shopify-api";

export async function verifyRequest(
  req: Request,
  isOnline: boolean
): Promise<{ shop: string; session: Session }> {
  const auth = req.headers.get("authorization") || "";
  if (!auth.startsWith("Bearer ")) {
    throw new Error("missing_bearer");
  }
  const sessionToken = auth.replace("Bearer ", "");
  return handleSessionToken(sessionToken, isOnline);
}

export async function handleSessionToken(
  sessionToken: string,
  online?: boolean
): Promise<{ shop: string; session: Session }> {
  const payload = await shopify.session.decodeSessionToken(sessionToken);
  const shop = payload.dest.replace("https://", "");
  const { session } = await shopify.auth.tokenExchange({
    shop,
    sessionToken,
    requestedTokenType: online
      ? RequestedTokenType.OnlineAccessToken
      : RequestedTokenType.OfflineAccessToken,
  });
  return { shop, session };
}
