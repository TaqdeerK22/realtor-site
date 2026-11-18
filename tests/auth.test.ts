import { test } from "node:test";
import assert from "node:assert/strict";
import {
  createAdminToken,
  isAdminRequest,
  requireAdmin,
  verifyAdminToken,
} from "../src/lib/auth";

process.env.AUTH_SECRET = "test-secret-that-is-definitely-long-enough-123";

test("a freshly created admin token verifies", async () => {
  const token = await createAdminToken();
  assert.equal(await verifyAdminToken(token), true);
});

test("a tampered token is rejected", async () => {
  const token = await createAdminToken();
  assert.equal(await verifyAdminToken(`${token}x`), false);
  assert.equal(await verifyAdminToken("not-a-token"), false);
});

test("requests with a valid admin cookie are recognised", async () => {
  const token = await createAdminToken();
  const req = new Request("http://localhost/api/x", {
    headers: { cookie: `theme=dark; admin_session=${token}` },
  });
  assert.equal(await isAdminRequest(req), true);
  assert.equal(await requireAdmin(req), null);
});

test("requireAdmin answers 401 without a session", async () => {
  const denied = await requireAdmin(new Request("http://localhost/api/x"));
  assert.equal(denied?.status, 401);
});

test("a short AUTH_SECRET is refused", async () => {
  const original = process.env.AUTH_SECRET;
  process.env.AUTH_SECRET = "too-short";
  await assert.rejects(() => createAdminToken(), /AUTH_SECRET/);
  process.env.AUTH_SECRET = original;
});
