# QuantDeck - Financial Analytics Dashboard

A performant client-side dashboard that displays quantitative stock insights, rankings, and financial metrics. Built with Next.js, TypeScript, and React Query.  
**Deployed at:** https://quant-deck.vercel.app/

## Features

- **Financial Cards**: Quant ranking, ratings summary, and factor grades
- **Premium Tiers**: Dynamic content based on the user's subscription level
- **Responsive Layout**: Optimized for both desktop and mobile
- **Type-Safe**: Fully written in TypeScript
- **Test Coverage**: ~90%+ coverage across 30+ unit tests

## Tech Stack

- **Next.js 15** (App Router) + **TypeScript**
- **React Query** for client-side data fetching and caching
- **SCSS Modules** for styling
- **Jest + React Testing Library** for unit testing

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Available Commands

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run start         # Start production server
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
```

## Project Structure

```
app/                    # Next.js App Router pages
components/ui/          # Reusable UI components
   ├── FinancialCards/  # Main cards (Quant, Ratings, Factors)
   ├── Card/            # Base card component
   ├── Skeleton/        # Loading states
   └── Table/           # Table utilities
providers/              # React Query provider utilities
server/                 # API data fetching (client-queries.ts)
lib/                    # Utilities and configuration
types/                  # TypeScript type definitions
styles/                 # Global styles
__tests__/              # Unit tests
__mocks__/              # Jest environment mocks
```

## API Integration

**Base URL**: `seekingalpha.free.beeceptor.com`

**Endpoints**:

- `/user` - User status (premium/free)
- `/ratings-summary` - SA Analysts, Wall Street, Quant ratings
- `/factor-grades/now` - Current grades
- `/factor-grades/3m` - 3-month historical
- `/factor-grades/6m` - 6-month historical
- `/quant-ranking` - Sector/industry rankings
