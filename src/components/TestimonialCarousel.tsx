"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "The team at DevTork truly understood our vision. The end result was not just a beautiful website, but a functional platform that dramatically increased our conversions.",
    author: "Sarah Jenkins",
    role: "CEO",
    company: "TechNova"
  },
  {
    quote: "Working with them was a breath of fresh air. Clear communication, transparent processes, and an absolutely stunning final product.",
    author: "David Chen",
    role: "Founder",
    company: "Lumina"
  },
  {
    quote: "They didn't just build what we asked for—they challenged our assumptions and delivered an experience that fundamentally elevated our brand.",
    author: "Elena Rodriguez",
    role: "CMO",
    company: "Aura Systems"
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000); // 4 seconds delay
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div 
      className="carousel-container" 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      data-stagger
    >
      <div className="carousel-wrapper" style={{ position: 'relative' }}>
        <button className="carousel-arrow prev hide-on-mobile" onClick={handlePrev} aria-label="Previous slide">
          <ChevronLeft size={20} />
        </button>
        
        <div className="carousel-viewport">
          <div 
            className="carousel-track" 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <article className="carousel-slide" key={i} aria-hidden={i !== currentIndex}>
                <div className="carousel-quote-wrapper">
                  <span className="carousel-quote-mark">“</span>
                  <p>{t.quote}</p>
                </div>
                <div className="carousel-meta">
                  <div className="carousel-author">{t.author}</div>
                  <div className="carousel-role">{t.role}, {t.company}</div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button className="carousel-arrow next hide-on-mobile" onClick={handleNext} aria-label="Next slide">
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="carousel-controls">
        <button className="carousel-arrow prev hide-on-desktop" onClick={handlePrev} aria-label="Previous slide">
          <ChevronLeft size={20} />
        </button>
        <div className="carousel-indicators" style={{ marginTop: 0 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button className="carousel-arrow next hide-on-desktop" onClick={handleNext} aria-label="Next slide">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
