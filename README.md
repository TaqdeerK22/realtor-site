# RealtorSite

A single-realtor real estate website built with Next.js, PostgreSQL, Prisma, and Docker.

## Features

- Homepage
- Listings page
- Listing details page
- Contact/inquiry forms
- Admin dashboard
- Add/edit/delete listings
- Suspend/activate listings
- View inquiries
- Subscribers
- Saved listings
- Recently viewed listings

## Run locally

Start Docker or OrbStack first.

Then run:

docker compose up -d
npm install
npx prisma generate
npx prisma db push
npm run dev

Open:

http://localhost:3000

## pgAdmin

Open:

http://localhost:5050

Login:

Email: admin@realtor.com
Password: admin123
