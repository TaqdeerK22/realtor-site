# Mark Realty

![CI](https://github.com/TaqdeerK22/realtor-site/actions/workflows/ci.yml/badge.svg)
![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2d3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

A modern real estate website for an independent realtor: a public listings site that captures leads, a private admin dashboard, an **AI chat assistant** that searches the live listing database, and a read-only **MCP server** so AI tools can query listings too.

**Live demo:** [markrealty.vercel.app](https://markrealty.vercel.app)

> Listings, photos and testimonials in the demo are sample content.

![Admin dashboard](docs/admin-listings.png)

## Features

**Public site**
- Homepage with featured listings and testimonials
- Listings with filters (location, price, bedrooms, bathrooms, property type) and sorting
- Property pages with photo gallery, map and mortgage calculator
- Inquiry form on every listing, saved as leads
- Newsletter signup: subscribers are emailed when a new listing is published
- Testimonials, submitted by visitors and shown after approval
- AI chat assistant on every page (see below)
- Responsive layout, sitemap and robots.txt

**Admin dashboard** (password protected)
- Create, edit, delete, suspend and reactivate listings, with Cloudinary image uploads
- Review inquiries and subscribers
- Approve or delete testimonials

## AI chat assistant

A floating chat button on every public page opens an assistant that can answer real estate questions and search the listing database ("3-bedroom houses in Langford under $900k"). Matching listings appear as cards that link to the property page.

- The model calls a `search_listings` tool; results come from the database, so it can't invent properties.
- Only public listing fields are shared with the model.
- Requests are validated, size-limited and rate limited per IP.

Two providers are supported, chosen automatically:

| Provider | When it's used | Setup |
|---|---|---|
| **Anthropic API** | `ANTHROPIC_API_KEY` is set (use this in production) | Add the key to your environment. Also set a monthly spend limit in the Anthropic console. |
| **Ollama** | No API key, and not running in production (free local development) | Install [Ollama](https://ollama.com) and run `ollama pull llama3.2:1b` |

If neither is available, the chat button still loads and politely says the assistant is unavailable.

## MCP server

A read-only [Model Context Protocol](https://modelcontextprotocol.io) server exposes two tools, `search_listings` and `get_listing`. It only returns public listing data: no inquiries, subscribers or admin actions.

- **Local (stdio):** `npm run mcp`, then add it to an MCP client such as Claude Desktop.
- **HTTP:** `POST /api/mcp`, protected by `Authorization: Bearer <MCP_API_TOKEN>`.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Server Components), React 19 |
| Language | TypeScript (strict) |
| Database | PostgreSQL with Prisma |
| Auth | Signed JWT in an HTTP-only cookie (jose) |
| AI | Anthropic API or Ollama, MCP SDK |
| Images / email | Cloudinary / Resend |
| Validation | Zod |
| Local infra | Docker Compose (Postgres + pgAdmin) |
| CI / hosting | GitHub Actions / Vercel |

## Getting started

**Prerequisites:** Node.js 20+, Docker Desktop (or OrbStack)

```bash
git clone https://github.com/TaqdeerK22/realtor-site.git
cd realtor-site
cp .env.example .env     # then edit it, see below
docker compose up -d     # local Postgres
npm install
npm run db:push          # create the tables
npm run db:seed          # sample listings and testimonials (local database only)
npm run dev
```

Open http://localhost:3000. The admin dashboard is at `/login`.

### Environment variables

Copy `.env.example` to `.env`. Required to run:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Postgres connection string (matches `docker-compose.yml` by default) |
| `ADMIN_PASSWORD` | Password for the `/login` admin dashboard |
| `AUTH_SECRET` | Random string of **32+ characters** used to sign admin sessions |

Optional features:

| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL` | AI assistant in production |
| `OLLAMA_URL`, `OLLAMA_MODEL` | AI assistant in local development |
| `MCP_API_TOKEN` | Bearer token for the `/api/mcp` endpoint |
| `RESEND_API_KEY`, `FROM_EMAIL` | New-listing emails to subscribers |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Listing image uploads |
| `NEXT_PUBLIC_SITE_URL` | SEO metadata, sitemap and shareable links |

Generate secrets with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` / `npm start` | Production build / server |
| `npm run typecheck` | TypeScript check |
| `npm test` | Run the test suite |
| `npm run db:push` / `npm run db:seed` | Create tables / load sample data |
| `npm run mcp` | Start the local MCP server |

Local database tools: pgAdmin runs at http://localhost:5050 (credentials are in `docker-compose.yml`, for local use only).

## Security

- Every admin API route requires a valid session; the dashboard pages are protected by middleware as well.
- Sessions are signed with `AUTH_SECRET` (32+ characters required), HTTP-only, and `Secure` in production.
- Login, inquiry, newsletter, testimonial and chat endpoints are rate limited. The limiter is in-memory, so for strict limits on serverless hosting swap it for a shared store such as Upstash Redis.
- All request bodies are validated with Zod. Listing images must come from allowed hosts or local paths.
- Suspended listings are hidden from the public site, the API, the chatbot and MCP.
- Secrets live in `.env`, which is git-ignored. Docker services only listen on localhost.

## Testing and CI

`npm test` covers authentication, rate limiting, validation and the chatbot's tool-calling flow (with a mocked AI provider). GitHub Actions runs schema validation, a type check, the tests and a production build against a Postgres service on every push and pull request.

## Project structure

```
src/
  app/            Routes: public pages, /dashboard, /api
  components/     UI components, including the chat widget
  lib/            Auth, validation, rate limiting, listing search, chat logic
mcp/              MCP server and tools (shared with /api/mcp)
prisma/           Schema and seed data
tests/            Unit tests
```

## Roadmap

- [ ] Inquiry email notifications to the realtor
- [ ] Replace the in-memory rate limiter with a shared store
- [ ] Single config file for branding (name, colours, logo)
- [ ] End-to-end tests

## License

MIT. See [LICENSE](LICENSE).
