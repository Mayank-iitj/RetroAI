# Retro AI Companion Architecture Document

## Concept Chosen
- Classic concept: Tamagotchi
- Original era: 1989 handheld digital pet that required frequent feeding, cleaning, and play.
- Why iconic: Emotional attachment, instant feedback loop, consequence of neglect, simplicity.
- Legacy limitations: No true intelligence, weak persistence, no social graph, no cloud sync, low-fidelity UI.

## Core Modernization Thesis
Retro AI Companion is a shared, persistent AI lifeform that evolves through natural conversation and community care, while preserving the nostalgic loop of feed-play-rest-discipline. It serves nostalgia-driven users, streamers, and online communities who want emotionally resonant interactive companions. It is 10x better through adaptive AI personality, multiplayer collaboration, cross-device sync, analytics, and monetized pro intelligence.

## Tech Stack (with rationale)
- Frontend: Next.js 15 + TypeScript + Tailwind + shadcn/ui
  - Hybrid server/client rendering, first-class routing, strong DX, excellent deployment story on Vercel.
- Backend: Next.js Route Handlers + Node.js runtime
  - Unified full-stack app, low ops overhead, easy auth/session integration.
- AI Layer: Groq API with Llama 3.3 70B (llama-3.3-70b-versatile)
  - Low-latency inference, streaming-first UX, and high throughput for realtime multiplayer interactions.
- Realtime: Supabase Realtime + browser WebSocket channel wrappers
  - Presence, event feed, and low-latency collaboration without custom infra.
- Database: Postgres + Redis cache
  - Postgres for relational consistency and snapshots; Redis for hot state, rate limits, idempotency keys.
- ORM: Drizzle ORM
  - Type-safe SQL, migration workflows, and minimal abstraction overhead.
- Auth: NextAuth + Supabase adapter
  - Multiple providers, flexible session model, protected route middleware.
- Infra: Vercel (web/API), Supabase (DB/realtime/storage), Upstash Redis
  - Fast deployment, managed primitives, global scale with low setup friction.
- Storage: S3-compatible bucket (Cloudflare R2/Supabase Storage)
  - Durable snapshot exports, report artifacts, media assets.
- Monitoring: Sentry + PostHog + uptime ping
  - Error tracing, product analytics, availability tracking.

## System Design Diagram (ASCII)

```text
[Browser Client]
  |  HTTPS (Edge cached static assets via CDN)
  v
[Vercel Edge / Next.js App Router]
  |-- Middleware: Auth, bot checks, geo policy, A/B flags
  |-- Route handlers (API gateway façade)
  v
[Service Layer]
  |-- Companion Domain Service
  |-- AI Orchestrator Service --------> [Groq Inference API]
  |-- Multiplayer Presence Service ---> [Supabase Realtime WS Bus]
  |-- Billing Service ----------------> [Stripe API]
  |-- Analytics Service -------------> [PostHog + Aggregation Jobs]
  |-- GDPR Service (export/delete)
  |
  |-- Cache aside (read-through)
  v
[Redis: hot entity state, session throttle, token budgets]
  |
  v
[Postgres: canonical state, snapshots, events, leaderboard, billing ledger]
  |
  +--> [S3/R2 Storage: exported snapshots, PDF reports, replay blobs]

Edge/CDN:
- Static pages and assets cached at edge with stale-while-revalidate.
- API responses use cache tags for dashboard and public read models.
```

## Caching Strategy
- Companion state cache key: companion:{id}:state, TTL 30s with write-through invalidation.
- Presence cache: user:{id}:presence in Redis + Realtime source of truth.
- AI response cache for deterministic prompts: hash(system+input+memoryWindow), TTL 5m.
- Leaderboard cache refreshed every minute and on write events.

## Data Models

### User
- id: uuid (pk)
- email: text unique
- displayName: text
- avatarUrl: text nullable
- tier: enum(free,pro,enterprise)
- credits: integer default 100
- createdAt: timestamptz

### Companion
- id: uuid (pk)
- name: text
- mood: enum(happy,neutral,sad,angry,sleepy)
- energy: integer 0..100
- hunger: integer 0..100
- hygiene: integer 0..100
- evolutionStage: integer
- personalityEmbedding: vector/jsonb
- skinMode: enum(modern,retro80s)
- isAlive: boolean
- lastInteractionAt: timestamptz
- createdBy: uuid fk -> User.id

