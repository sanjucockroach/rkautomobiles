import { clearSessionCookie, isSameOrigin } from "../../server/auth.js";

export default function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }
  if (!isSameOrigin(request)) {
    return response.status(403).json({ error: "Invalid request origin." });
  }
  response.setHeader("Set-Cookie", clearSessionCookie());
  return response.status(200).json({ authenticated: false });
}
