import { put } from "@vercel/blob";
import { isSameOrigin, requireSession } from "../../server/auth.js";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

function safeFilename(value) {
  return String(value || "car-photo.jpg")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .slice(-100);
}

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }
  if (!isSameOrigin(request)) {
    return response.status(403).json({ error: "Invalid request origin." });
  }
  if (!requireSession(request, response)) return;

  const contentType = String(request.headers["content-type"] || "").split(";")[0];
  if (!allowedTypes.has(contentType)) {
    return response.status(415).json({ error: "Upload a JPG, PNG, or WebP image." });
  }

  try {
    const filename = safeFilename(request.query.filename);
    const blob = await put(`cars/${Date.now()}-${filename}`, request, {
      access: "public",
      addRandomSuffix: true,
      contentType,
    });
    return response.status(200).json({ url: blob.url });
  } catch (error) {
    return response.status(503).json({
      error: error instanceof Error ? error.message : "Photo upload failed.",
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
    responseLimit: "1mb",
  },
};
