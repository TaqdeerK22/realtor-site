import { McpServer } from "@modelcontextprotocol/server";
import * as z from "zod/v4";
import { getActiveListing, searchListings } from "../src/lib/listings";

// Read-only tools: they expose public listing data and nothing else
// (no inquiries, subscribers or admin actions).

function text(value: unknown) {
  return {
    content: [
      {
        type: "text" as const,
        text: typeof value === "string" ? value : JSON.stringify(value, null, 2),
      },
    ],
  };
}

function failure(message: string) {
  return { isError: true, content: [{ type: "text" as const, text: message }] };
}

// Create a fresh MCP server for each connection.
export function createServer() {
  const server = new McpServer({
    name: "mark-realty-mcp",
    version: "1.0.0",
  });

  server.registerTool(
    "search_listings",
    {
      description:
        "Search active real estate listings by location, maximum price, minimum bedrooms and property type.",
      inputSchema: z.object({
        location: z.string().optional(),
        maxPrice: z.number().nonnegative().optional(),
        minBedrooms: z.number().int().nonnegative().optional(),
        propertyType: z.string().optional(),
      }),
    },
    async (filters) => {
      try {
        return text(await searchListings(filters, 10));
      } catch (error) {
        console.error("Listing search failed:", error);
        return failure("Unable to search listings.");
      }
    }
  );

  server.registerTool(
    "get_listing",
    {
      description: "Get public details for one active property listing.",
      inputSchema: z.object({ id: z.string().min(1) }),
    },
    async ({ id }) => {
      try {
        const listing = await getActiveListing(id);
        return text(listing ?? "Active listing not found.");
      } catch (error) {
        console.error("Listing lookup failed:", error);
        return failure("Unable to retrieve listing.");
      }
    }
  );

  return server;
}
