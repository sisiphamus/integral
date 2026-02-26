"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ── Easing presets ───────────────────────────────────── */
const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/* ── Word-by-word reveal variants ─────────────────────── */
const headingContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: EASE_SMOOTH,
    },
  },
};

/* ── Fade-up variant ──────────────────────────────────── */
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE_SMOOTH,
      delay,
    },
  }),
};

/* ── Section fade variant ─────────────────────────────── */
const sectionVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: EASE_SMOOTH,
    },
  },
};

/* ── Pill Button sub-component ────────────────────────── */
interface PillButtonProps {
  children: React.ReactNode;
  variant: "filled" | "outlined";
  href?: string;
}

function PillButton({ children, variant, href = "#" }: PillButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isFilled = variant === "filled";

  const baseStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px 40px",
    borderRadius: "999px",
    fontSize: "0.9rem",
    fontWeight: 500,
    letterSpacing: "0.02em",
    textDecoration: "none",
    cursor: "pointer",
    border: isFilled ? "2px solid #ffffff" : "2px solid #ffffff",
    transition:
      "background 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94), color 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    fontFamily: "var(--font-inter), sans-serif",
  };

  const filledStyles: React.CSSProperties = {
    background: isHovered ? "#e0e0e0" : "#ffffff",
    color: "#0A0A0A",
    transform: isHovered ? "scale(1.04)" : "scale(1)",
  };

  const outlinedStyles: React.CSSProperties = {
    background: isHovered ? "#ffffff" : "transparent",
    color: isHovered ? "#0A0A0A" : "#ffffff",
    transform: isHovered ? "scale(1.04)" : "scale(1)",
  };

  return (
    <a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...baseStyles,
        ...(isFilled ? filledStyles : outlinedStyles),
      }}
    >
      {children}
    </a>
  );
}

/* ── Main Component ───────────────────────────────────── */
export default function PreOrder() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  });

  const headingText = "Ready to see beyond?";
  const words = headingText.split(" ");

  return (
    <motion.section
      id="preorder"
      ref={sectionRef}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        background: "#0A0A0A",
        padding: "220px clamp(1.5rem, 5vw, 5rem)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: "var(--font-inter), sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ── Heading: word-by-word reveal ───────────────── */}
      <motion.h2
        variants={headingContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          fontWeight: 300,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: "#ffffff",
          margin: 0,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0 0.3em",
        }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            style={{
              display: "inline-block",
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>

      {/* ── Subtext ───────────────────────────────────── */}
      <motion.p
        variants={fadeUp}
        custom={0.7}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
          fontWeight: 400,
          lineHeight: 1.6,
          color: "#999999",
          margin: "32px 0 0 0",
          maxWidth: "520px",
          letterSpacing: "0.01em",
        }}
      >
        Pre-order Integral. Starting at $1,299. Ships Q3 2026.
      </motion.p>

      {/* ── Buttons ───────────────────────────────────── */}
      <motion.div
        variants={fadeUp}
        custom={1.0}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          display: "flex",
          gap: "16px",
          marginTop: "48px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <PillButton variant="filled" href="#preorder">
          Pre-order now
        </PillButton>
        <PillButton variant="outlined" href="#demo">
          Book a demo
        </PillButton>
      </motion.div>

      {/* ── Fine print ────────────────────────────────── */}
      <motion.p
        variants={fadeUp}
        custom={1.3}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          fontSize: "0.8rem",
          fontWeight: 400,
          color: "#555555",
          marginTop: "40px",
          letterSpacing: "0.02em",
        }}
      >
        Free shipping. 30-day returns. 2-year warranty.
      </motion.p>
    </motion.section>
  );
}
