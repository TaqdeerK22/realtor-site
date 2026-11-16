
import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { PrismaClient } from "@prisma/client";
import * as z from "zod/v4";
import dotenv from "dotenv";

// Load local environment variables.
// Use a local/test database with public listing data.
dotenv.config({ path: ".env.local", quiet: true });
dotenv.config({ path: ".env", quiet: true });

// One Prisma Client reused by all tools.
const prisma = new PrismaClient();

// Create a fresh MCP server for each connection.
function createServer() {
  const server = new McpServer({
    name: "mark-realty-mcp",
    version: "1.0.0",
  });

  // TOOL 1: Search active properties
  server.registerTool(
    "search_listings",
    {
      description:
        "Search active real estate listings by location, price, bedrooms, and property type.",
      inputSchema: z.object({
        location: z.string().optional(),
        maxPrice: z.number().nonnegative().optional(),
        minBedrooms: z.number().int().nonnegative().optional(),
        propertyType: z.string().optional(),
      }),
    },
    async ({
      location,
      maxPrice,
      minBedrooms,
      propertyType,
    }) => {
      try {
        const listings = await prisma.listing.findMany({
          where: {
            status: "active",

            ...(location && {
              location: {
                contains: location,
                mode: "insensitive" as const,
              },
            }),

            ...(maxPrice !== undefined && {
              price: { lte: maxPrice },
            }),

            ...(minBedrooms !== undefined && {
              bedrooms: { gte: minBedrooms },
            }),

            ...(propertyType && {
              propertyType: {
                equals: propertyType,
                mode: "insensitive" as const,
              },
            }),
          },

          // Only expose public listing fields
          select: {
            id: true,
            title: true,
            price: true,
            location: true,
            bedrooms: true,
            bathrooms: true,
            sqft: true,
            propertyType: true,
          },

          orderBy: { createdAt: "desc" },
          take: 10,
        });

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(listings, null, 2),
            },
          ],
        };
      } catch (error) {
        console.error("Listing search failed:", error);

        return {
          isError: true,
          content: [
            {
              type: "text" as const,
              text: "Unable to search listings.",
            },
          ],
        };
      }
    }
  );

  // TOOL 2: Retrieve one active property
  server.registerTool(
    "get_listing",
    {
      description:
        "Get public details for one active property listing.",
      inputSchema: z.object({
        id: z.string().min(1),
      }),
    },
    async ({ id }) => {
      try {
        const listing = await prisma.listing.findFirst({
          where: {
            id,
            status: "active",
          },

          select: {
            id: true,
            title: true,
            price: true,
            location: true,
            bedrooms: true,
            bathrooms: true,
            sqft: true,
            description: true,
            propertyType: true,
            image: true,
            images: true,
          },
        });

        return {
          content: [
            {
              type: "text" as const,
              text: listing
                ? JSON.stringify(listing, null, 2)
                : "Active listing not found.",
            },
          ],
        };
      } catch (error) {
        console.error("Listing lookup failed:", error);

        return {
          isError: true,
          content: [
            {
              type: "text" as const,
              text: "Unable to retrieve listing.",
            },
          ],
        };
      }
    }
  );

  return server;
}

// Communicate with MCP clients over stdio.
serveStdio(createServer);
