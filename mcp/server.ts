import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { createServer } from "./tools";

// Start the local MCP server.
// The listing tools are defined in tools.ts.
serveStdio(createServer);