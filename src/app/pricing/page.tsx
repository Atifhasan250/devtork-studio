import type { Metadata } from "next";
import PricingEstimator from "./PricingEstimator";
import Link from "next/link";
import Accordion from "@/components/Accordion";

export const metadata: Metadata = {
  title: "Pricing & Estimation",
  description: "Select the services and budget range that feel right. We will shape a focused proposal around your goals."
};

export default function PricingPage() {
  return (
    <main className="home-experience">
      {/* Interactive Estimator Section */}
      <section className="section section-dark no-cream-nav" style={{ paddingTop: "calc(var(--header-h) + 10px)" }}>
        <PricingEstimator />
      </section>

      {/* FAQ Section (reused from home page) */}
      <section className="section section-paper-2" id="faq">
        <div className="container">
          <div className="split-heading">
            <div>
              <p className="eyebrow">Common questions</p>
              <h2>Before we start.</h2>
            </div>
            <Accordion />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-purple big-cta">
        <div className="container big-cta-inner">
          <div>
            <p className="eyebrow">Have an idea?</p>
            <h2>Let’s turn it into something people understand, trust, and remember.</h2>
            <Link aria-label="Start a project" className="cta-pill" href="/contact">
              <span className="cta-pill-circle"><span>→&#xFE0E;</span></span>
              <span className="cta-pill-text">Start project</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
