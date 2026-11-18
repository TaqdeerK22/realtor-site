/**
 * Small in-memory fixed-window rate limiter.
 *
 * Good enough to stop casual abuse of public forms, the login page and the
 * chatbot. On serverless hosts (Vercel) each instance keeps its own counters,
 * so for strict limits swap this for a shared store such as Upstash Redis.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
let lastSweep = 0;

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now: number = Date.now()
): RateLimitResult {
  // Drop expired buckets now and then so the map cannot grow forever.
  if (now - lastSweep > 60_000) {
    lastSweep = now;
    for (const [bucketKey, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(bucketKey);
    }
  }

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  existing.count += 1;

  if (existing.count > limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  return {
    ok: true,
    remaining: limit - existing.count,
    retryAfterSeconds: 0,
  };
}

/** Best-effort client IP behind a proxy such as Vercel. */
export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  return req.headers.get("x-real-ip") ?? "unknown";
}

/** Convenience wrapper: returns a 429 response when the caller is over the limit. */
export function limitRequest(
  req: Request,
  scope: string,
  limit: number,
  windowMs: number
): Response | null {
  const result = rateLimit(`${scope}:${clientIp(req)}`, limit, windowMs);

  if (result.ok) return null;

  return Response.json(
    {
      success: false,
      message: "Too many requests. Please try again shortly.",
    },
    {
      status: 429,
      headers: { "Retry-After": String(result.retryAfterSeconds) },
    }
  );
}

/** Test helper. */
export function resetRateLimits() {
  buckets.clear();
  lastSweep = 0;
}
