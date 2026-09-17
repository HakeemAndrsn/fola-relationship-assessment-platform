# Netlify — Serverless Functions

## Purpose

Netlify Functions for server-side operations — payment verification, webhooks, API endpoints.

## Ownership

- `functions/` — Individual serverless function files
- `netlify.toml` — Build and deploy configuration

## Key Functions

- `verify-payment` — Yoco payment verification endpoint
- Webhook handlers for payment and assessment completion events
- `mailerlite` — generic subscriber upsert used by payment/assessment flows
- `patterns-subscribe` — upserts a `/patterns` lead into MailerLite, mapping the
  visitor's family (Inward Blade / Storm Maker / Story Spinner) to its group ID via
  `ML_GROUP_*` env vars so the matching nurture automation triggers on group-join

## Key Constraints

- Functions must handle CORS for the lovebetter.co.za domain
- Environment variables for API keys stored in Netlify dashboard
- Yoco live keys in production, test keys for development
- Functions should be stateless where possible

## Child DOX Index

No child AGENTS.md files yet.
