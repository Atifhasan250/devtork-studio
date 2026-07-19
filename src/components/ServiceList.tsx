"use client";

import Link from "next/link";
import Image from "next/image";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type ServiceRow = readonly [string, string, string, string, string];

type ServiceListProps = {
  rows: readonly ServiceRow[];
};

export default function ServiceList({ rows }: ServiceListProps) {
  const [active, setActive] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const targetPoint = useRef({ x: 24, y: 24 });
  const currentPoint = useRef({ x: 24, y: 24 });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.classList.toggle("service-card-open", active !== null);
    return () => document.body.classList.remove("service-card-open");
  }, [active]);

  const updatePointer = (event: { clientX: number; clientY: number; pointerType?: string }) => {
    if (event.pointerType === "touch") return;
    const card = cardRef.current;
    const cardWidth = card?.offsetWidth ?? 340;
    const cardHeight = card?.offsetHeight ?? 220;
    // Keep the pointer visually attached to the card instead of stacking it
    // directly underneath: the reference interaction floats around the cursor.
    const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
    targetPoint.current.x = Math.max(12, Math.min(event.clientX - cardWidth * 0.38, viewportWidth - cardWidth - 12));
    // Let the card naturally continue below the viewport, matching the
    // reference interaction; only prevent it from disappearing above the top edge.
    targetPoint.current.y = Math.max(12, event.clientY - cardHeight * 0.44);
  };

  useEffect(() => {
    if (active === null) return;
    let frame = 0;
    const animate = () => {
      const card = cardRef.current;
      if (card) {
        const dx = targetPoint.current.x - currentPoint.current.x;
        const dy = targetPoint.current.y - currentPoint.current.y;
        currentPoint.current.x += dx * 0.16;
        currentPoint.current.y += dy * 0.16;
        if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
          card.style.setProperty("--card-x", `${currentPoint.current.x.toFixed(2)}px`);
          card.style.setProperty("--card-y", `${currentPoint.current.y.toFixed(2)}px`);
        }
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  return (
    <div
      className="services-list service-list-interactive"
      onPointerLeave={() => setActive(null)}
    >
      {rows.map(([number, title, description, href, color], index) => (
        <Link
          className={`service-row${active === index ? " is-active" : ""}`}
          href={href}
          key={number}
          onFocus={() => setActive(index)}
          onBlur={() => setActive(null)}
          onPointerEnter={(event) => {
            if (event.pointerType !== "touch") {
              setActive(index);
              updatePointer(event);
            }
          }}
          onPointerMove={updatePointer}
          onMouseEnter={(event) => {
            setActive(index);
            updatePointer(event);
          }}
          onMouseMove={updatePointer}
          onMouseLeave={() => setActive(null)}
          style={{ "--service-accent": color } as CSSProperties}
        >
          <span className="service-no">{number}</span>
          <h3 className="service-title">{title}</h3>
          <p className="service-desc">{description}</p>
          <span className="service-arrow" aria-hidden="true">↗</span>
        </Link>
      ))}

      {mounted && createPortal(<div
        aria-hidden="true"
        ref={cardRef}
        className={`service-hover-card${active === null ? " is-hidden" : ""}`}
        style={{
          "--card-x": "24px",
          "--card-y": "24px",
          "--service-accent": active === null ? "#c77dff" : rows[active][4],
        } as CSSProperties}
      >
        {active !== null && (
          <>
            <div className="service-hover-card-top">
              <span>{rows[active][0]} / SERVICE</span>
              <span className="service-hover-card-dot" style={{ backgroundColor: rows[active][4] }} />
            </div>
            <div className="service-hover-card-mark">
              <Image src="/brand/logo-mark-gradient.png" alt="" width={104} height={104} />
            </div>
            <strong>{rows[active][1]}</strong>
          </>
        )}
      </div>, document.body)}
    </div>
  );
}
