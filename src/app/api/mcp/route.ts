import { createMcpHandler } from "@modelcontextprotocol/server";
import { createServer } from "../../../../mcp/tools";
import { safeEqual } from "../../../lib/security";

// The MCP server must run in the Node.js runtime.
export const runtime = "nodejs";

// Each request gets its own MCP server instance.
const handler = createMcpHandler(createServer, {
  responseMode: "json",
});

async function handleRequest(request: Request): Promise<Response> {
  const secret = process.env.MCP_API_TOKEN;

  // Never expose the endpoint without a configured secret.
  if (!secret) {
    return new Response("MCP is not configured", { status: 503 });
  }

  // Reject browser-originated cross-origin requests.
  // Later we can add an explicit allowlist if needed.
  if (request.headers.has("origin")) {
    return new Response("Forbidden origin", { status: 403 });
  }

  const authorization = request.headers.get("authorization");
  const prefix = "Bearer ";

  if (!authorization?.startsWith(prefix)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const token = authorization.slice(prefix.length);

  if (!safeEqual(token, secret)) {
    return new Response("Unauthorized", { status: 401 });
  }

  return handler.fetch(request);
}

export const GET = handleRequest;
export const POST = handleRequest;
export const DELETE = handleRequest;

