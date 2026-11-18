import { test } from "node:test";
import assert from "node:assert/strict";
import {
  listingSchema,
  listingStatusSchema,
  testimonialSchema,
} from "../src/lib/validation";

const validListing = {
  title: "Nice home",
  price: "899000",
  location: "Langford, BC",
  propertyType: "House",
  image: "https://res.cloudinary.com/demo/image/upload/home.jpg",
  bedrooms: "3",
  bathrooms: "2",
  sqft: "1800",
  description: "A lovely place.",
};

test("accepts a valid listing and converts form strings to numbers", () => {
  const parsed = listingSchema.parse(validListing);
  assert.equal(parsed.price, 899000);
  assert.equal(parsed.bedrooms, 3);
});

test("accepts local placeholder images", () => {
  const parsed = listingSchema.safeParse({
    ...validListing,
    image: "/placeholders/home-1.svg",
  });
  assert.equal(parsed.success, true);
});

test("rejects image hosts that next/image does not allow", () => {
  const parsed = listingSchema.safeParse({
    ...validListing,
    image: "https://evil.example.com/x.jpg",
  });
  assert.equal(parsed.success, false);
});

test("rejects bad numbers", () => {
  assert.equal(
    listingSchema.safeParse({ ...validListing, price: "-5" }).success,
    false
  );
  assert.equal(
    listingSchema.safeParse({ ...validListing, bedrooms: "abc" }).success,
    false
  );
});

test("status must be active or suspended", () => {
  assert.equal(listingStatusSchema.safeParse({ status: "active" }).success, true);
  assert.equal(listingStatusSchema.safeParse({ status: "deleted" }).success, false);
});

test("testimonials need a name and a real message", () => {
  assert.equal(
    testimonialSchema.safeParse({ name: "Sam", message: "Great service, thank you!" }).success,
    true
  );
  assert.equal(testimonialSchema.safeParse({ name: "S", message: "hi" }).success, false);
});
