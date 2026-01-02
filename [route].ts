import type { VercelRequest, VercelResponse } from "@vercel/node";

const BASE = "https://prices.runescape.wiki/api/v1/osrs";

const allowed = new Set(["latest", "mapping", "5m", "1h", "timeseries"]);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const route = (req.query.route as string) || "";
  if (!allowed.has(route)) return res.status(404).json({ error: "Not found" });

  const qs = new URLSearchParams(req.query as any);
  qs.delete("route");

  const url = `${BASE}/${route}${qs.toString() ? `?${qs}` : ""}`;

  const r = await fetch(url, {
    headers: {
      "User-Agent": process.env.WIKI_UA || "ge-flip-dashboard (set WIKI_UA env var)",
      "Accept": "application/json",
    },
  });

  const cache = route === "mapping" ? "public, s-maxage=86400" : "public, s-maxage=30";
  res.setHeader("Cache-Control", cache);

  const text = await r.text();
  res.status(r.status).send(text);
}
