export type Project = {
  slug: string;
  name: string;
  category: string;
  intro: string;
  year: string;
  type: string;
  services: string;
  status: string;
  artClass: string;
  badge: string;
  tags: string;
  filters: string[];
  challenge: string;
  approach: string;
  solution: string;
  highlights: string[];
  metrics: { value: string; label: string }[];
  next: string;
};

export const projects: Project[] = [
  {
    slug: "leados",
    name: "LeadOS",
    category: "AI product platform",
    intro: "A clear sales workspace that turns scattered inquiries into qualified leads, useful proposals, and timely follow-ups.",
    year: "2026",
    type: "Studio product",
    services: "Product strategy, UX/UI, full-stack development",
    status: "In development",
    artClass: "art-leados",
    badge: "Studio product",
    tags: "AI product · UX/UI · Full-stack",
    filters: ["product", "web"],
    challenge: "Agencies and freelancers often receive client requests from many places. Important details get lost, proposals take too long, and follow-ups are easy to miss.",
    approach: "We designed one simple flow: capture the inquiry, understand the need, ask the right questions, prepare a proposal, and keep every follow-up visible. AI supports the work, but the user stays in control.",
    solution: "LeadOS combines lead tracking, requirement discovery, proposal drafting, pipeline management, and reminders in one focused dashboard.",
    highlights: [
      "One inbox for website, email, WhatsApp, and meeting leads",
      "Plain-language AI summaries and qualification suggestions",
      "Reusable proposal blocks with human review before sending",
      "Simple pipeline stages and follow-up reminders",
      "Role-based access, audit history, and secure document handling"
    ],
    metrics: [
      { value: "1", label: "clear workspace" },
      { value: "5", label: "core sales steps" },
      { value: "24/7", label: "lead visibility" }
    ],
    next: "unihub"
  },
  {
    slug: "unihub",
    name: "UniHub",
    category: "Campus platform",
    intro: "A central place for university clubs to publish events, manage members, and keep campus activities easy to discover.",
    year: "2026",
    type: "Platform build",
    services: "UX/UI, web development, workflow design",
    status: "Active development",
    artClass: "art-unihub",
    badge: "Platform",
    tags: "Campus platform · Web app",
    filters: ["platform", "web"],
    challenge: "Club events, approvals, member records, and announcements are often handled through separate chats, forms, and spreadsheets.",
    approach: "We mapped the real roles first—students, club leaders, and administrators—then reduced each workflow to the fewest clear steps.",
    solution: "UniHub brings event creation, club requests, role-based dashboards, registration, and status tracking into one responsive platform.",
    highlights: [
      "Role-based dashboards for students, club leaders, and administrators",
      "Secure registration, login, and permission-aware navigation",
      "Event publishing, registration, and approval workflows",
      "Reusable components and maintainable project structure",
      "Mobile-first layouts for everyday campus use"
    ],
    metrics: [
      { value: "3", label: "user roles" },
      { value: "1", label: "shared platform" },
      { value: "100%", label: "responsive flow" }
    ],
    next: "scholarguard"
  },
  {
    slug: "scholarguard",
    name: "ScholarGuard",
    category: "Verification system",
    intro: "A scholarship application and verification platform designed to make eligibility, review, and fraud checks more transparent.",
    year: "2026",
    type: "Secure web system",
    services: "System design, database, web development",
    status: "Prototype complete",
    artClass: "art-scholar",
    badge: "Secure system",
    tags: "Verification · Database · UX",
    filters: ["platform", "web"],
    challenge: "Manual scholarship review can be slow, inconsistent, and difficult to audit when applications and supporting documents grow.",
    approach: "We separated eligibility, document verification, fraud signals, ranking, and final review so each decision is understandable and traceable.",
    solution: "ScholarGuard uses structured applications, Oracle-based rules, verification workflows, ranking logic, and audit logs to support responsible decisions.",
    highlights: [
      "Student and verification-officer workflows",
      "Eligibility rules and explainable scoring",
      "Document review with clear verification states",
      "Fraud flags that support—not replace—human decisions",
      "Audit logs for important changes and actions"
    ],
    metrics: [
      { value: "5", label: "review stages" },
      { value: "1", label: "audit trail" },
      { value: "0", label: "hidden decisions" }
    ],
    next: "identity"
  },
  {
    slug: "identity",
    name: "DevTork Identity",
    category: "Brand system",
    intro: "A focused visual identity that combines a geometric studio mark with a flexible digital-first design system.",
    year: "2026",
    type: "Internal brand",
    services: "Brand direction, visual identity, digital system",
    status: "Live system",
    artClass: "art-identity",
    badge: "Brand system",
    tags: "Brand direction · Motion",
    filters: ["brand"],
    challenge: "The studio needed to feel technical without becoming cold, and creative without becoming difficult to understand.",
    approach: "We kept the system simple: a recognisable mark, strong typography, a calm neutral base, and purple used as a purposeful signal.",
    solution: "The result is a flexible identity for websites, apps, presentations, social content, and product interfaces.",
    highlights: [
      "Geometric DT monogram",
      "High-contrast dark and light versions",
      "Purple-led accent system",
      "Clear typography hierarchy",
      "Motion rules for loaders, transitions, and interface feedback"
    ],
    metrics: [
      { value: "1", label: "recognisable mark" },
      { value: "4", label: "core colours" },
      { value: "∞", label: "digital uses" }
    ],
    next: "commerce"
  },
  {
    slug: "commerce",
    name: "Northline Commerce",
    category: "E-commerce concept",
    intro: "A fast, product-first shopping experience designed to make browsing and buying feel effortless on every screen.",
    year: "2026",
    type: "Concept study",
    services: "UX/UI, commerce design, front-end direction",
    status: "Concept",
    artClass: "art-commerce",
    badge: "Concept study",
    tags: "E-commerce · UX/UI · Front-end",
    filters: ["web", "product"],
    challenge: "Many stores show too much at once, making it hard for customers to compare products and reach checkout with confidence.",
    approach: "We prioritised product clarity, simple filters, useful details, and a checkout flow with no unnecessary steps.",
    solution: "A modular commerce system with strong product pages, mobile-first navigation, and accessible interaction patterns.",
    highlights: [
      "Product-first visual hierarchy",
      "Simple filters and search",
      "Fast mobile browsing",
      "Clear delivery and return information",
      "Reusable campaign and collection blocks"
    ],
    metrics: [
      { value: "3", label: "checkout steps" },
      { value: "AA", label: "accessibility target" },
      { value: "<2s", label: "performance goal" }
    ],
    next: "impact"
  },
  {
    slug: "impact",
    name: "Impact Portal",
    category: "Civic information platform",
    intro: "A clear digital space for programmes, activities, outcomes, and community stories to be understood by more people.",
    year: "2026",
    type: "Concept platform",
    services: "Information architecture, UX/UI, content system",
    status: "Concept",
    artClass: "art-impact",
    badge: "Information platform",
    tags: "Content system · Accessibility · UX",
    filters: ["platform", "web"],
    challenge: "Important programme information often sits across reports, presentations, and separate files that are difficult for the public to explore.",
    approach: "We organised content around people’s questions: what happened, where, who joined, what changed, and what comes next.",
    solution: "A multilingual, accessible portal with programme pages, outcome stories, searchable resources, and simple visual reporting.",
    highlights: [
      "Plain-language programme summaries",
      "Outcome-focused story pages",
      "Searchable document library",
      "Accessible, multilingual structure",
      "Responsive dashboards for key indicators"
    ],
    metrics: [
      { value: "2", label: "language-ready" },
      { value: "1", label: "resource library" },
      { value: "AA", label: "accessibility target" }
    ],
    next: "leados"
  }
];

