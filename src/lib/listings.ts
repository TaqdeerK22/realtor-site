import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

/** Public fields only: safe to show visitors, the chatbot and MCP clients. */
export const publicListingSelect = {
  id: true,
  title: true,
  price: true,
  location: true,
  bedrooms: true,
  bathrooms: true,
  sqft: true,
  propertyType: true,
  image: true,
} satisfies Prisma.ListingSelect;

export type PublicListing = Prisma.ListingGetPayload<{
  select: typeof publicListingSelect;
}>;

// Lenient on purpose: language models sometimes send numbers as strings.
export const searchFiltersSchema = z.object({
  location: z
    .string()
    .trim()
    .max(100)
    .optional()
    .transform((value) => value || undefined),
  maxPrice: z.coerce.number().finite().nonnegative().optional(),
  minBedrooms: z.coerce.number().int().nonnegative().optional(),
  propertyType: z
    .string()
    .trim()
    .max(40)
    .optional()
    .transform((value) => value || undefined),
});

export type SearchFilters = {
  location?: string;
  maxPrice?: number;
  minBedrooms?: number;
  propertyType?: string;
};

/** Search active listings. Shared by the chatbot and the MCP server. */
export async function searchListings(
  filters: SearchFilters,
  limit = 6
): Promise<PublicListing[]> {
  const { location, maxPrice, minBedrooms, propertyType } = filters;

  return prisma.listing.findMany({
    where: {
      status: "active",
      ...(location && {
        location: { contains: location, mode: "insensitive" as const },
      }),
      ...(maxPrice !== undefined && { price: { lte: maxPrice } }),
      ...(minBedrooms !== undefined && { bedrooms: { gte: minBedrooms } }),
      ...(propertyType && {
        propertyType: { equals: propertyType, mode: "insensitive" as const },
      }),
    },
    select: publicListingSelect,
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

/** One active listing with its full public details (null if missing/suspended). */
export async function getActiveListing(id: string) {
  return prisma.listing.findFirst({
    where: { id, status: "active" },
    select: {
      ...publicListingSelect,
      description: true,
      images: true,
    },
  });
}
