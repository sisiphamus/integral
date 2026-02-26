"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Technology", href: "#technology" },
  { label: "Experience", href: "#experience" },
  { label: "Pre-order", href: "#preorder" },
];

/* ── Easing presets ───────────────────────────────────── */
const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const EASE_SHARP: [number, number, number, number] = [0.4, 0.0, 0.2, 1];

/* ── Overlay animation variants ──────────────────────── */
const overlayVariants = {
  hidden: {
    clipPath: "inset(0 0 100% 0)",
    transition: {
      duration: 0.6,
      ease: EASE_SHARP,
    },
  },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 0.65,
      ease: EASE_SMOOTH,
    },
  },
};

/* ── Nav link stagger variants ────────────────────────── */
const linkListVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const linkItemVariants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_SMOOTH,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: {
      duration: 0.25,
      ease: EASE_SHARP,
    },
  },
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  /* ── Scroll detection ─────────────────────────────── */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Lock body scroll when menu is open ───────────── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* ── Fixed Top Bar ─────────────────────────────── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: `background ${250}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
                       backdrop-filter ${250}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
                       border-color ${250}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
          background: isScrolled && !isOpen
            ? "rgba(255, 255, 255, 0.85)"
            : "transparent",
          backdropFilter: isScrolled && !isOpen ? "blur(16px) saturate(180%)" : "none",
          WebkitBackdropFilter: isScrolled && !isOpen ? "blur(16px) saturate(180%)" : "none",
          borderBottom: isScrolled && !isOpen
            ? "1px solid rgba(232, 232, 232, 0.8)"
            : "1px solid transparent",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 clamp(1.5rem, 5vw, 5rem)",
            height: "72px",
          }}
        >
          {/* ── Brand Name ──────────────────────────── */}
          <a
            href="/"
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#0a0a0a",
              textDecoration: "none",
              zIndex: 110,
              position: "relative",
            }}
          >
            INTEGRAL
          </a>

          {/* ── Hamburger Button ────────────────────── */}
          <button
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-end",
              gap: "6px",
              width: "40px",
              height: "40px",
              zIndex: 110,
              position: "relative",
            }}
          >
            {/* Top line */}
            <motion.div
              animate={
                isOpen
                  ? { rotate: 45, y: 5, width: "24px" }
                  : { rotate: 0, y: 0, width: "24px" }
              }
              transition={{ duration: 0.35, ease: EASE_SMOOTH }}
              style={{
                height: "1.5px",
                background: "#0a0a0a",
                borderRadius: "1px",
                transformOrigin: "center",
              }}
            />
            {/* Bottom line */}
            <motion.div
              animate={
                isOpen
                  ? { rotate: -45, y: -5, width: "24px" }
                  : { rotate: 0, y: 0, width: "16px" }
              }
              transition={{ duration: 0.35, ease: EASE_SMOOTH }}
              style={{
                height: "1.5px",
                background: "#0a0a0a",
                borderRadius: "1px",
                transformOrigin: "center",
              }}
            />
          </button>
        </div>
      </header>

      {/* ── Full-screen Overlay ───────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="nav-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 90,
              background: "#ffffff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* ── Nav Links ─────────────────────────── */}
            <motion.nav
              variants={linkListVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "clamp(1.5rem, 3vw, 2.5rem)",
              }}
            >
              {NAV_LINKS.map((link) => (
                <motion.div key={link.label} variants={linkItemVariants}>
                  <NavLink href={link.href} onClick={handleLinkClick}>
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </motion.nav>

            {/* ── Subtle Footer Info ─────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              style={{
                position: "absolute",
                bottom: "clamp(2rem, 5vw, 4rem)",
                display: "flex",
                gap: "3rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#b0b0b0",
                  fontWeight: 500,
                }}
              >
                2026 Collection
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#b0b0b0",
                  fontWeight: 500,
                }}
              >
                Integral Corp.
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── NavLink sub-component ────────────────────────────────── */
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function NavLink({ href, children, onClick }: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
        fontWeight: 300,
        letterSpacing: "-0.02em",
        color: "#0a0a0a",
        textDecoration: "none",
        lineHeight: 1,
        display: "inline-block",
        transition: "color 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {children}

      {/* Underline slide-in from left */}
      <motion.span
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: "absolute",
          bottom: "-4px",
          left: 0,
          right: 0,
          height: "1.5px",
          background: "#0a0a0a",
          transformOrigin: "left center",
          display: "block",
        }}
      />
    </a>
  );
}
