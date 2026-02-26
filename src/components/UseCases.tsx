"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

/* ─── Data ─────────────────────────────────────────────── */

interface UseCase {
  title: string;
  description: string;
  src: string;
}

const useCases: UseCase[] = [
  {
    title: "Navigate",
    description:
      "Turn-by-turn directions overlaid on the real world. Never look down at your phone again.",
    src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=85&auto=format&fit=crop",
  },
  {
    title: "Create",
    description:
      "Design in three dimensions. Sculpt, sketch, and prototype in the space around you.",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=85&auto=format&fit=crop",
  },
  {
    title: "Connect",
    description:
      "Holographic video calls that feel like the other person is in the room.",
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=85&auto=format&fit=crop",
  },
  {
    title: "Focus",
    description:
      "Ambient information without distraction. Notifications appear only when you want them.",
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&q=85&auto=format&fit=crop",
  },
];

/* ─── Card Component ───────────────────────────────────── */

function UseCaseCard({
  useCase,
  index,
}: {
  useCase: UseCase;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 80 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="use-case-card"
    >
      {/* Image — 16:10 aspect ratio */}
      <div
        className="use-case-image"
        style={{ aspectRatio: "16 / 10", position: "relative" }}
      >
        <Image
          src={useCase.src}
          alt={useCase.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 560px"
        />
      </div>

      {/* Text content */}
      <div className="use-case-text">
        <h3 className="use-case-title">{useCase.title}</h3>
        <p className="use-case-description">{useCase.description}</p>
      </div>
    </motion.div>
  );
}

/* ─── Progress Indicator ───────────────────────────────── */

function ScrollProgress({
  progress,
  total,
}: {
  progress: number;
  total: number;
}) {
  return (
    <div className="scroll-progress" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="scroll-dot"
          style={{
            backgroundColor:
              i <= Math.round(progress * (total - 1))
                ? "var(--foreground)"
                : "var(--border-strong)",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Section Component ────────────────────────────────── */

export default function UseCases() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  /* Detect mobile vs desktop */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Track horizontal scroll progress */
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }
    setScrollProgress(el.scrollLeft / maxScroll);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isMobile) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, [isMobile, handleScroll]);

  return (
    <section className="use-cases-section">
      {/* Section heading */}
      <div className="use-cases-header">
        <span className="text-label" style={{ color: "var(--foreground-muted)" }}>
          Use Cases
        </span>
        <h2 className="use-cases-heading">Experience</h2>
      </div>

      {/* Cards — horizontal scroll on desktop, vertical stack on mobile */}
      {isMobile ? (
        <div className="use-cases-stack">
          {useCases.map((uc, i) => (
            <UseCaseCard key={uc.title} useCase={uc} index={i} />
          ))}
        </div>
      ) : (
        <>
          <div ref={scrollRef} className="use-cases-scroll">
            {useCases.map((uc, i) => (
              <UseCaseCard key={uc.title} useCase={uc} index={i} />
            ))}
          </div>
          <ScrollProgress progress={scrollProgress} total={useCases.length} />
        </>
      )}

      {/* ─── Scoped Styles ───────────────────────────────── */}
      <style jsx global>{`
        /* ── Section ──────────────────────────────────────── */
        .use-cases-section {
          padding: var(--space-2xl) 0 var(--space-3xl);
          overflow: hidden;
          background: var(--background);
        }

        /* ── Header ──────────────────────────────────────── */
        .use-cases-header {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 5vw, 5rem);
          margin-bottom: var(--space-2xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .use-cases-heading {
          font-size: var(--text-headline);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--foreground);
          margin: 0;
        }

        /* ── Horizontal Scroll Track (desktop) ───────────── */
        .use-cases-scroll {
          display: flex;
          gap: clamp(1.5rem, 3vw, 2.5rem);
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding: 0 clamp(1.5rem, 5vw, 5rem);
          padding-bottom: var(--space-lg);

          /* Hide scrollbar but keep functionality */
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .use-cases-scroll::-webkit-scrollbar {
          display: none;
        }

        /* ── Vertical Stack (mobile) ─────────────────────── */
        .use-cases-stack {
          display: flex;
          flex-direction: column;
          gap: var(--space-xl);
          padding: 0 clamp(1.5rem, 5vw, 5rem);
        }

        /* ── Card ────────────────────────────────────────── */
        .use-case-card {
          flex: 0 0 auto;
          width: clamp(320px, 42vw, 560px);
          scroll-snap-align: start;
        }

        /* On mobile, cards take full width */
        .use-cases-stack .use-case-card {
          width: 100%;
        }

        /* ── Image Placeholder ───────────────────────────── */
        .use-case-image {
          width: 100%;
          border-radius: 2px;
          background: linear-gradient(
            145deg,
            #e8e8e8 0%,
            #d4d4d4 35%,
            #c0c0c0 65%,
            #b0b0b0 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .use-case-image img {
          display: block;
        }

        /* ── Text Area ───────────────────────────────────── */
        .use-case-text {
          padding-top: var(--space-lg);
        }

        .use-case-title {
          font-size: var(--text-subhead);
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: var(--foreground);
          margin: 0 0 var(--space-sm) 0;
        }

        .use-case-description {
          font-size: var(--text-body);
          font-weight: 400;
          line-height: 1.65;
          color: var(--foreground-muted);
          margin: 0;
          max-width: 38ch;
        }

        /* ── Scroll Progress Dots ────────────────────────── */
        .scroll-progress {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding-top: var(--space-lg);
        }

        .scroll-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          transition: background-color var(--duration-base) var(--ease-smooth);
        }

        /* ── Responsive ──────────────────────────────────── */
        @media (max-width: 767px) {
          .use-cases-section {
            padding: var(--space-xl) 0 var(--space-2xl);
          }

          .use-cases-header {
            margin-bottom: var(--space-xl);
          }

          .use-case-description {
            max-width: none;
          }
        }
      `}</style>
    </section>
  );
}
