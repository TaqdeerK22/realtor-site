import { z } from "zod";
import { limitRequest } from "../../../lib/rate-limit";
import { readJson } from "../../../lib/validation";
import { runChat } from "../../../lib/chat/run";
import { ChatUnavailableError } from "../../../lib/chat/types";
import {
  searchFiltersSchema,
  searchListings,
} from "../../../lib/listings";

export const runtime = "nodejs";
export const maxDuration = 30;

const requestSchema = z.object({
  message: z.string().trim().min(1).max(1000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(2000),
      })
    )
    .max(10)
    .default([]),
});

export async function POST(req: Request) {
  // 20 messages per 10 minutes per IP keeps the AI bill predictable.
  const limited = limitRequest(req, "chat", 20, 10 * 60 * 1000);
  if (limited) {
    return Response.json(
      { error: "You're sending messages quickly. Please wait a moment." },
      { status: 429, headers: limited.headers }
    );
  }

  const parsed = requestSchema.safeParse(await readJson(req));

  if (!parsed.success) {
    return Response.json({ error: "Invalid chat message." }, { status: 400 });
  }

  try {
    const result = await runChat(parsed.data.message, parsed.data.history, {
      fetchFn: fetch,
      search: async (args) => searchListings(searchFiltersSchema.parse(args)),
    });

    return Response.json(result);
  } catch (error) {
    if (error instanceof ChatUnavailableError) {
      return Response.json(
        { error: "The assistant isn't available right now." },
        { status: 503 }
      );
    }

    console.error("Chat error:", error);

    return Response.json(
      { error: "The assistant could not complete this request." },
      { status: 502 }
    );
  }
}
