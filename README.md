# State Voter Registration Search Tool

A searchable, sortable table of state voter registration deadlines built with Next.js, Kysely, Panda CSS, and PostgreSQL.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Panda CSS
- **Backend**: Next.js API routes, Kysely (query builder), Zod (validation)
- **Database**: PostgreSQL
- **Testing**: Vitest

## Features

- Searchable by state name (case-insensitive, partial match)
- Sortable by clicking column headers (State, Deadline In Person, By Mail, Online)
- Expandable rows showing description and election day registration details
- Responsive: table on desktop, card layout on mobile
- API input validation with Zod, proper error handling (400/500)
- Loading and error boundary UI states

## Prerequisites

- Node.js 18+
- Docker (for PostgreSQL) or a local PostgreSQL instance

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/acire/swingleft-takehome.git
cd swingleft-takehome
npm install
```

This will also run `panda codegen` automatically (via the `prepare` script) to generate the Panda CSS style utilities.

### 2. Start PostgreSQL

Using Docker (recommended):

```bash
docker compose up -d
```

Or use an existing PostgreSQL instance and update the `.env` file accordingly.

### 3. Set up environment

```bash
cp .env.example .env
```

The defaults work with the Docker Compose setup. If using a different PostgreSQL instance, edit `.env` accordingly.

### 4. Create the database and seed data

```bash
npm run db:create-db
```

This creates the database, table, and imports data from `voter_registration_deadlines.csv`.

### 5. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Running Tests

Tests run against the real database, so make sure PostgreSQL is running and seeded first.

```bash
npm test
```

Tests cover:
- Fetching all deadlines
- Filtering by state (exact and partial match, case-insensitive)
- Sorting by column (ascending and descending)
- Validation errors for invalid parameters (400)
- Database failure handling (500)

## Project Structure

```
src/
  app/
    page.tsx              # Server component, fetches data
    layout.tsx            # Root layout with fonts
    loading.tsx           # Loading state
    error.tsx             # Error boundary
    api/deadlines/
      route.ts            # GET endpoint with Zod validation
      route.test.ts       # Integration + unit tests
    components/
      DeadlinesTable/
        index.tsx          # Main client component (state, filtering, sorting)
        Table.tsx          # Desktop table with expandable rows
        Card.tsx           # Mobile card layout
        shared.tsx         # Shared components and utilities
  db/
    client.ts             # Kysely database client
    deadlines.ts          # Query functions + schema
    types.ts              # Generated types (kysely-codegen)
scripts/
  create-db.js            # Database creation + CSV import
  drop-db.js              # Database teardown
```

## Teardown

```bash
npm run db:drop-db        # drop the database
docker compose down       # stop PostgreSQL
docker compose down -v    # stop PostgreSQL and delete data
```

## AI Usage

I used Cursor (w/ Claude) as a coding assistant throughout this project:

- **Learning**: Asked questions about Panda CSS syntax, Next.js App Router conventions (server vs client components, route handlers), and Kysely's query builder patterns to ensure I was following idiomatic patterns for each library.
- **Code review**: Had the AI review my API endpoint and tests against the requirements, which caught issues like missing input validation, unused imports, and fragile test assertions.
- **Debugging**: Worked through issues like URLSearchParams not being a plain object (Zod parsing), Kysely's immutable query builder, and Panda CSS grid syntax.
- **Implementation assistance**: Used AI to help build the responsive table/card layout, expandable rows, error/loading boundaries, and the Docker setup.
- **Decision-making**: Discussed UX trade-offs (sorting on mobile, table vs cards, expandable rows vs tooltips) where I made the final design choices.

All code was reviewed and understood before committing. Full Cursor chat transcript available on request.
