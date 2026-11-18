import type { PublicListing } from "../listings";

export type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

export type ChatResult = {
  reply: string;
  listings?: PublicListing[];
};

export type ChatDeps = {
  fetchFn: typeof fetch;
  search: (args: unknown) => Promise<PublicListing[]>;
};

export class ChatUnavailableError extends Error {}
