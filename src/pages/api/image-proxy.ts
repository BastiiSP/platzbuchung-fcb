// src/pages/api/image-proxy.ts
import type { NextApiRequest, NextApiResponse } from "next";
import https from "https";
import { pipeline } from "stream";
import { promisify } from "util";

const streamPipeline = promisify(pipeline);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).send("Missing or invalid URL");
  }

  try {
    https.get(url, (proxyRes) => {
      if (proxyRes.statusCode !== 200) {
        res.status(proxyRes.statusCode || 500).end();
        return;
      }

      res.setHeader("Content-Type", proxyRes.headers["content-type"] || "image/jpeg");

      // ✅ moderne, saubere Übergabe mit automatischem Error Handling
      streamPipeline(proxyRes, res).catch(() => {
        res.status(500).end("Stream error");
      });
    }).on("error", () => {
      res.status(500).send("Fehler beim Laden des Bildes");
    });
  } catch {
    res.status(500).send("Interner Serverfehler");
  }
}
