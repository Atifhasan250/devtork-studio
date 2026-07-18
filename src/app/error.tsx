"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="section section-purple big-cta not-found">
      <div className="container big-cta-inner">
        <div>
          <p className="eyebrow">Something went wrong</p>
          <h1>One small error.<br />One clear next step.</h1>
          <p className="lead muted not-found-copy">Please try loading this page again.</p>
          <button className="btn btn-light top-gap" onClick={reset}>Try again ↗</button>
        </div>
      </div>
    </section>
  );
}
