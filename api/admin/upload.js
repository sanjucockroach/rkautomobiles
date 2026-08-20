import { put } from "@vercel/blob";
import { isSameOrigin, requireSession } from "../../server/auth.js";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

function safeFilename(value) {
  return String(value || "car-photo.jpg")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .slice(-100);
}

async function getBuffer(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
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
    const fileBuffer = await getBuffer(request);
    if (!fileBuffer || fileBuffer.length === 0) {
      return response.status(400).json({ error: "Empty photo payload." });
    }

    const filename = safeFilename(request.query.filename);
    const path = `cars/${Date.now()}-${filename}`;
    const baseOptions = {
      addRandomSuffix: true,
      contentType,
    };

    let blob;
    const targetAccess = process.env.BLOB_ACCESS === "private" ? "private" : "public";

    try {
      blob = await put(path, fileBuffer, {
        ...baseOptions,
        access: targetAccess,
      });
    } catch (uploadErr) {
      const errMsg = String(uploadErr?.message || uploadErr);
      if (
        targetAccess === "public" &&
        (errMsg.includes("private store") || errMsg.includes("configured with private access"))
      ) {
        blob = await put(path, fileBuffer, {
          ...baseOptions,
          access: "private",
        });
      } else {
        throw uploadErr;
      }
    }
    return response.status(200).json({ url: blob.url || blob.downloadUrl });
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
