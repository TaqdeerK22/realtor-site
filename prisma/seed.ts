
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Protect against accidentally seeding a hosted database.
  const url = new URL(process.env.DATABASE_URL ?? "");

  if (!["localhost", "127.0.0.1"].includes(url.hostname)) {
    throw new Error("Seeding is allowed only for the local database.");
  }

  // Demo listing - not an actual property for sale.
  const listing = await prisma.listing.upsert({
    where: { id: "demo-mark-realty-001" },

    update: {},

    create: {
      id: "demo-mark-realty-001",
      title: "Demo Family Home in Langford",
      price: 899000,
      location: "Langford, BC",
      image: "/placeholder-property.jpg",
      images: [],
      bedrooms: 3,
      bathrooms: 3,
      sqft: 1850,
      description:
        "Sample property for testing the Mark Realty website and MCP tools. Not a real listing.",
      propertyType: "House",
      status: "active",
    },
  });

  console.log("Demo listing created or already exists:", listing.id);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
