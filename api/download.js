// Vercel response body hard limit: 4.5 MB (Hobby) / 4.5 MB (Pro).
// We clamp at 4 MB to stay safely under that ceiling.
const MAX_BYTES = 4 * 1024 * 1024; // 4 MB

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const requested = parseInt(req.query.size, 10) || MAX_BYTES;
  const size = Math.min(requested, MAX_BYTES);

  // Fill with pseudo-random bytes so CDN/proxy compression doesn't deflate the payload.
  const buf = Buffer.allocUnsafe(size);
  for (let i = 0; i < size; i++) buf[i] = (Math.random() * 256) | 0;

  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Content-Length", size);
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.status(200).end(buf);
}
