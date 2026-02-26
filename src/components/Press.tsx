"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── Easing presets ───────────────────────────────────── */
const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/* ── Quote data ───────────────────────────────────────── */
interface PressQuote {
  text: string;
  source: string;
  align: "left" | "center" | "right";
  size: "large" | "medium" | "small";
  maxWidth: string;
}

const QUOTES: PressQuote[] = [
  {
    text: "\u201CThe most refined AR experience we\u2019ve ever tested.\u201D",
    source: "The Verge",
    align: "left",
    size: "large",
    maxWidth: "720px",
  },
  {
    text: "\u201CIntegral doesn\u2019t just compete with Vision Pro. It makes it feel heavy.\u201D",
    source: "Wired",
    align: "right",
    size: "medium",
    maxWidth: "640px",
  },
  {
    text: "\u201CThis is what the future was supposed to look like.\u201D",
    source: "Bloomberg",
    align: "center",
    size: "large",
    maxWidth: "680px",
  },
  {
    text: "\u201C36 grams. 18 hours. No compromises.\u201D",
    source: "TechCrunch",
    align: "left",
    size: "small",
    maxWidth: "480px",
  },
  {
    text: "\u201CThe first AR glasses you\u2019d actually want to wear every day.\u201D",
    source: "Engadget",
    align: "right",
    size: "medium",
    maxWidth: "600px",
  },
];

/* ── Font size mapping ────────────────────────────────── */
const SIZE_MAP: Record<PressQuote["size"], string> = {
  large: "clamp(2rem, 4.5vw, 3.5rem)",
  medium: "clamp(1.6rem, 3.5vw, 2.75rem)",
  small: "clamp(1.35rem, 2.8vw, 2.25rem)",
};

/* ── Alignment mapping for flexbox ────────────────────── */
const ALIGN_MAP: Record<PressQuote["align"], string> = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

/* ── Text alignment mapping ───────────────────────────── */
const TEXT_ALIGN_MAP: Record<PressQuote["align"], "left" | "center" | "right"> = {
  left: "left",
  center: "center",
  right: "right",
};

/* ── Single quote block ──────────────────────────────── */
function QuoteBlock({ quote, index }: { quote: PressQuote; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: EASE_SMOOTH,
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: ALIGN_MAP[quote.align],
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: quote.maxWidth,
          textAlign: TEXT_ALIGN_MAP[quote.align],
        }}
      >
        {/* ── Quote text ─────────────────────────────── */}
        <p
          style={{
            fontSize: SIZE_MAP[quote.size],
            fontStyle: "italic",
            fontWeight: 300,
            lineHeight: 1.25,
            letterSpacing: "-0.015em",
            color: "var(--foreground)",
            margin: 0,
          }}
        >
          {quote.text}
        </p>

        {/* ── Attribution ────────────────────────────── */}
        <p
          style={{
            fontSize: "var(--text-label)",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--foreground-muted)",
            marginTop: "1.25rem",
            fontStyle: "normal",
          }}
        >
          {quote.source}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Main Press section ──────────────────────────────── */
export default function Press() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-40px 0px" });

  return (
    <section
      id="press"
      style={{
        paddingTop: "var(--space-2xl)",
        paddingBottom: "var(--space-2xl)",
        overflow: "hidden",
      }}
    >
      {/* ── Top border rule ──────────────────────────── */}
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        <hr
          style={{
            border: "none",
            borderTop: "1px solid var(--border)",
            margin: "0 0 var(--space-2xl) 0",
          }}
        />
      </div>

      {/* ── Section heading ──────────────────────────── */}
      <div
        ref={headingRef}
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: EASE_SMOOTH }}
          style={{
            fontSize: "var(--text-headline)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            margin: "0 0 var(--space-3xl) 0",
            color: "var(--foreground)",
          }}
        >
          Press
        </motion.h2>
      </div>

      {/* ── Quotes ───────────────────────────────────── */}
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 5rem)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(5rem, 8vw, 7.5rem)",
        }}
      >
        {QUOTES.map((quote, i) => (
          <QuoteBlock key={quote.source} quote={quote} index={i} />
        ))}
      </div>
    </section>
  );
}
