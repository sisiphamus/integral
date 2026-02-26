"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── Easing presets ───────────────────────────────────── */
const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/* ── Footer slide-up variant ──────────────────────────── */
const footerVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: EASE_SMOOTH,
    },
  },
};

/* ── Link column data ─────────────────────────────────── */
const LINK_COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Overview", href: "#overview" },
      { label: "Technology", href: "#technology" },
      { label: "Specs", href: "#specs" },
      { label: "Gallery", href: "#gallery" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Press", href: "#press" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
      { label: "Accessibility", href: "#accessibility" },
      { label: "Patents", href: "#patents" },
    ],
  },
];

/* ── FooterLink sub-component ─────────────────────────── */
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <a
      href={href}
      style={{
        color: "#666666",
        textDecoration: "none",
        fontSize: "0.875rem",
        lineHeight: 1.8,
        fontWeight: 400,
        transition: "opacity 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.opacity = "0.6";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
      }}
    >
      {children}
    </a>
  );
}

/* ── Main Component ───────────────────────────────────── */
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, {
    once: true,
    amount: 0.15,
  });

  return (
    <motion.footer
      ref={footerRef}
      variants={footerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        background: "#0A0A0A",
        padding: "80px clamp(1.5rem, 5vw, 5rem) 48px",
        fontFamily: "var(--font-inter), sans-serif",
      }}
    >
      {/* ── 4-column grid ─────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "48px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* ── Column 1: Brand ─────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#ffffff",
            }}
          >
            INTEGRAL
          </span>
          <span
            style={{
              fontSize: "0.85rem",
              fontWeight: 400,
              color: "#666666",
              lineHeight: 1.5,
            }}
          >
            Spatial computing, refined.
          </span>
        </div>

        {/* ── Columns 2-4: Link groups ────────────────── */}
        {LINK_COLUMNS.map((column) => (
          <div
            key={column.heading}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#999999",
                marginBottom: "8px",
              }}
            >
              {column.heading}
            </span>
            {column.links.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>
        ))}
      </div>

      {/* ── Horizontal rule ───────────────────────────── */}
      <hr
        style={{
          border: "none",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          maxWidth: "1200px",
          margin: "64px auto 32px",
        }}
      />

      {/* ── Bottom bar ────────────────────────────────── */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontSize: "0.8rem",
            fontWeight: 400,
            color: "#666666",
            letterSpacing: "0.01em",
          }}
        >
          2026 Integral Technologies, Inc.
        </span>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 400,
            color: "#444444",
            letterSpacing: "0.01em",
          }}
        >
          Designed in San Francisco. Assembled with precision.
        </span>
      </div>
    </motion.footer>
  );
}
