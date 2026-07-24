"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Check, ArrowRight } from "lucide-react";
import styles from "./pricing.module.css";

const services = [
  { title: "UI/UX Design", summary: "Clean, user-friendly interfaces and product flows." },
  { title: "Web Development", summary: "Modern, responsive websites built for performance." },
  { title: "App Development", summary: "Smart and easy-to-use mobile applications." },
  { title: "Graphic Design", summary: "Creative design for your brand and business, campaigns, and social media." },
  { title: "SEO and Content Writing", summary: "Search-friendly content that helps people find you." },
  { title: "AI Automation", summary: "Smart automation that saves time and improves your workflow." },
];

const budgetRanges = ["Under $500", "$500-1000", "$1000-2000", "$10k+"];

export default function PricingEstimator() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [chosen, setChosen] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("Under $500");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const servicesParam = searchParams.get("services");
    if (servicesParam) {
      const parsedServices = servicesParam.split(",").map(s => s.trim());
      setChosen(parsedServices.filter(s => services.some(srv => srv.title === s)));
    }
    const budgetParam = searchParams.get("budget");
    if (budgetParam) {
      setBudget(budgetParam);
    }
  }, [searchParams]);

  const toggle = (title: string) => {
    setError("");
    if (chosen.includes(title)) {
      setChosen(chosen.filter((s) => s !== title));
    } else {
      setChosen([...chosen, title]);
    }
  };

  const handleRequest = () => {
    if (chosen.length === 0) {
      setError("At least 1 option must be selected.");
      return;
    }
    const servicesParam = encodeURIComponent(chosen.join(", "));
    const budgetParam = encodeURIComponent(budget);
    router.push(`/contact?services=${servicesParam}&budget=${budgetParam}#contact`);
  };

  const summaryCard = (
    <div className={styles.summaryCard} data-reveal>
      <p className={styles.summaryEyebrow}>Your starting point</p>
      <p className={styles.summaryTitle}>
        {chosen.length ? chosen.join(" + ") : "Choose one or more services"}
      </p>
      <p className={styles.summaryBudget}>Budget range: {budget}</p>
      {error && <div className="pricing-error">{error}</div>}
      <button onClick={handleRequest} className={styles.requestBtn}>
        Request a Proposal <ArrowRight size={16} />
      </button>
    </div>
  );

  return (
    <div className={styles.pricingSection}>
      <div className={styles.pricingBox}>
        <div className={styles.pricingGrid}>
          {/* Left Column */}
          <div className={styles.stickyColumn}>
            <p className={styles.eyebrow} data-reveal>Build your engagement</p>
            <h2 className={styles.heading} data-reveal>Choose the services you need.</h2>
            <p className={styles.description} data-reveal>
              Select the services and budget range that feel right. We will shape a focused proposal around your goals.
            </p>
            <div className={styles.desktopSummary}>
              {summaryCard}
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            <p className={styles.stepTitle} data-reveal>1. What do you need?</p>
            <div className={styles.servicesGrid} data-stagger>
              {services.map((service) => {
                const active = chosen.includes(service.title);
                return (
                  <button
                    key={service.title}
                    type="button"
                    onClick={() => toggle(service.title)}
                    className={styles.serviceToggle}
                    data-active={active}
                  >
                    <span className={styles.serviceToggleText}>
                      <span className={styles.serviceToggleTitle}>{service.title}</span>
                      <span className={styles.serviceToggleDesc}>{service.summary}</span>
                    </span>
                    {active ? (
                      <CheckCircle2 className={styles.serviceCheckIcon} size={20} />
                    ) : (
                      <span className={styles.serviceCheckCircle} />
                    )}
                  </button>
                );
              })}
            </div>

            <p className={styles.stepTitle} data-reveal>2. What is your budget range?</p>
            <div className={styles.budgetGrid} data-stagger>
              {budgetRanges.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setBudget(range)}
                  className={styles.budgetToggle}
                  data-active={budget === range}
                >
                  {range}
                </button>
              ))}
            </div>

            <p className={styles.disclaimer} data-reveal>
              <Check className={styles.disclaimerIcon} size={15} />
              A starting point only—we will recommend the clearest scope for your goals.
            </p>

            <div className={styles.mobileSummary}>
              {summaryCard}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
