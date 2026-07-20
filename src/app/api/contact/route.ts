import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(80, "Name is too long."),
  email: z.string().email("Please enter a valid email address.").max(160, "Email is too long."),
  company: z.string().trim().max(120, "Company name is too long.").optional().default(""),
  service: z.string().trim().min(2, "Please select a service.").max(80, "Invalid service selected."),
  budget: z.string().trim().max(80).optional().default(""),
  timeline: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().min(20, "Please write at least 20 characters so we can understand your needs.").max(3000, "Message must be under 3000 characters.")
});

const requests = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 3;

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function limited(ip: string) {
  const now = Date.now();

  // Prevent memory leaks by cleaning up expired entries if map gets too large
  if (requests.size > 1000) {
    for (const [key, val] of requests.entries()) {
      if (val.resetAt < now) requests.delete(key);
    }
  }

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
  if (!parsed.success) {
    console.error("Zod Validation Errors:", parsed.error.flatten().fieldErrors);
    console.error("Received Body:", body);
    return NextResponse.json({ message: "Please check the required fields and try again.", errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.CONTACT_TO_EMAIL || user;
  if (!user || !pass) {
    return NextResponse.json({ message: "The contact form is not configured yet. Please email hello@devtork.com directly." }, { status: 503 });
  }

  const inquiry = Object.fromEntries(Object.entries(parsed.data).map(([key, value]) => [key, escapeHtml(String(value))])) as Record<string, string>;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: `"${parsed.data.name}" <${user}>`,
      to,
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
    return NextResponse.json({ message: "Thanks. Your project inquiry has been sent. We will reply within two working days." });
  } catch (error) {
    console.error("Contact form delivery failed", error);
    return NextResponse.json({ message: "We could not deliver the inquiry right now. Please email hello@devtork.com directly." }, { status: 502 });
  }
}