export const projectBySlug = Object.fromEntries(projects.map((project) => [project.slug, project])) as Record<string, Project>;

export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  read: string;
  visual: string;
  intro: string;
  sections: { heading: string; body: string }[];
  quote: string;
};

export const articles: Article[] = [
  {
    slug: "clarity",
    title: "A premium website should feel clear before it feels clever",
    category: "Design thinking",
    date: "12 July 2026",
    read: "5 min read",
    visual: "article-visual-1",
    intro: "Strong visual design gets attention. Clear structure turns that attention into understanding and action.",
    sections: [
      { heading: "Start with the visitor’s question", body: "Most people arrive with a simple question: Can this team solve my problem? A strong homepage answers that question early with plain language, relevant work, and a clear next step." },
      { heading: "Use motion to guide, not distract", body: "Animation works best when it explains hierarchy, confirms an action, or makes a transition feel natural. It should never slow down someone who already knows where they want to go." },
      { heading: "Make every section earn its place", body: "A premium site is not a long list of fashionable sections. It is a sequence. Each section should answer a new question and move the visitor closer to trust." }
    ],
    quote: "Simple is not empty. Simple is carefully decided."
  },
  {
    slug: "motion",
    title: "Seven motion details that make a website feel considered",
    category: "Motion design",
    date: "08 July 2026",
    read: "6 min read",
    visual: "article-visual-2",
    intro: "Premium motion is usually quiet: good easing, consistent timing, and feedback that arrives exactly when it should.",
    sections: [
      { heading: "Begin with a timing system", body: "Choose a small set of durations for micro-interactions, section reveals, and page transitions. Consistency makes the whole experience feel designed as one system." },
      { heading: "Respect user control", body: "Never trap scrolling or hide important content behind long animation. Provide reduced-motion support and make every important action usable without special effects." },
      { heading: "Animate relationships", body: "The best transitions show where an element came from and where it is going. A project image expanding into a case study is more meaningful than a random fade." }
    ],
    quote: "Movement should explain the interface, not compete with it."
  },
  {
    slug: "copy",
    title: "How to explain technical services without sounding technical",
    category: "Content",
    date: "02 July 2026",
    read: "4 min read",
    visual: "article-visual-3",
    intro: "People do not need to know your tools before they understand the value of your work.",
    sections: [
      { heading: "Lead with the outcome", body: "Instead of starting with frameworks and platforms, explain what becomes easier, faster, safer, or more profitable for the client." },
      { heading: "Use one idea per sentence", body: "Short sentences are not less intelligent. They reduce effort, especially for visitors reading on mobile or in a second language." },
      { heading: "Put technical detail in the right place", body: "Technical buyers still need detail. Give it a clear section, proposal, or case study instead of forcing every visitor to read it first." }
    ],
    quote: "Clear writing is part of user experience."
  },
  {
    slug: "performance",
    title: "Beautiful websites still need to be fast",
    category: "Development",
    date: "24 June 2026",
    read: "7 min read",
    visual: "article-visual-4",
    intro: "A visual experience loses value when it takes too long to appear or feels unstable while loading.",
    sections: [
      { heading: "Design with performance in mind", body: "Image sizes, font choices, video use, and animation complexity are design decisions as much as development decisions." },
      { heading: "Load the important content first", body: "The first screen should become useful quickly. Decorative media can arrive later without blocking the message or main action." },
      { heading: "Test real devices", body: "A fast laptop on good Wi-Fi does not represent every visitor. Test mid-range phones, slower networks, and touch interaction before launch." }
    ],
    quote: "Speed is not a technical extra. It is part of the brand experience."
  },
  {
    slug: "process",
    title: "A simple agency process clients can actually follow",
    category: "Studio process",
    date: "17 June 2026",
    read: "5 min read",
    visual: "article-visual-5",
    intro: "Good process reduces uncertainty for both the client and the team.",
    sections: [
      { heading: "Define decisions, not just deliverables", body: "A useful plan explains what must be decided at each stage, who is responsible, and what information is needed to move forward." },
      { heading: "Show progress in working form", body: "Clickable prototypes and regular reviews are easier to understand than long explanations about work that remains invisible." },
      { heading: "Plan the launch early", body: "Content, domains, analytics, testing, training, and handover should not appear as last-minute tasks. They belong in the project plan from the start." }
    ],
    quote: "A clear process gives creativity room to work."
  },
  {
    slug: "brand",
    title: "Using one bold colour without making every page feel the same",
    category: "Brand systems",
    date: "10 June 2026",
    read: "5 min read",
    visual: "article-visual-6",
    intro: "A strong brand colour becomes more powerful when it is used with restraint.",
    sections: [
      { heading: "Give the colour a job", body: "Use the accent to signal actions, selected states, key messages, and memorable moments. Do not use it simply because a space feels empty." },
      { heading: "Build a neutral foundation", body: "Warm light backgrounds, deep dark sections, and clear text colours give the accent room to stand out while keeping the interface professional." },
      { heading: "Vary scale, not identity", body: "The same colour can appear as a small button detail, a full transition, or a soft glow. Variation keeps the system expressive without introducing unnecessary colours." }
    ],
    quote: "Restraint turns a colour into a signature."
  }
];

