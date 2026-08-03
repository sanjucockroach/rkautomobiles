import {
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";

export const SESSION_COOKIE = "rk_admin_session";
const SESSION_SECONDS = 60 * 60 * 8;

function encode(value) {
  return Buffer.from(value).toString("base64url");
}
function sign(value) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must contain at least 32 characters.");
  }
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function safeEqual(left, right) {
  const a = Buffer.from(String(left));
  const b = Buffer.from(String(right));
  return a.length === b.length && timingSafeEqual(a, b);
}

export function credentialsAreConfigured() {
  return Boolean(
    process.env.ADMIN_USERNAME &&
      process.env.ADMIN_PASSWORD &&
      process.env.ADMIN_SESSION_SECRET?.length >= 32,
  );
}

export function credentialsMatch(username, password) {
  if (!credentialsAreConfigured()) return false;
  return (
    safeEqual(username, process.env.ADMIN_USERNAME) &&
    safeEqual(password, process.env.ADMIN_PASSWORD)
  );
}

export function createSessionCookie(username) {
  const payload = encode(
    JSON.stringify({
      username,
      expiresAt: Date.now() + SESSION_SECONDS * 1000,
      nonce: randomBytes(12).toString("hex"),
    }),
  );
  const token = `${payload}.${sign(payload)}`;
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_SECONDS}`;
}

export function clearSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

export function getSession(request) {
  const cookies = String(request.headers.cookie || "")
    .split(";")
    .map((part) => part.trim());
  const cookie = cookies.find((part) => part.startsWith(`${SESSION_COOKIE}=`));
  if (!cookie) return null;

  try {
    const token = cookie.slice(SESSION_COOKIE.length + 1);
    const [payload, signature] = token.split(".");
    if (!payload || !signature || !safeEqual(signature, sign(payload))) return null;
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (
      typeof session.username !== "string" ||
      typeof session.expiresAt !== "number" ||
      session.expiresAt <= Date.now()
    ) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function requireSession(request, response) {
  const session = getSession(request);
  if (!session) {
    response.status(401).json({ error: "Your admin session has expired." });
    return null;
  }
  return session;
}

export function isSameOrigin(request) {
  const origin = request.headers.origin;
  if (!origin) return true;
  const forwardedHost = request.headers["x-forwarded-host"];
  const host = forwardedHost || request.headers.host;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
