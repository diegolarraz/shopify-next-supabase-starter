import { NextResponse } from "next/server";

import { verifyRequest } from "@/lib/shopify/verify";

export async function GET(req: Request) {
  try {
    await verifyRequest(req, true);
    return NextResponse.json({ status: "success", data: { hello: "world" } });
  } catch (e: unknown) {
    const name = (e as Error)?.name || "";
    const status = name === "ExpiredTokenError" ? 401 : 403;
    return NextResponse.json({ status: "error", message: "unauthorized" }, { status });
  }
}
