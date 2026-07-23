export type Project = {
  slug: string;
  name: string;
  category: string;
  intro: string;
  year: string;
  type: string;
  services: string;
  status: string;
  image: string;
  imageAlt: string;
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
    slug: "it-resource-zone",
    name: "IT Resource Zone",
    category: "Digital learning platform",
    intro: "A complete learning environment where beginner IT students can take exams, follow a study plan, build consistent habits, and understand their progress in one place.",
    year: "2026",
    type: "Production learning platform",
    services: "Product design, full-stack development, security, platform operations",
    status: "Live",
    image: "https://ik.imagekit.io/atifhasan/portfolio/projects/it-resource-zone_1782389669110.png?updatedAt=1782389661095",
    imageAlt: "IT Resource Zone student learning dashboard and exam platform",
    badge: "Live platform",
    tags: "EdTech · Exams · Learning tools",
    filters: ["education", "platform"],
    challenge: "Beginner IT students often move between separate exam links, videos, notes, task lists, and chat announcements. That fragmentation makes it difficult to practise regularly, see genuine progress, or know what to study next. Administrators face the other side of the problem: publishing exams, organising resources, supporting students, and protecting assessment integrity across disconnected tools.",
    approach: "The platform was organised around a student's full learning cycle rather than a collection of pages: discover an exam, complete a timed attempt, review the result, continue with relevant resources, and return to a practical weekly plan. Public discovery, private student data, and administration were deliberately separated so each audience receives the right level of access and complexity.",
    solution: "IT Resource Zone brings live and practice exams, instant scoring, leaderboards, curated learning resources, habit tracking, weekly planning, and personal progress reporting into one responsive platform. A separate administrative system manages exams, questions, users, notifications, resources, and audit history, while dedicated authentication and integrity controls protect student attempts and private information.",
    highlights: [
      "Scheduled live assessments and reusable practice exams with timed attempts, answer locking, instant results, and private review",
      "Public global and exam-specific leaderboards that make achievement visible without exposing personal dashboards",
      "A student workspace combining progress summaries, recommendations, study planning, daily habits, streaks, and report export",
      "A curated resource hub for video lessons, PDFs, images, files, and links with lesson-level progress tracking",
      "Independent student and administrator security layers, supported by validation, rate limiting, audit logs, and monitoring"
    ],
    metrics: [
      { value: "2", label: "live and practice exam modes" },
      { value: "2", label: "separated access systems" },
      { value: "PWA", label: "responsive, installable experience" }
    ],
    next: "stitchdrive"
  },
  {
    slug: "stitchdrive",
    name: "StitchDrive",
    category: "Cloud storage workspace",
    intro: "A single, secure workspace that combines the available storage from multiple Google Drive accounts and makes every file manageable from one dashboard.",
    year: "2026",
    type: "Full-stack web application",
    services: "Product design, Google Drive integration, full-stack development",
    status: "Live demo",
    image: "https://ik.imagekit.io/atifhasan/portfolio/projects/stitchdrive_1782390387086.png?updatedAt=1782390379308",
    imageAlt: "StitchDrive dashboard showing files and pooled Google Drive storage",
    badge: "Live demo",
    tags: "Cloud storage · Google Drive · SaaS",
    filters: ["productivity", "platform"],
    challenge: "People who depend on several Google accounts technically have more storage, but they do not have one place to see or manage it. Files remain split between separate Drives, available capacity is hard to compare, and routine actions require constant account switching. The product also has to handle sensitive Google access credentials without weakening user isolation.",
    approach: "StitchDrive treats connected accounts as one storage pool while keeping the original Google Drive structure intact. The experience centres on familiar file-management actions, and the backend chooses the account with the most available space when a user uploads. Authentication, signed OAuth state, encrypted tokens, and per-user database records were designed as part of the core workflow rather than added later.",
    solution: "The resulting dashboard lets a user connect multiple Google accounts, browse files and folders across them, search and sort content, upload to the best available account, move and rename items, manage sharing, and recover files from trash. Storage analytics reveal how capacity is distributed, while every Drive operation is routed through a unified Next.js application and Google Drive API integration.",
    highlights: [
      "Multiple Google Drive accounts presented as one understandable storage pool",
      "Smart upload routing that selects the connected account with the most free space",
      "Unified browsing, search, sorting, moving, sharing, trash, restore, and permanent deletion workflows",
      "Dedicated views for personal files, shared items, connected accounts, storage statistics, and settings",
      "Clerk-based user isolation with OAuth tokens encrypted before database storage"
    ],
    metrics: [
      { value: "N×15GB", label: "expandable pooled capacity" },
      { value: "1", label: "unified file workspace" },
      { value: "At rest", label: "encrypted OAuth tokens" }
    ],
    next: "classnote-sorter"
  },
  {
    slug: "classnote-sorter",
    name: "Classnote Sorter",
    category: "Document productivity tool",
    intro: "A privacy-first PDF workspace that helps students turn scattered class notes into organised, printer-friendly documents without uploading the content for processing.",
    year: "2026",
    type: "Browser-based PDF utility",
    services: "Product design, PDF engineering, front-end development",
    status: "Working product",
    image: "https://ik.imagekit.io/atifhasan/portfolio/projects/classnote-sorter_1782390627469.png?updatedAt=1782390619617",
    imageAlt: "Classnote Sorter PDF editing and print layout workspace",
    badge: "Productivity tool",
    tags: "PDF tools · Privacy · Print workflow",
    filters: ["education", "productivity"],
    challenge: "Class notes frequently arrive as several PDFs in the wrong order, with unwanted pages, dark backgrounds, inconsistent numbering, or layouts that waste paper. Fixing those problems usually means moving between multiple utilities—or uploading private academic documents to a remote conversion service—before a file is ready to share or print.",
    approach: "The product was designed as one continuous document-preparation workspace. Processing-heavy operations run in the browser with JavaScript and WebAssembly, keeping note content on the user's device and providing immediate feedback. Reversible editing and clear print controls reduce the risk of losing work while experimenting with page order and output settings.",
    solution: "Classnote Sorter supports batch PDF import, cross-document page reordering, page removal, merging, configurable N-up sheet layouts, true black-and-white conversion, colour inversion, and custom page numbering. Users can prepare compact print files or clean digital handouts from the same interface, with an undo history available throughout the workflow.",
    highlights: [
      "Drag-and-drop batch import for organising several source documents together",
      "Page-level reorder, removal, and merge operations across PDFs",
      "Configurable N-up printing with columns, orientation, and margins to reduce paper use",
      "Strict black-and-white conversion and dark-note inversion for more economical printing",
      "Local browser processing and undo history for a private, reversible workflow"
    ],
    metrics: [
      { value: "Local", label: "on-device document processing" },
      { value: "N-up", label: "paper-saving layouts" },
      { value: "Undo", label: "reversible editing history" }
    ],
    next: "voltmind"
  },
  {
    slug: "voltmind",
    name: "VoltMind",
    category: "Real-time energy monitoring",
    intro: "A live office energy system that helps teams see what is running, understand electricity use, and receive timely alerts through the dashboard and Discord.",
    year: "2026",
    type: "IoT and software prototype",
    services: "System design, dashboard UX, real-time backend, bot integration",
    status: "Live prototype",
    image: "https://ik.imagekit.io/atifhasan/portfolio/projects/24267_1783620957415.jpg?updatedAt=1783620959292",
    imageAlt: "VoltMind office energy dashboard with room and device monitoring",
    badge: "Live prototype",
    tags: "IoT · Real-time dashboard · Discord",
    filters: ["iot", "platform"],
    challenge: "In a small office where daily coordination happens on Discord, fans and lights can remain on after people leave. The team sees the higher electricity bill later, but has no shared, real-time view of which device caused the waste or when the problem began.",
    approach: "VoltMind establishes one trusted backend for the office state and lets every interface read from it. A simulator changes device states, the backend recalculates power and alert conditions, and Server-Sent Events update the dashboard without refreshes. The Discord assistant requests the same snapshot for every command, preventing the web experience and team chat from reporting different information.",
    solution: "The prototype monitors 15 fans and lights across three rooms through a live dashboard with office, room, analytics, and alert views. It calculates current and estimated energy use, identifies after-hours or unusually long operation, and sends deduplicated alerts to Discord. Optional history storage supports longer-term analysis, while Gemini may improve the wording of verified bot responses but never generates device data or changes the system state.",
    highlights: [
      "Live monitoring for two fans and three lights in each of three office rooms",
      "Server-Sent Events that keep dashboard state and alerts current without manual refresh",
      "Office-wide and room-level power summaries with historical energy analytics",
      "After-hours, all-devices-on, and two-hour continuous-running alert detection",
      "Discord commands and proactive notifications backed by the same verified office snapshot"
    ],
    metrics: [
      { value: "15", label: "simulated fans and lights" },
      { value: "3", label: "office rooms monitored" },
      { value: "2", label: "synchronised interfaces" }
    ],
    next: "it-resource-zone"
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
  { id: "graphic-design", number: "05", title: "Graphic design", summary: "We craft visually stunning and effective designs to communicate your message, enhance your brand appeal, and capture your audience's attention.", items: ["Social media posts", "Marketing materials", "Banners & posters", "Infographics", "Digital illustrations"], outcome: "High-quality visual assets that elevate your brand's presence across all platforms." },
  { id: "growth", number: "06", title: "SEO & growth", summary: "We help the right people find your business and make the path from attention to action easier to measure.", items: ["Technical SEO", "Content planning", "Analytics", "Paid campaigns", "Conversion improvement"], outcome: "A practical growth system built around useful data instead of vague promises." },
  { id: "support", number: "07", title: "Ongoing support", summary: "Launch is not the end. We can keep the website secure, updated, measured, and ready for new needs.", items: ["Maintenance", "Security updates", "Content support", "Performance checks", "Continuous improvement"], outcome: "A digital presence that stays useful and improves instead of slowly becoming outdated." }
] as const;
