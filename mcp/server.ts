// Load .env before anything touches the database.
import "dotenv/config";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { createServer } from "./tools";

// Local stdio MCP server. Tools are defined in tools.ts.
serveStdio(createServer);
