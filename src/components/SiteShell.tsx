"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type MouseEvent as ReactMouseEvent, type ReactNode, useEffect, useRef, useState } from "react";

const navItems = [
  { href: "/work", label: "Work", index: "01" },
  { href: "/services", label: "Services", index: "02" },
  { href: "/studio", label: "Studio", index: "03" },
  { href: "/insights", label: "Insights", index: "04" }
];

type TransitionPhase = "idle" | "covering" | "revealing";

function Brand() {
  return (
    <Link className="brand" href="/" aria-label="DevTork Studio home">
      <span className="brand-mark" aria-hidden="true" />
      <span className="brand-text">DevTork <span>Studio</span></span>
    </Link>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand />
            <p>We design and build clear digital experiences for businesses, organisations, and ambitious ideas.</p>
            <a className="text-link" href="mailto:hello@devtork.studio">hello@devtork.studio</a>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </div>
          <div className="footer-col">
            <h4>Start</h4>
            <Link href="/contact">Project inquiry</Link>
            <Link href="/contact#faq">Common questions</Link>
            <a href="mailto:hello@devtork.studio">Email us</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DevTork Studio. Built with care.</span>
          <div className="footer-legal"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
        </div>
      </div>
    </footer>
  );
}

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>("idle");
  const [darkFirstSection, setDarkFirstSection] = useState(pathname === "/studio");
  const transitionPhaseRef = useRef<TransitionPhase>("idle");
  const navigationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateTransitionPhase = (phase: TransitionPhase) => {
    transitionPhaseRef.current = phase;
    setTransitionPhase(phase);
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setLoading(false);
      setProgress(100);
      document.body.classList.remove("is-loading");
      return;
    }

    const minimumDuration = 2300;
    const exitHold = 180;
    const startedAt = performance.now();
    let resourcesReady = document.readyState === "complete";
    let animationFrame = 0;
    let exitTimer: number | null = null;

    const markResourcesReady = () => { resourcesReady = true; };
    window.addEventListener("load", markResourcesReady, { once: true });
    document.body.classList.add("is-loading");

    const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);
    const easeInOutCubic = (value: number) => value < 0.5
      ? 4 * value * value * value
      : 1 - Math.pow(-2 * value + 2, 3) / 2;

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const ratio = Math.min(1, elapsed / minimumDuration);
      let nextProgress: number;

      if (ratio < 0.62) {
        nextProgress = easeOutCubic(ratio / 0.62) * 78;
      } else {
        nextProgress = 78 + easeInOutCubic((ratio - 0.62) / 0.38) * 18;
      }

      if (ratio >= 1 && resourcesReady) nextProgress = 100;
      else nextProgress = Math.min(96, nextProgress);

      setProgress(Math.round(nextProgress));

      if (nextProgress >= 100) {
        exitTimer = window.setTimeout(() => {
          setLoading(false);
          document.body.classList.remove("is-loading");
        }, exitHold);
        return;
      }
      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("load", markResourcesReady);
      cancelAnimationFrame(animationFrame);
      if (exitTimer) window.clearTimeout(exitTimer);
    };
  }, []);

  useEffect(() => {
    let lenis: import("lenis").default | undefined;
    let rafId = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      import("lenis").then(({ default: Lenis }) => {
        lenis = new Lenis({ duration: 1.08, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1.05 });
        const raf = (time: number) => {
          lenis?.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      });
    }
    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    document.body.classList.remove("menu-open");
    setScrolled(false);
    window.scrollTo(0, 0);

    const firstSection = document.querySelector<HTMLElement>("#main > section:first-child, #main > div > section:first-child");
    setDarkFirstSection(Boolean(firstSection?.classList.contains("section-dark") || firstSection?.classList.contains("section-purple")));

    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], [data-stagger]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      revealTargets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6%" });
    revealTargets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (transitionPhaseRef.current !== "covering") return;
    const revealTimer = window.setTimeout(() => {
      transitionPhaseRef.current = "revealing";
      setTransitionPhase("revealing");
    }, 70);
    const finishTimer = window.setTimeout(() => {
      transitionPhaseRef.current = "idle";
      setTransitionPhase("idle");
    }, 760);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(finishTimer);
    };
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const progressBar = document.querySelector<HTMLElement>(".scroll-progress-bar");
    const parallaxItems = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let raf = 0;

    const update = () => {
      raf = 0;
      const viewportHeight = window.innerHeight;
      const scrollRange = Math.max(1, document.documentElement.scrollHeight - viewportHeight);
      progressBar?.style.setProperty("transform", `scaleX(${Math.min(1, window.scrollY / scrollRange)})`);

      if (!reduce) {
        parallaxItems.forEach((item) => {
          const rect = item.getBoundingClientRect();
          if (rect.bottom < -160 || rect.top > viewportHeight + 160) return;
          const speed = Number(item.dataset.parallaxSpeed ?? "0.055");
          const distanceFromCentre = rect.top + rect.height / 2 - viewportHeight / 2;
          const offset = Math.max(-56, Math.min(56, -distanceFromCentre * speed));
          item.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
        });
      }
    };

    const requestUpdate = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    requestUpdate();
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useEffect(() => {
    const cursor = document.querySelector<HTMLElement>(".cursor");
    const dot = document.querySelector<HTMLElement>(".cursor-dot");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!cursor || !dot || !finePointer || reduce) return;

    let mx = -100;
    let my = -100;
    let cx = -100;
    let cy = -100;
    let raf = 0;

    const move = (event: globalThis.MouseEvent) => {
      mx = event.clientX;
      my = event.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      document.body.classList.add("cursor-ready");
      const target = event.target as HTMLElement;
      cursor.classList.toggle("is-link", Boolean(target.closest("a,button,input,textarea,select,[data-cursor]")));
      cursor.classList.toggle("is-dark", Boolean(target.closest(".section-dark,.section-purple,.site-footer,.mobile-menu")));
      dot.classList.toggle("is-dark", Boolean(target.closest(".section-dark,.section-purple,.site-footer,.mobile-menu")));
    };

    const animate = () => {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduce) return;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const cleanups = items.map((el) => {
      const move = (event: globalThis.MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.13}px, ${y * 0.13}px)`;
      };
      const leave = () => { el.style.transform = "translate(0,0)"; };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname]);

  useEffect(() => () => {
    if (navigationTimerRef.current) clearTimeout(navigationTimerRef.current);
  }, []);

  const navigate = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const anchor = target.closest<HTMLAnchorElement>("a[href]");
    if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const rawHref = anchor.getAttribute("href");
    if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:") || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin || `${url.pathname}${url.search}${url.hash}` === `${window.location.pathname}${window.location.search}${window.location.hash}`) return;
    event.preventDefault();
    if (transitionPhaseRef.current !== "idle") return;
    setMenuOpen(false);
    document.body.classList.remove("menu-open");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      router.push(`${url.pathname}${url.search}${url.hash}`);
      return;
    }
    updateTransitionPhase("covering");
    navigationTimerRef.current = setTimeout(() => {
      router.push(`${url.pathname}${url.search}${url.hash}`);
    }, 500);
  };

  const toggleMenu = () => {
    setMenuOpen((open) => {
      const next = !open;
      document.body.classList.toggle("menu-open", next);
      return next;
    });
  };

  const headerOnDark = (pathname === "/studio" || darkFirstSection) && !scrolled;

  return (
    <div onClickCapture={navigate}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true"><span className="scroll-progress-bar" /></div>
      <div className={`site-loader ${loading ? "" : "is-done"}`} aria-hidden="true">
        <div className="loader-grid" />
        <div className="loader-inner">
          <div className="loader-top">
            <span>DevTork® / Digital Studio</span>
            <span className="loader-stage">{progress < 31 ? "Strategy" : progress < 68 ? "Design" : progress < 94 ? "Build" : "Ready"}</span>
          </div>
          <div className="loader-core">
            <div className="loader-orbit"><span className="loader-mark" /></div>
            <div className="loader-count"><span className="loader-number">{String(progress).padStart(2, "0")}</span><small>%</small></div>
          </div>
          <div className="loader-line"><span className="loader-progress" style={{ width: `${progress}%` }} /></div>
          <div className="loader-copy"><span>Shaping a clear first impression</span><span>Loading the experience</span></div>
        </div>
      </div>
      <div className={`page-wipe is-${transitionPhase}`} aria-hidden="true"><span className="page-wipe-mark" /></div>
      <div className="cursor" aria-hidden="true" /><div className="cursor-dot" aria-hidden="true" />

      <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${headerOnDark ? "on-dark" : ""}`}>
        <div className="header-inner">
          <Brand />
          <nav className="nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} aria-current={pathname.startsWith(item.href) ? "page" : undefined}>
                <span className="nav-index" aria-hidden="true">{item.index}</span>
                <span className="nav-label" data-label={item.label}><span>{item.label}</span></span>
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link className="header-cta" data-magnetic href="/contact"><span>Let&apos;s talk</span><b aria-hidden="true">↗</b></Link>
            <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={toggleMenu}><span /><span /></button>
          </div>
        </div>
      </header>

      <div className="mobile-menu" aria-hidden={!menuOpen}>
        <div className="mobile-menu-label">Explore DevTork</div>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => <Link key={item.href} href={item.href}><small>{item.index}</small><span>{item.label}</span><b aria-hidden="true">↗</b></Link>)}
          <Link href="/contact"><small>05</small><span>Start a project</span><b aria-hidden="true">↗</b></Link>
        </nav>
        <div className="mobile-menu-bottom"><span>Bangladesh</span><a href="mailto:hello@devtork.studio">hello@devtork.studio</a></div>
      </div>

      <main key={pathname} id="main" className="page-enter">{children}</main>
      <Footer />
    </div>
  );
}
