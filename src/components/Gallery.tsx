"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

/* ── Easing presets ───────────────────────────────────── */
const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/* ── Gallery item data ────────────────────────────────── */
interface GalleryItem {
  caption: string;
  aspect: "landscape" | "portrait" | "square";
  src: string;
  rowSpan: number;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    caption: "Integral in Tokyo",
    aspect: "landscape",
    src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=85&auto=format&fit=crop",
    rowSpan: 2,
  },
  {
    caption: "Studio session",
    aspect: "portrait",
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=85&auto=format&fit=crop",
    rowSpan: 4,
  },
  {
    caption: "Morning commute",
    aspect: "square",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85&auto=format&fit=crop",
    rowSpan: 3,
  },
  {
    caption: "Workspace view",
    aspect: "landscape",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85&auto=format&fit=crop",
    rowSpan: 2,
  },
  {
    caption: "Night walk",
    aspect: "portrait",
    src: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800&q=85&auto=format&fit=crop",
    rowSpan: 4,
  },
  {
    caption: "Detail view",
    aspect: "square",
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=85&auto=format&fit=crop",
    rowSpan: 3,
  },
];

/* ── Aspect ratio padding (for intrinsic sizing) ──────── */
const ASPECT_PADDING: Record<GalleryItem["aspect"], string> = {
  landscape: "56.25%", /* 16:9 */
  portrait: "177.78%", /* 9:16 */
  square: "100%",      /* 1:1  */
};

/* ── Single gallery card ─────────────────────────────── */
function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.95 }
      }
      transition={{
        duration: 0.85,
        delay: index * 0.1,
        ease: EASE_SMOOTH,
      }}
      style={{
        gridRow: `span ${item.rowSpan}`,
      }}
    >
      {/* ── Image ──────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: ASPECT_PADDING[item.aspect],
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.45, ease: EASE_SMOOTH }}
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          <Image
            src={item.src}
            alt={item.caption}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </motion.div>
      </div>

      {/* ── Caption ──────────────────────────────────── */}
      <p
        style={{
          fontSize: "var(--text-small)",
          color: "var(--foreground-muted)",
          marginTop: "0.75rem",
          fontWeight: 400,
          lineHeight: 1.4,
        }}
      >
        {item.caption}
      </p>
    </motion.div>
  );
}

/* ── Main Gallery section ────────────────────────────── */
export default function Gallery() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-40px 0px" });

  return (
    <section
      id="gallery"
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
            margin: "0 0 var(--space-xl) 0",
            color: "var(--foreground)",
          }}
        >
          Gallery
        </motion.h2>
      </div>

      {/* ── Masonry grid ─────────────────────────────── */}
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "60px",
            gap: "1.5rem",
          }}
        >
          {GALLERY_ITEMS.map((item, i) => (
            <GalleryCard key={item.caption} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
