"use client";

import { useState } from "react";

const items = [
  ["Do I need a complete brief?", "No. A clear goal and honest context are enough for the first conversation. We can help define scope, priorities, users, and requirements."],
  ["Can you handle design and development together?", "Yes. Keeping strategy, design, and development connected is one of the main reasons clients work with a studio like ours."],
  ["Will the website work well on mobile?", "Yes. Responsive behaviour, touch interaction, readable content, and performance on realistic devices are included in our process."],
  ["What happens after launch?", "We can provide handover, training, maintenance, content support, performance checks, SEO, analytics, and ongoing improvements."],
  ["How long does a typical project take?", "Timelines depend on the scope and complexity of the project. A standard website takes 4-8 weeks, while complex applications can take 3+ months. We'll agree on a clear schedule before starting."],
  ["How much do your services cost?", "We don't offer fixed packages. Every project is priced based on its unique requirements, timeline, and value. We’ll provide a detailed proposal and estimate after our initial discovery call."]
];

export default function Accordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="accordion">
      {items.map(([question, answer], index) => {
        const active = open === index;
        return (
          <div className={`accordion-item ${active ? "is-open" : ""}`} key={question}>
            <button className="accordion-button" aria-expanded={active} onClick={() => setOpen(active ? null : index)}>{question}<span className="accordion-icon" /></button>
            <div className="accordion-panel" style={{ maxHeight: active ? 220 : 0 }}><div className="accordion-panel-inner">{answer}</div></div>
          </div>
        );
      })}
    </div>
  );
}
