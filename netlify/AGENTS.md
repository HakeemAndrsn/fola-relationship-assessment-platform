# Netlify — Serverless Functions

## Purpose

Netlify Functions for server-side operations — payment verification, webhooks, API endpoints.

## Ownership

- `functions/` — Individual serverless function files
- `netlify.toml` — Build and deploy configuration

## Key Functions

- `verify-payment` — Yoco payment verification endpoint
- Webhook handlers for payment and assessment completion events

## Key Constraints

- Functions must handle CORS for the lovebetter.co.za domain
- Environment variables for API keys stored in Netlify dashboard
- Yoco live keys in production, test keys for development
- Functions should be stateless where possible

## Child DOX Index

No child AGENTS.md files yet.
