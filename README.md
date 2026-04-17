# Retro AI Companion

A production-ready reimagining of Tamagotchi as a collaborative AI-native life companion.

## Stack
- Next.js 16 + TypeScript + Tailwind + shadcn-style components
- Drizzle ORM + Postgres
- Supabase Realtime + Storage
- Groq streaming inference (Llama 3.3 70B)
- Redis caching and rate limits
- Stripe subscriptions + credit economy
- PostHog + Sentry

## Quick Start
1. Copy `.env.example` to `.env`.
2. Start infra: `docker compose up -d`.
3. Install deps: `npm install`.
4. Start app: `npm run dev`.

## Repository Layout
- apps/web: full-stack web app
- packages/ui: shared UI primitives
- packages/types: shared domain types
- docs: architecture, API, demo, pitch, ADRs

## Delivered Competition Assets
- Architecture doc and API contract: `ARCHITECTURE.md`, `docs/openapi.yaml`
- Demo script and pitch deck: `docs/demo-script.md`, `docs/pitch-deck-outline.md`
- Production checklist: `docs/production-checklist.md`
# RetroAI
