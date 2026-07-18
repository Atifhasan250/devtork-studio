import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(160),
  company: z.string().trim().max(120).optional().default(""),
  service: z.string().trim().min(2).max(80),
  budget: z.string().trim().max(80).optional().default(""),
  timeline: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().min(20).max(3000),
  website: z.string().max(0).optional().default("")
});

const requests = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function limited(ip: string) {
  const now = Date.now();
  const current = requests.get(ip);
  if (!current || current.resetAt < now) {
    requests.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  requests.set(ip, current);
  return current.count > MAX_REQUESTS;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char] || char));
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (limited(ip)) return NextResponse.json({ message: "Too many inquiries were sent from this connection. Please try again later." }, { status: 429 });

  let body: unknown;
  try { body = await request.json(); }
  catch { return NextResponse.json({ message: "The request body is not valid JSON." }, { status: 400 }); }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: "Please check the required fields and try again.", errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ message: "Thanks. Your inquiry has been received." });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return NextResponse.json({ message: "The contact form is not configured yet. Please email hello@devtork.studio directly." }, { status: 503 });
  }

  const inquiry = Object.fromEntries(Object.entries(parsed.data).map(([key, value]) => [key, escapeHtml(String(value))])) as Record<string, string>;
  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to: [to],
      replyTo: parsed.data.email,
      subject: `New project inquiry — ${parsed.data.service}`,
      text: [
        `Name: ${parsed.data.name}`,
        `Email: ${parsed.data.email}`,
        `Company: ${parsed.data.company || "Not provided"}`,
        `Service: ${parsed.data.service}`,
        `Budget: ${parsed.data.budget || "Not selected"}`,
        `Timeline: ${parsed.data.timeline || "Not selected"}`,
        "",
        parsed.data.message
      ].join("\n"),
      html: `<h1>New project inquiry</h1><p><strong>Name:</strong> ${inquiry.name}</p><p><strong>Email:</strong> ${inquiry.email}</p><p><strong>Company:</strong> ${inquiry.company || "Not provided"}</p><p><strong>Service:</strong> ${inquiry.service}</p><p><strong>Budget:</strong> ${inquiry.budget || "Not selected"}</p><p><strong>Timeline:</strong> ${inquiry.timeline || "Not selected"}</p><hr><p style="white-space:pre-wrap">${inquiry.message}</p>`
    });
    if (result.error) throw new Error(result.error.message);
    return NextResponse.json({ message: "Thanks. Your project inquiry has been sent. We will reply within two working days." });
  } catch (error) {
    console.error("Contact form delivery failed", error);
    return NextResponse.json({ message: "We could not deliver the inquiry right now. Please email hello@devtork.studio directly." }, { status: 502 });
  }
}
