"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

/* ─── Animation Variants ──────────────────────────────────── */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const productVisualVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 48,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const scrollIndicatorVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 1.8,
      ease: "easeOut",
    },
  },
};

/* ─── Component ───────────────────────────────────────────── */

export default function Hero() {
  return (
    <section className="relative bg-white">
      {/* ── Main Hero Area ── */}
      <motion.div
        className="min-h-screen flex flex-col justify-center"
        style={{ paddingTop: "clamp(6rem, 12vh, 10rem)" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container-grid items-start">
          {/* ── Text Column ── */}
          <div
            className="flex flex-col gap-8"
            style={{
              gridColumn: "1 / -1",
              paddingBottom: "clamp(3rem, 6vh, 5rem)",
            }}
          >
            {/* Display Heading */}
            <motion.h1
              className="text-display font-light select-none"
              style={{
                fontSize: "clamp(4rem, 12vw, 11rem)",
                lineHeight: 0.88,
                letterSpacing: "-0.05em",
                fontWeight: 200,
              }}
              variants={fadeUpVariants}
            >
              <span className="block">INTE</span>
              <span className="block" style={{ paddingLeft: "0.04em" }}>
                GRAL
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="font-light"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                color: "var(--foreground-muted)",
                maxWidth: "20ch",
              }}
              variants={fadeUpVariants}
            >
              See beyond.
            </motion.p>

            {/* Description */}
            <motion.p
              style={{
                fontSize: "clamp(0.95rem, 1.2vw, 1.125rem)",
                lineHeight: 1.65,
                color: "var(--foreground-muted)",
                maxWidth: "42ch",
              }}
              variants={fadeUpVariants}
            >
              Spatial computing, refined. The world&rsquo;s lightest AR glasses
              with holographic optics and all-day comfort.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={fadeUpVariants}>
              <motion.button
                className="relative cursor-pointer select-none overflow-hidden"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "3.25rem",
                  paddingLeft: "2.5rem",
                  paddingRight: "2.5rem",
                  borderRadius: "9999px",
                  backgroundColor: "var(--foreground)",
                  color: "#ffffff",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  border: "none",
                }}
                whileHover={{
                  scale: 1.04,
                  backgroundColor: "#2a2a2a",
                }}
                whileTap={{
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.25,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                Pre-order
              </motion.button>
            </motion.div>
          </div>

          {/* ── Product Visual Placeholder ── */}
          <motion.div
            style={{
              gridColumn: "1 / -1",
              paddingBottom: "clamp(2rem, 4vh, 4rem)",
            }}
            variants={productVisualVariants}
          >
            <div
              className="relative mx-auto w-full"
              style={{ maxWidth: "800px" }}
            >
              <div
                className="relative overflow-hidden"
                style={{
                  width: "100%",
                  aspectRatio: "800 / 500",
                  borderRadius: "2px",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=1600&q=90&auto=format&fit=crop"
                  alt="Integral AR glasses"
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="w-full"
        style={{
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
          paddingBottom: "clamp(2rem, 4vh, 3rem)",
        }}
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          className="relative flex items-center justify-center"
          style={{ maxWidth: "1440px", margin: "0 auto" }}
        >
          {/* Rule line */}
          <div
            className="w-full"
            style={{
              height: "1px",
              backgroundColor: "var(--border)",
            }}
          />

          {/* Centered label */}
          <span
            className="absolute select-none whitespace-nowrap bg-white"
            style={{
              fontSize: "var(--text-label)",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--foreground-subtle)",
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
            }}
          >
            Scroll to explore
          </span>
        </div>
      </motion.div>
    </section>
  );
}