export const articleBySlug = Object.fromEntries(articles.map((article) => [article.slug, article])) as Record<string, Article>;

export const services = [
  { id: "web", number: "01", title: "UI/UX design", summary: "We organise your message and turn it into a website that feels distinctive without becoming difficult to use.", items: ["Strategy", "Information architecture", "UX/UI design", "Prototyping", "Motion direction"], outcome: "A clear, responsive design system ready for development and future growth." },
  { id: "development", number: "02", title: "Web development", summary: "We build fast, secure, maintainable websites and web applications that work properly across devices.", items: ["Front-end", "Back-end", "CMS", "API integration", "Testing", "Performance"], outcome: "A production-ready digital product with clean structure, useful documentation, and no unnecessary complexity." },
  { id: "apps", number: "03", title: "Mobile apps", summary: "We design and develop mobile experiences around the actions people need to complete—not around a list of features.", items: ["Product planning", "iOS & Android", "Cross-platform", "App UX/UI", "Backend integration"], outcome: "An app that is easy to learn, reliable in daily use, and ready to improve over time." },
  { id: "automation", number: "04", title: "AI automation", summary: "We design useful AI-assisted workflows that reduce repetitive work, connect existing tools, and keep important decisions under human control.", items: ["Workflow discovery", "AI assistants", "Process automation", "Tool integration", "Human review", "Monitoring"], outcome: "A dependable automation system that saves time, reduces manual errors, and remains clear enough for your team to manage." },
  { id: "brand", number: "05", title: "Brand identity", summary: "We create the visual and verbal system that helps people recognise your business and understand what makes it different.", items: ["Brand direction", "Logo system", "Colour & typography", "Tone of voice", "Guidelines"], outcome: "A consistent identity that works across your website, product, social content, and presentations." },
  { id: "growth", number: "06", title: "SEO & growth", summary: "We help the right people find your business and make the path from attention to action easier to measure.", items: ["Technical SEO", "Content planning", "Analytics", "Paid campaigns", "Conversion improvement"], outcome: "A practical growth system built around useful data instead of vague promises." },
  { id: "support", number: "07", title: "Ongoing support", summary: "Launch is not the end. We can keep the website secure, updated, measured, and ready for new needs.", items: ["Maintenance", "Security updates", "Content support", "Performance checks", "Continuous improvement"], outcome: "A digital presence that stays useful and improves instead of slowly becoming outdated." }
] as const;