### CompanionMemory
- id: uuid (pk)
- companionId: uuid fk -> Companion.id
- userId: uuid fk -> User.id
- memoryType: enum(preference,habit,milestone,conflict)
- content: jsonb
- salience: numeric
- createdAt: timestamptz

### ActionEvent
- id: uuid (pk)
- companionId: uuid fk
- userId: uuid fk
- actionType: enum(feed,play,clean,chat,discipline,heal)
- payload: jsonb
- aiReasoning: text nullable
- createdAt: timestamptz

### Snapshot
- id: uuid (pk)
- companionId: uuid fk
- version: integer
- stateJson: jsonb
- createdBy: uuid fk
- createdAt: timestamptz

### Presence
- id: uuid (pk)
- companionId: uuid fk
- userId: uuid fk
- status: enum(online,idle,offline)
- activity: text
- heartbeatAt: timestamptz

### ReputationEntry
- id: uuid (pk)
- companionId: uuid fk
- userId: uuid fk
- scoreDelta: integer
- reason: text
- createdAt: timestamptz

### Subscription
- id: uuid (pk)
- userId: uuid fk
- stripeCustomerId: text
- stripeSubscriptionId: text
- status: enum(trialing,active,past_due,canceled)
- plan: enum(free,pro,creator)
- renewAt: timestamptz nullable

### CreditLedger
- id: uuid (pk)
- userId: uuid fk
- delta: integer
- source: enum(ai_chat,purchase,referral,admin)
- metadata: jsonb
- createdAt: timestamptz

### Referral
- id: uuid (pk)
- referrerUserId: uuid fk
- invitedUserId: uuid fk nullable
- code: text unique
- status: enum(pending,converted,expired)
- rewardCredits: integer

## API Contract

### REST Endpoints
- POST /api/auth/signin
  - body: { provider: string }
  - response: { ok: boolean, redirectUrl?: string }

- GET /api/companions/:id
  - response: { companion, stats, currentPresence }

- POST /api/companions/:id/actions
  - body: { actionType, payload, mode: "modern" | "80s" }
  - response: { newState, eventId, aiOverlay }

- POST /api/ai/chat
  - body: { companionId, text, explain: boolean }
  - response stream: text/event-stream chunks { token, costEstimate, reasoning? }

- POST /api/snapshots
  - body: { companionId, label? }
  - response: { snapshotId, version }

- GET /api/snapshots/:id/replay
  - response: { timeline: Snapshot[] }

- POST /api/import
  - body: { jsonState }
  - response: { companionId }

- GET /api/analytics/weekly
  - response: { usageHeatmap, timeline, aiSummary, anomalies }

- POST /api/billing/checkout
  - body: { plan: "pro" | "creator", successUrl, cancelUrl }
  - response: { checkoutUrl }

- POST /api/webhooks/stripe
  - body: Stripe event
  - response: { received: true }

- DELETE /api/gdpr/me
  - response: { deleted: true }

- GET /api/gdpr/export
  - response: { exportUrl }

### WebSocket Events
- client->server
  - presence:update { companionId, activity }
  - action:submit { companionId, actionType, payload }
  - chat:send { companionId, message }

- server->client
  - presence:changed { userId, status, activity }
  - companion:state { companionId, state, version }
  - feed:event { event }
  - leaderboard:update { entries }
  - ai:debug { reasoning, confidence, memoryRefs }

## Security and Compliance Controls
- Rate limiting: Upstash token bucket per IP/user and per AI endpoint.
- DDoS: Cloudflare WAF and bot score challenge.
- Sanitization: Zod input validation + DOMPurify output policy for user-generated text.
- AI output validation: Schema-constrained JSON channels, safe fallback prompts.
- GDPR: consent banner, export endpoint, hard delete endpoint, retention policies.

## Storytelling: Why Now
In 1989, we cared for simulated life with button presses and imagination. In 2026, we can finally give that life a memory, voice, social world, and ethical guardrails while preserving the original emotional magic. Retro AI Companion bridges a tactile childhood ritual with modern AI companionship and collaborative internet culture.

## Technical Novelty Hook
The first real-time collaborative AI pet whose evolving personality is co-authored by many users at once, with explainable memory traces and reversible timeline states.
