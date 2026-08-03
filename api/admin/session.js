import { getSession } from "../../server/auth.js";

export default function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed." });
  }
  const session = getSession(request);
  if (!session) return response.status(401).json({ authenticated: false });
  return response.status(200).json({ authenticated: true, username: session.username });
}
