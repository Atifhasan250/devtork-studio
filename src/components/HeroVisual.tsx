"use client";

import Image from "next/image";
import { useRef } from "react";

export default function HeroVisual() {
  const root = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const halo = useRef<HTMLDivElement>(null);

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const rect = root.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    if (logo.current) logo.current.style.transform = `rotateY(${nx * 9}deg) rotateX(${ny * -9}deg) translateZ(18px)`;
    if (halo.current) halo.current.style.transform = `translate(${nx * 12}px, ${ny * 12}px)`;
  };

  const reset = () => {
    logo.current?.style.removeProperty("transform");
    halo.current?.style.removeProperty("transform");
  };

  return (
    <div ref={root} className="hero-visual parallax-layer" data-parallax data-parallax-speed="0.075" aria-hidden="true" onMouseMove={onMove} onMouseLeave={reset}>
      <div ref={halo} className="hero-halo" />
      <div ref={logo} className="hero-logo">
        <Image
          src="/brand/logo-mark-white.png"
          alt=""
          fill
          priority
          sizes="(max-width: 900px) 42vw, 24vw"
        />
      </div>
      <div className="float-card one"><strong>Design</strong>Clear, useful, memorable.</div>
      <div className="float-card two"><strong>Build</strong>Fast, secure, scalable.</div>
      <div className="float-card three"><strong>Grow</strong>Search, content, campaigns.</div>
      <div className="scroll-cue">
        <span>Scroll to explore</span>
        <span className="scroll-cue-line" aria-hidden="true" />
      </div>
    </div>
  );
}
