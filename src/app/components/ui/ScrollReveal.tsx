import { motion } from "motion/react";
import type { ReactNode } from "react";
import { isCapture } from "./captureMode";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
  amount = 0.2,
}: ScrollRevealProps) {
  if (isCapture) {
    return <div className={className}>{children}</div>;
  }

  const directionMap = {
    up: { y: 8, x: 0 },
    down: { y: -8, x: 0 },
    left: { x: 24, y: 0 },
    right: { x: -24, y: 0 },
    none: { x: 0, y: 0 },
  };

  const { x, y } = directionMap[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Section Divider — hairline draws in on scroll ── */
interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className = "" }: SectionDividerProps) {
  if (isCapture) {
    return (
      <div className={`mx-auto ${className}`} style={{ maxWidth: 120 }}>
        <div className="h-px bg-[#0E39A9]/15" />
      </div>
    );
  }

  return (
    <motion.div
      className={`mx-auto ${className}`}
      style={{ maxWidth: 120 }}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="h-px bg-[#0E39A9]/15" />
    </motion.div>
  );
}