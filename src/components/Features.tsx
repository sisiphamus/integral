"use client";

import { motion } from "framer-motion";

/* ── Feature data ──────────────────────────────────────────── */

interface Feature {
  number: string;
  title: string;
  description: string;
  size: "large" | "medium" | "full";
}

const FEATURES: Feature[] = [
  {
    number: "01",
    title: "Holographic Optics",
    description:
      "Waveguide display with 52-degree field of view. 4K resolution per eye. Colors so vivid they feel real.",
    size: "large",
  },
  {
    number: "02",
    title: "36g Frame",
    description:
      "Titanium-carbon composite. The lightest AR glasses ever made. Wear them and forget they\u2019re there.",
    size: "medium",
  },
  {
    number: "03",
    title: "Spatial Audio",
    description:
      "Directional speakers create private soundscapes. No one around you hears a thing.",
    size: "medium",
  },
  {
    number: "04",
    title: "Neural Interface",
    description:
      "EMG sensors in the temple arms detect micro-gestures. Think it, do it.",
    size: "full",
  },
  {
    number: "05",
    title: "All-Day Battery",
    description:
      "18 hours of mixed use. Graphene-enhanced cells charge to 80% in 12 minutes.",
    size: "medium",
  },
  {
    number: "06",
    title: "Privacy First",
    description:
      "Hardware camera shutters. On-device processing. Your data never leaves the frame.",
    size: "medium",
  },
];

/* ── Easing presets (matching Navigation) ──────────────────── */

const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/* ── Cell animation variants ──────────────────────────────── */

const cellVariants = {
  hidden: {
    opacity: 0,
    y: 48,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE_SMOOTH,
      delay: i * 0.12,
    },
  }),
};

/* ── Grid area mappings ───────────────────────────────────── */

/*
  Desktop layout (6-column editorial grid):

  Row 1:  [ Holographic Optics (cols 1-4) ] [ 36g Frame (cols 5-6) ]
  Row 2:  [ Spatial Audio (cols 1-2)       ] [ Neural Interface (cols 3-6) ]
  Row 3:  [ All-Day Battery (cols 1-3)     ] [ Privacy First (cols 4-6)   ]

  This creates asymmetry: no two rows share the same column split pattern.
*/

function getCellGridStyles(index: number): React.CSSProperties {
  const areas: React.CSSProperties[] = [
    /* 01 — Holographic Optics: large, spans cols 1-4 */
    { gridColumn: "1 / 5", gridRow: "1 / 2" },
    /* 02 — 36g Frame: medium, cols 5-6 */
    { gridColumn: "5 / 7", gridRow: "1 / 2" },
    /* 03 — Spatial Audio: medium, cols 1-2 */
    { gridColumn: "1 / 3", gridRow: "2 / 3" },
    /* 04 — Neural Interface: large, cols 3-6 */
    { gridColumn: "3 / 7", gridRow: "2 / 3" },
    /* 05 — All-Day Battery: medium, cols 1-3 */
    { gridColumn: "1 / 4", gridRow: "3 / 4" },
    /* 06 — Privacy First: medium, cols 4-6 */
    { gridColumn: "4 / 7", gridRow: "3 / 4" },
  ];
  return areas[index] ?? {};
}

/* ── Component ────────────────────────────────────────────── */

