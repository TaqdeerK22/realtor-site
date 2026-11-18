import { test } from "node:test";
import assert from "node:assert/strict";
import { getProvider, normalizeHistory, runChat } from "../src/lib/chat/run";
import type { PublicListing } from "../src/lib/listings";

const listing: PublicListing = {
  id: "abc",
  title: "Langford House",
  price: 800000,
  location: "Langford, BC",
  bedrooms: 3,
  bathrooms: 2,
  sqft: 1800,
  propertyType: "House",
  image: "/placeholders/home-1.svg",
};

function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

test("getProvider prefers Anthropic, allows Ollama in dev, disables chat in production", () => {
  assert.equal(getProvider({ ANTHROPIC_API_KEY: "k" } as never), "anthropic");
  assert.equal(getProvider({ NODE_ENV: "development" } as never), "ollama");
  assert.equal(getProvider({ NODE_ENV: "production" } as never), null);
  assert.equal(
    getProvider({ NODE_ENV: "production", OLLAMA_URL: "http://x" } as never),
    "ollama"
  );
});

test("normalizeHistory drops leading assistant turns and merges repeats", () => {
  const result = normalizeHistory([
    { role: "assistant", content: "Hello" },
    { role: "user", content: "a" },
    { role: "user", content: "b" },
    { role: "assistant", content: "  " },
    { role: "assistant", content: "c" },
  ]);

  assert.deepEqual(result, [
    { role: "user", content: "a\nb" },
    { role: "assistant", content: "c" },
  ]);
});

test("runChat refuses when no provider is configured", async () => {
  await assert.rejects(
    () =>
      runChat("hi", [], { fetchFn: fetch, search: async () => [] }, null),
    /No chat provider/
  );
});

test("Anthropic flow: tool call -> database search -> final answer with listing cards", async () => {
  process.env.ANTHROPIC_API_KEY = "test-key";

  const requests: { body: any }[] = [];
  const replies = [
    {
      stop_reason: "tool_use",
      content: [
        {
          type: "tool_use",
          id: "tool_1",
          name: "search_listings",
          input: { location: "Langford", maxPrice: 900000 },
        },
      ],
    },
    {
      stop_reason: "end_turn",
      content: [{ type: "text", text: "I found one house in Langford." }],
    },
  ];

  const fetchFn = (async (_url: string, init: RequestInit) => {
    requests.push({ body: JSON.parse(String(init.body)) });
    return jsonResponse(replies[requests.length - 1]);
  }) as unknown as typeof fetch;

  let searchedWith: unknown;

  const result = await runChat(
    "Show me homes in Langford under 900k",
    [],
    {
      fetchFn,
      search: async (args) => {
        searchedWith = args;
        return [listing];
      },
    },
    "anthropic"
  );

  assert.deepEqual(searchedWith, { location: "Langford", maxPrice: 900000 });
  assert.equal(result.reply, "I found one house in Langford.");
  assert.deepEqual(result.listings, [listing]);

  // The second request must carry the tool result back to the model,
  // without leaking image URLs into the prompt.
  const second = requests[1].body.messages;
  const toolResult = second[second.length - 1].content[0];
  assert.equal(toolResult.type, "tool_result");
  assert.equal(toolResult.tool_use_id, "tool_1");
  assert.ok(!toolResult.content.includes("placeholders"));
});

test("Ollama flow without a tool call returns the model's text", async () => {
  const fetchFn = (async () =>
    jsonResponse({ message: { content: "Happy to help!" } })) as unknown as typeof fetch;

  const result = await runChat(
    "hello",
    [],
    { fetchFn, search: async () => [] },
    "ollama"
  );

  assert.equal(result.reply, "Happy to help!");
});
