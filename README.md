# RetroAI

RetroAI is a retro-futuristic, AI-native reimagining of the 1989 digital pet era.
It takes the emotional loop that made Tamagotchi iconic and upgrades it with:

- real AI personality evolution
- shared multiplayer care
- persistent timeline memory
- explainable reasoning in a retro debug console
- production-grade architecture ready for deployment

Built for hackathons, demos, and real-world iteration.

## Why This Is Special

In 1989, a tiny device made people care deeply through simple loops.
In 2026, RetroAI turns that loop into a living cloud-native companion:

- one entity, many caretakers
- memories that persist across sessions
- language-first interaction instead of button-only UX
- reversible state history (snapshot + time travel)
- modern monetization and analytics stack

## Core Experience

- Nostalgia Core
	- feed, play, clean, rest, discipline loop
	- retro skin toggle with 80s mode
	- Web Audio beep synthesis

- AI Intelligence Layer
	- Groq-powered streaming responses
	- evolving persona with memory references
	- retro debug console with reasoning traces

- Real-Time Social Layer
	- shared presence and collaborative actions
	- live event feed and leaderboard updates

- Persistence + Memory
	- save snapshots and timeline replay
	- export/import-ready state payload flow
	- offline queue concept for sync continuity

- Analytics + Insights
	- heatmap/timeline dashboard foundations
	- anomaly and weekly summary scaffolding

- Monetization
	- freemium tiers + credit economy
	- Stripe checkout/webhook routes scaffolded

## Tech Stack

- Frontend: Next.js 16, React 19, TypeScript, Tailwind
- AI: Groq API (Llama 3.3 70B versatile) with streaming client abstraction
- Backend: Next.js App Router Route Handlers
- Data: Postgres (Drizzle ORM) + Redis cache/rate limiting
- Realtime: Supabase-compatible patterns and presence endpoints
- Billing: Stripe subscriptions + webhook handling
- Observability: Sentry + PostHog integration points
- Testing: Vitest + Playwright

## System Snapshot

```text
Browser
	-> Next.js App (UI + API Gateway)
			-> Domain Services
					-> Groq AI Orchestrator
					-> Postgres (canonical state)
					-> Redis (hot cache + limits)
					-> Stripe (billing)
					-> Monitoring/Analytics
```

Detailed architecture: [ARCHITECTURE.md](ARCHITECTURE.md)

## Project Structure

```text
.
|- apps/
|  |- web/                     # Next.js full-stack app
|     |- src/app/              # routes + API handlers
|     |- src/features/         # feature modules (6 required tracks)
|     |- src/lib/              # AI, DB, billing, cache, env, monitoring
|     |- src/components/       # UI and retro interaction primitives
|- packages/
|  |- ui/                      # shared UI package
|  |- types/                   # shared domain types
|- docs/
|  |- openapi.yaml             # API contract
|  |- demo-script.md           # 3-minute demo talk track
|  |- pitch-deck-outline.md    # 10-slide pitch outline
|  |- production-checklist.md  # production readiness checklist
|- ARCHITECTURE.md             # full architecture document
```

## Quick Start

### Prerequisites

- Node.js 20+
- Docker Desktop (for Postgres/Redis local services)

### 1) Install

```bash
npm install
```

### 2) Configure Environment

```bash
cp .env.example .env
```

Fill required values in .env:

- GROQ_API_KEY
- DATABASE_URL
- REDIS_URL
- NEXTAUTH_SECRET
- STRIPE_SECRET_KEY (for billing flows)

### 3) Start Local Infra

```bash
docker compose up -d
```

### 4) Run App

```bash
npm run dev
```

Open http://localhost:3000

## Scripts

- `npm run dev` -> start web app in development
- `npm run build` -> production build
- `npm run test` -> unit tests with coverage
- `npm run test:e2e` -> Playwright smoke/e2e tests
- `npm run db:generate` -> generate Drizzle artifacts
- `npm run db:migrate` -> apply DB migrations

## Deployment

Recommended deployment path:

- Web/API: Vercel
- Database + Realtime + Storage: Supabase
- Cache + Limits: Upstash Redis

Container route is also available with:

```bash
docker build -t retroai .
docker run -p 3000:3000 retroai
```

## API and Product Docs

- Architecture: [ARCHITECTURE.md](ARCHITECTURE.md)
- OpenAPI: [docs/openapi.yaml](docs/openapi.yaml)
- ADR: [docs/adr/0001-architecture.md](docs/adr/0001-architecture.md)
- Demo Script: [docs/demo-script.md](docs/demo-script.md)
- Pitch Deck Outline: [docs/pitch-deck-outline.md](docs/pitch-deck-outline.md)
- Production Checklist: [docs/production-checklist.md](docs/production-checklist.md)

## Quality and Production Notes

- Route-level validation via Zod patterns
- API error pathways and boundary handling included
- Rate-limit primitives implemented in Redis helper
- Health endpoint available at `/api/health`
- SEO baseline configured via metadata, sitemap, and robots

## Contributing

Please follow [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Add your preferred license (MIT recommended for hackathon/public showcase use).