export default function Features() {
  return (
    <section
      id="technology"
      style={{
        paddingTop: "var(--space-3xl)",
        paddingBottom: "var(--space-2xl)",
      }}
    >
      {/* ── Section Heading ────────────────────────────── */}
      <div
        style={{
          padding: "0 clamp(1.5rem, 5vw, 5rem)",
          maxWidth: "1440px",
          margin: "0 auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE_SMOOTH }}
          style={{ marginBottom: "var(--space-xl)" }}
        >
          <p
            style={{
              fontSize: "var(--text-label)",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--foreground-subtle)",
              marginBottom: "var(--space-md)",
            }}
          >
            Features / Specs
          </p>
          <h2
            style={{
              fontSize: "var(--text-headline)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "var(--foreground)",
            }}
          >
            Technology
          </h2>
        </motion.div>
      </div>

      {/* ── Editorial Grid ─────────────────────────────── */}
      <div
        style={{
          padding: "0 clamp(1.5rem, 5vw, 5rem)",
          maxWidth: "1440px",
          margin: "0 auto",
        }}
      >
        {/* Desktop grid (6 columns) */}
        <div
          className="features-grid-desktop"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gridTemplateRows: "auto auto auto",
            border: "1px solid var(--border)",
          }}
        >
          {FEATURES.map((feature, index) => (
            <FeatureCell
              key={feature.number}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* ── Responsive style overrides ─────────────────── */}
      <style>{`
        /* Tablet: 2-column grid */
        @media (max-width: 1024px) {
          .features-grid-desktop {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-template-rows: auto auto auto auto !important;
          }
          .features-grid-desktop .feature-cell[data-index="0"] {
            grid-column: 1 / 3 !important;
            grid-row: 1 / 2 !important;
          }
          .features-grid-desktop .feature-cell[data-index="1"] {
            grid-column: 1 / 2 !important;
            grid-row: 2 / 3 !important;
          }
          .features-grid-desktop .feature-cell[data-index="2"] {
            grid-column: 2 / 3 !important;
            grid-row: 2 / 3 !important;
          }
          .features-grid-desktop .feature-cell[data-index="3"] {
            grid-column: 1 / 3 !important;
            grid-row: 3 / 4 !important;
          }
          .features-grid-desktop .feature-cell[data-index="4"] {
            grid-column: 1 / 2 !important;
            grid-row: 4 / 5 !important;
          }
          .features-grid-desktop .feature-cell[data-index="5"] {
            grid-column: 2 / 3 !important;
            grid-row: 4 / 5 !important;
          }
        }

        /* Mobile: single column */
        @media (max-width: 640px) {
          .features-grid-desktop {
            grid-template-columns: 1fr !important;
            grid-template-rows: repeat(6, auto) !important;
          }
          .features-grid-desktop .feature-cell {
            grid-column: 1 / -1 !important;
            grid-row: auto !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ── Feature Cell ─────────────────────────────────────────── */

interface FeatureCellProps {
  feature: Feature;
  index: number;
}

function FeatureCell({ feature, index }: FeatureCellProps) {
  const isLarge = feature.size === "large" || feature.size === "full";

  /* Alternate background */
  const bg = index % 2 === 0 ? "#FFFFFF" : "#FAFAFA";

  /* Sizing proportions — larger cells get more generous spacing */
  const padding = isLarge
    ? "clamp(2.5rem, 4vw, 4rem)"
    : "clamp(2rem, 3vw, 3rem)";

  const titleSize = isLarge
    ? "clamp(1.75rem, 3vw, 2.75rem)"
    : "clamp(1.25rem, 2vw, 1.75rem)";

  const descSize = isLarge ? "1.0625rem" : "0.9375rem";

  const descMaxWidth = isLarge ? "520px" : "360px";

  return (
    <motion.div
      className="feature-cell"
      data-index={index}
      custom={index}
      variants={cellVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      style={{
        ...getCellGridStyles(index),
        background: bg,
        padding,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: isLarge ? "2.5rem" : "1.75rem",
        minHeight: isLarge ? "340px" : "280px",
        borderRight: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
      }}
    >
      {/* Number indicator */}
      <span
        style={{
          fontFamily: "ui-monospace, 'SF Mono', 'Cascadia Code', 'Segoe UI Mono', Consolas, monospace",
          fontSize: "0.6875rem",
          fontWeight: 400,
          letterSpacing: "0.06em",
          color: "var(--foreground-subtle)",
          lineHeight: 1,
        }}
      >
        {feature.number}
      </span>

      {/* Content block */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: isLarge ? "1.25rem" : "0.875rem",
          marginTop: "auto",
        }}
      >
        {/* Feature name */}
        <h3
          style={{
            fontSize: titleSize,
            fontWeight: 500,
            letterSpacing: "-0.015em",
            lineHeight: 1.15,
            color: "var(--foreground)",
          }}
        >
          {feature.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: descSize,
            fontWeight: 300,
            lineHeight: 1.65,
            color: "var(--foreground-muted)",
            maxWidth: descMaxWidth,
          }}
        >
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}
