# GE Flip Dashboard (iPhone-friendly: GitHub + Vercel)

This repo is designed to be deployed straight to **Vercel** (no local dev needed).
It uses a Vercel Serverless Function to proxy the OSRS Wiki Prices API and inject a required `User-Agent`.

## Deploy (no laptop)

1. Create a GitHub repo and upload these files.
2. In Vercel → New Project → Import the repo.
3. Add env var in Vercel Project Settings:
   - `WIKI_UA` = `ge-flip-dashboard (contact: you@example.com)`
4. Deploy. Visit the URL. Done.

## Local (optional)
- `npm i`
- `npm run dev`

## Notes
- Frontend fetches:
  - `/api/wiki/mapping`
  - `/api/wiki/latest`
- Proxy forwards to `https://prices.runescape.wiki/api/v1/osrs/*`
