import { z } from "zod";

// Hosts that next.config.ts allows for next/image.
// A listing image on any other host would crash the page that renders it.
const ALLOWED_IMAGE_HOSTS = ["res.cloudinary.com", "images.unsplash.com"];

const imageSource = z
  .string()
  .trim()
  .max(2048)
  .refine((value) => {
    if (value.startsWith("/") && !value.startsWith("//")) return true;

    try {
      const url = new URL(value);
      return (
        url.protocol === "https:" && ALLOWED_IMAGE_HOSTS.includes(url.hostname)
      );
    } catch {
      return false;
    }
  }, "Image must be a Cloudinary/Unsplash HTTPS URL or a local /path.");

export const PROPERTY_TYPES = ["House", "Condo", "Townhouse", "Land"] as const;
export const LISTING_STATUSES = ["active", "suspended"] as const;

export const listingSchema = z.object({
  title: z.string().trim().min(3).max(120),
  price: z.coerce.number().int().min(1).max(1_000_000_000),
  location: z.string().trim().min(2).max(120),
  propertyType: z.enum(PROPERTY_TYPES).default("House"),
  image: imageSource,
  images: z.array(imageSource).max(20).optional(),
  bedrooms: z.coerce.number().int().min(0).max(50),
  bathrooms: z.coerce.number().int().min(0).max(50),
  sqft: z.coerce.number().int().min(0).max(1_000_000),
  description: z.string().trim().min(1).max(5000),
});

export type ListingInput = z.infer<typeof listingSchema>;

export const listingStatusSchema = z.object({
  status: z.enum(LISTING_STATUSES),
});

export const testimonialSchema = z.object({
  name: z.string().trim().min(2).max(80),
  message: z.string().trim().min(10).max(1000),
});

/** Parse a request body as JSON, returning null when it is malformed. */
export async function readJson(req: Request): Promise<unknown | null> {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

/** Standard 400 response for failed validation. */
export function invalid(error?: z.ZodError): Response {
  return Response.json(
    {
      success: false,
      message: "Invalid request.",
      issues: error?.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    },
    { status: 400 }
  );
}
