# ADR-0001: Next.js + Supabase + Groq Llama

## Status
Accepted

## Context
We need a competition-grade stack that ships fast, supports realtime, AI streaming, and production constraints.

## Decision
Use Next.js app router as full-stack host, Supabase for Postgres/realtime/storage, Redis for cache/rate limits, and Groq-hosted Llama for model intelligence.

## Consequences
- Fast iteration and low ops overhead.
- Vendor concentration risk mitigated by abstraction modules in src/lib.
