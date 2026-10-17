import { NextResponse } from "next/server";
import { connectDb, isDbConfigured } from "@/lib/mongodb";
import { validateEnquiry } from "@/lib/enquiry-validation";
import { Enquiry } from "@/models/Enquiry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Best-effort, per-instance rate limit: 5 enquiries per 10 minutes per IP.
// (Use a shared store such as Redis if you run several instances.)
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success so bots learn nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const { data, errors } = validateEnquiry(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "validation", fields: errors }, { status: 422 });
  }

  if (!isDbConfigured()) {
    // The browser falls back to opening the visitor's email app.
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  try {
    await connectDb();
    await Enquiry.create(data);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Failed to save enquiry", err);
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
