import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { rateLimit, resetRateLimits } from "../src/lib/rate-limit";

beforeEach(() => resetRateLimits());

test("allows requests up to the limit, then blocks", () => {
  for (let i = 0; i < 3; i++) {
    assert.equal(rateLimit("a", 3, 1000, 0).ok, true);
  }

  const blocked = rateLimit("a", 3, 1000, 10);
  assert.equal(blocked.ok, false);
  assert.ok(blocked.retryAfterSeconds >= 1);
});

test("the window resets after it expires", () => {
  rateLimit("a", 1, 1000, 0);
  assert.equal(rateLimit("a", 1, 1000, 500).ok, false);
  assert.equal(rateLimit("a", 1, 1000, 1500).ok, true);
});

test("different keys are limited independently", () => {
  rateLimit("a", 1, 1000, 0);
  assert.equal(rateLimit("b", 1, 1000, 0).ok, true);
});
