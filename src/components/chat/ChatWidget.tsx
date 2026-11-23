"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";

type Listing = {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: string;
  image: string;
};

type Message = {
  role: "user" | "assistant";
  content: string;
  listings?: Listing[];
};

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hi, I'm the Mark Realty assistant. Ask me about homes for sale, neighbourhoods, or the buying and selling process.",
};

const SUGGESTIONS = [
  "Homes under $900,000",
  "3-bedroom houses in Langford",
  "How does buying a home work?",
];

// The assistant is for visitors, so keep it out of the admin area.
const HIDDEN_PREFIXES = ["/dashboard", "/login"];

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (HIDDEN_PREFIXES.some((prefix) => pathname?.startsWith(prefix))) {
    return null;
  }

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    // The welcome message is UI only, so it is not sent to the model.
    const history = messages
      .slice(1)
      .slice(-10)
      .map(({ role, content }) => ({ role, content }));

    setMessages((previous) => [...previous, { role: "user", content: question }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, history }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || typeof data.reply !== "string") {
        throw new Error(
          typeof data.error === "string" ? data.error : "Request failed"
        );
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.reply,
          listings: Array.isArray(data.listings) ? data.listings : undefined,
        },
      ]);
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            error instanceof Error && error.message !== "Request failed"
              ? error.message
              : "Sorry, I couldn't answer that just now. Please try again, or use the Contact page to reach the realtor.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function startNewChat() {
    if (loading) return;
    setMessages([WELCOME]);
    setInput("");
    inputRef.current?.focus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(input);
  }

  return (
    <div className="chat-root">
      {open && (
        <section className="chat-panel" aria-label="Mark Realty assistant">
          <header className="chat-header">
            <div>
              <strong>Mark Realty Assistant</strong>
              <span>AI-powered · may make mistakes</span>
            </div>
            <div className="chat-actions">
              {messages.length > 1 && (
                <button
                  type="button"
                  className="chat-new"
                  onClick={startNewChat}
                  disabled={loading}
                >
                  New chat
                </button>
              )}
              <button
              type="button"
              className="chat-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
            </div>
          </header>

          <div className="chat-messages" role="log" aria-live="polite">
            {messages.map((message, index) => (
              <div key={index} className={`chat-row chat-row-${message.role}`}>
                <div className={`chat-bubble chat-bubble-${message.role}`}>
                  {message.content}
                </div>

                {message.listings && message.listings.length > 0 && (
                  <ul className="chat-listings">
                    {message.listings.map((listing) => (
                      <li key={listing.id}>
                        <Link
                          href={`/listings/${listing.id}`}
                          className="chat-listing"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={listing.image}
                            alt=""
                            width={64}
                            height={64}
                            loading="lazy"
                          />
                          <span>
                            <strong>{listing.title}</strong>
                            <em>${listing.price.toLocaleString("en-CA")}</em>
                            <small>
                              {listing.location} · {listing.bedrooms} bd ·{" "}
                              {listing.bathrooms} ba
                            </small>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {loading && (
              <div className="chat-row chat-row-assistant">
                <div className="chat-bubble chat-bubble-assistant chat-typing">
                  <span />
                  <span />
                  <span />
                  <span className="sr-only">Assistant is typing</span>
                </div>
              </div>
            )}

            {messages.length === 1 && !loading && (
              <div className="chat-suggestions">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void send(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <div ref={endRef} />
          </div>

          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about homes, areas, or buying…"
              maxLength={1000}
              aria-label="Your message"
            />
            <button type="submit" disabled={loading || !input.trim()}>
              Send
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="chat-launcher"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Chat with our assistant"}
      >
        {open ? "×" : "Chat"}
      </button>
    </div>
  );
}
