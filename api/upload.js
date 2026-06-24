export const config = { api: { bodyParser: { sizeLimit: "4mb" } } };
export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  const body = req.body;
  let received = 0;
  if (Buffer.isBuffer(body)) received = body.length;
  else if (typeof body === "string") received = Buffer.byteLength(body, "utf8");
  else if (body && typeof body === "object") received = Buffer.byteLength(JSON.stringify(body), "utf8");
  res.status(200).json({ received, ts: Date.now() });
}
