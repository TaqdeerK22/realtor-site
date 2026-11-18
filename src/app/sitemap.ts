import type { MetadataRoute } from "next";
import { prisma } from "../lib/prisma";

// Built from the database on request, so new listings appear automatically.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const pages = ["", "/listings", "/about", "/testimonials", "/contact"].map(
    (path) => ({ url: `${base}${path}` })
  );

  const listings = await prisma.listing
    .findMany({
      where: { status: "active" },
      select: { id: true, createdAt: true },
    })
    .catch(() => []);

  return [
    ...pages,
    ...listings.map((listing) => ({
      url: `${base}/listings/${listing.id}`,
      lastModified: listing.createdAt,
    })),
  ];
}
