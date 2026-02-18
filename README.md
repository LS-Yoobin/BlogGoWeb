# BlogGo

A production-ready blogging platform built with React, Vite, Tailwind CSS, and Express.

## Features

- **Modern Design**: Premium look with soft shadows, rounded corners, and subtle gradients.
- **Responsive**: Mobile-first approach using Tailwind CSS.
- **Blog Engine**:
  - Full markdown support (mock data)
  - Image galleries with lightbox
  - Author profiles
- **Mock Editor**: Local-state based editor for demonstration.
- **Pages**:
  - Home
  - Features
  - Pricing
  - Support
  - Legal (Privacy, Terms)

## Tech Stack

- **Frontend**: React, Vite, Wouter (Routing), Tailwind CSS, Framer Motion
- **Backend**: Express, Drizzle ORM, PostgreSQL
- **Language**: TypeScript

## getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Database Setup**:
   The project uses a PostgreSQL database. Ensure `DATABASE_URL` is set in your environment.
   
   Push the schema to the database:
   ```bash
   npm run db:push
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The server will start on port 5000.

## Project Structure

- `client/`: Frontend React application
  - `src/components/ui/`: Reusable UI components (Button, Card, Input, etc.)
  - `src/pages/`: Application pages
  - `src/hooks/`: Custom hooks (data fetching, etc.)
- `server/`: Backend Express application
  - `routes.ts`: API endpoints
  - `storage.ts`: Database access layer
- `shared/`: Shared types and schema
  - `schema.ts`: Database schema
  - `routes.ts`: API contract

## Editing Content

- **Copy/Text**: Most text content is in the page components in `client/src/pages/`.
- **Pricing**: Pricing plans are defined in `client/src/pages/pricing.tsx`.
- **Support Email**: Defined in `client/src/pages/support.tsx`.
- **Mock Data**: Initial blog posts are seeded in `server/routes.ts`. To modify them, edit the `seedDatabase` function and restart the server (or clear the DB).

## Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the frontend for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint
- `npm run db:push`: Push schema changes to the database
