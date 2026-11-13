# Realtor Site

A modern, mobile-friendly website template for independent real estate agents, built as a live demo of what a realtor's online presence can look like: clean design, easy for clients to use, and simple for the agent to manage. It includes a public listings site that captures leads and a private admin dashboard for managing everything without touching code.

**Live demo:** [realty.vercel.app](https://lovepreetrealty.vercel.app)

> Listings, photos and testimonials in the demo are sample content.

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js)
![React](https://img.shields.io/badge/React-20232a?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2d3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## Why I built this

Many independent realtors rely on outdated templates or a single brokerage page they can't customize. I built this demo to show what a better option could look like: a fast, stylish site that works well on a phone, makes it easy for buyers to browse and ask questions, and gives the agent an admin dashboard for listings, leads and testimonials. It's also a full-stack portfolio project covering authentication, a relational database, image uploads, email and deployment.

## Features

**Public site**
- Homepage with featured listings and testimonials
- Listings page with search and filters (location, price, bedrooms, bathrooms, property type) and sorting
- Property detail pages with a mortgage calculator and map
- Inquiry form on every listing, captured as leads
- Email newsletter signup for new-listing alerts
- Client testimonials
- Responsive layout for mobile

**Admin dashboard (JWT-protected)**
- Add, edit and delete listings, with Cloudinary image uploads
- Activate or suspend listings without deleting them
- View and manage inquiries
- Manage newsletter subscribers
- Approve testimonials before they go public

## Screenshots

### Browsing listings

| Search and filters | Listing details |
|---|---|
| ![Listings page](docs/listings.png) | ![Listing details](docs/listing-details.png) |

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Server Components) |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | JWT sessions (jose), HTTP-only cookies |
| Images | Cloudinary |
| Email | Resend |
| Local infra | Docker Compose (Postgres + pgAdmin) |
| Hosting | Vercel |

## Getting started

**Prerequisites:** Node.js 20+, Docker Desktop (or OrbStack)

```bash
git clone https://github.com/TaqdeerK22/realtor-site.git
cd realtor-site
cp .env.example .env   # then fill in the values, see below
docker compose up -d
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Open http://localhost:3000.

### Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Postgres connection string (matches `docker-compose.yml` by default) |
| `ADMIN_PASSWORD` | Password for the `/login` admin dashboard |
| `AUTH_SECRET` | Random secret used to sign admin session JWTs |
| `RESEND_API_KEY` / `FROM_EMAIL` | Used to send inquiry and subscriber email notifications |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` / `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Used for listing image uploads in the dashboard |
| `NEXT_PUBLIC_SITE_URL` | Used for SEO metadata and shareable listing links |

### Database admin (pgAdmin)

Docker Compose also starts pgAdmin for inspecting the local database. Open http://localhost:5050 and log in with the `PGADMIN_DEFAULT_EMAIL` and `PGADMIN_DEFAULT_PASSWORD` values in `docker-compose.yml`. These are for local development only.

## Project structure

```
src/
  app/            Routes (App Router): public pages, /dashboard, /api
  components/     Shared UI components
  lib/            Prisma client, auth helpers
prisma/
  schema.prisma   Database models: Listing, Inquiry, Subscriber, Testimonial
```

## Roadmap

- [ ] Automated tests and a CI workflow
- [ ] Easy branding: swap name, colors and logo from a single config file
- [ ] Rate limiting on public forms

## License

MIT. See [LICENSE](LICENSE).
