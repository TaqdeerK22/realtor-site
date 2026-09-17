# Lovepreet Realty

A full-stack real estate website for a single realtor, built with Next.js (App Router), PostgreSQL, and Prisma. It gives a realtor a public-facing site for listings and leads, plus a private admin dashboard to manage everything without touching code.

**Live demo:** [realtor-site-peach.vercel.app](https://realtor-site-peach.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

<!--
  Add 2-3 screenshots or a short GIF here once the site is running, e.g.:
  ![Homepage](./docs/screenshot-home.png)
  ![Admin dashboard](./docs/screenshot-dashboard.png)
-->

## Features

**Public site**
- Homepage with featured listings and testimonials
- Full listings page with property details
- Inquiry form on every listing (captured as leads)
- Email newsletter signup
- Client testimonials
- Mortgage calculator and map on each listing page

**Admin dashboard** (JWT-protected)
- Add, edit, and delete listings, with Cloudinary image uploads
- Activate/suspend listings without deleting them
- View and manage inquiries
- Manage newsletter subscribers
- Approve testimonials before they go public

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Server Components) |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | JWT sessions (`jose`), HTTP-only cookies |
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

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Postgres connection string (matches `docker-compose.yml` by default) |
| `ADMIN_PASSWORD` | Password for the `/login` admin dashboard |
| `AUTH_SECRET` | Random secret used to sign admin session JWTs |
| `RESEND_API_KEY` / `FROM_EMAIL` | Used to send inquiry/subscriber email notifications |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` / `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Used for listing image uploads in the dashboard |
| `NEXT_PUBLIC_SITE_URL` | Used for SEO metadata and shareable listing links |

### Database admin (pgAdmin)

Docker Compose also starts pgAdmin for inspecting the local database directly.

Open [http://localhost:5050](http://localhost:5050) — login with the email/password you set for `PGADMIN_DEFAULT_EMAIL` / `PGADMIN_DEFAULT_PASSWORD` in `docker-compose.yml`.

## Project structure

```
src/
  app/            Routes (App Router) — public pages, /dashboard, /api
  components/     Shared UI components
  lib/            Prisma client, auth helpers
prisma/
  schema.prisma   Database models: Listing, Inquiry, Subscriber, Testimonial
```

## License

MIT — see [LICENSE](./LICENSE).
