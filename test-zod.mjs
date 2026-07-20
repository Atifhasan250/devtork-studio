import { z } from "zod";

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

const payload = {
  name: "ATIF HASAN",
  email: "atifhasan000000@gmail.com",
  company: "",
  service: "Full digital project",
  budget: "Under $500",
  timeline: "As soon as possible",
  message: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  website: ""
};

const parsed = inquirySchema.safeParse(payload);
if (!parsed.success) {
  console.log(parsed.error.flatten().fieldErrors);
} else {
  console.log("Success!", parsed.data);
}
