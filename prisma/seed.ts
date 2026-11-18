import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Sample content for demos and local development. None of these are real homes.
const listings = [
  {
    id: "demo-mark-realty-001",
    title: "Modern Family Home in Langford",
    price: 899000,
    location: "Langford, BC",
    propertyType: "House",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2150,
    description:
      "Bright open-concept family home close to schools and trails. Sample listing for demonstration only.",
  },
  {
    id: "demo-mark-realty-002",
    title: "Waterfront Condo near Downtown Victoria",
    price: 649000,
    location: "Victoria, BC",
    propertyType: "Condo",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1050,
    description:
      "Two-bedroom condo with harbour views and walkable access to the Inner Harbour. Sample listing for demonstration only.",
  },
  {
    id: "demo-mark-realty-003",
    title: "Updated Townhouse in Saanich",
    price: 779000,
    location: "Saanich, BC",
    propertyType: "Townhouse",
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1580,
    description:
      "Low-maintenance townhouse with a private yard, near transit and shopping. Sample listing for demonstration only.",
  },
  {
    id: "demo-mark-realty-004",
    title: "Mountain-View Home at Bear Mountain",
    price: 1295000,
    location: "Langford, BC",
    propertyType: "House",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3200,
    description:
      "Spacious executive home with mountain views and a double garage. Sample listing for demonstration only.",
  },
  {
    id: "demo-mark-realty-005",
    title: "Starter Condo in Colwood",
    price: 459000,
    location: "Colwood, BC",
    propertyType: "Condo",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 690,
    description:
      "Affordable one-bedroom condo with in-suite laundry and secure parking. Sample listing for demonstration only.",
  },
  {
    id: "demo-mark-realty-006",
    title: "Build-Ready Lot in Sooke",
    price: 389000,
    location: "Sooke, BC",
    propertyType: "Land",
    bedrooms: 0,
    bathrooms: 0,
    sqft: 8700,
    description:
      "Level, cleared lot with services at the lot line. Sample listing for demonstration only.",
  },
];

const testimonials = [
  {
    id: "demo-testimonial-001",
    name: "Sample Client",
    message:
      "Clear communication from the first call to the final signature. We felt supported at every step.",
  },
  {
    id: "demo-testimonial-002",
    name: "Sample Buyer",
    message:
      "The site made it easy to browse and ask questions, and we heard back the same day.",
  },
];

async function main() {
  // Protect against accidentally seeding a hosted/production database.
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set. Copy .env.example to .env first.");
  }

  const { hostname } = new URL(databaseUrl);

  if (!["localhost", "127.0.0.1"].includes(hostname)) {
    throw new Error("Seeding is allowed only for a local database.");
  }

  for (const [index, listing] of listings.entries()) {
    const image = `/placeholders/home-${index + 1}.svg`;

    await prisma.listing.upsert({
      where: { id: listing.id },
      update: {},
      create: { ...listing, image, images: [image], status: "active" },
    });
  }

  for (const testimonial of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: testimonial.id },
      update: {},
      create: { ...testimonial, approved: true },
    });
  }

  console.log(
    `Seeded ${listings.length} sample listings and ${testimonials.length} testimonials.`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
