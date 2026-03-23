import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

interface CountUpProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function CountUp({
  end,
  prefix = "",
  suffix = "",
  duration = 1.8,
  decimals = 0,
  className = "",
  style,
}: CountUpProps) {
  const [value, setValue] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasTriggered]);

  useEffect(() => {
    if (!hasTriggered) return;

    const steps = Math.ceil(duration * 60); // ~60fps
    const increment = end / steps;
    let current = 0;
    let frame = 0;

    const animate = () => {
      frame++;
      // Ease out cubic
      const t = Math.min(frame / steps, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      current = eased * end;
      setValue(current);

      if (frame < steps) {
        requestAnimationFrame(animate);
      } else {
        setValue(end);
      }
    };

    requestAnimationFrame(animate);
  }, [hasTriggered, end, duration]);

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {prefix}{display}{suffix}
    </span>
  );
}

/* ── Metric Tile with sparkline background ── */
interface MetricTileProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sparkData?: number[];
}

export function MetricTile({ value, prefix = "", suffix = "", label, sparkData }: MetricTileProps) {
  const defaultSparkData = Array.from({ length: 20 }, (_, i) => {
    const progress = i / 19;
    return 20 + progress * 60 + Math.sin(progress * Math.PI * 3) * 10 + Math.random() * 8;
  });

  const data = sparkData || defaultSparkData;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 200;
      const y = 40 - ((v - min) / range) * 36;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <motion.div
      className="relative bg-white rounded-2xl border border-[#f0f0f0] p-5 md:p-6 overflow-hidden group hover:border-[#0E39A9]/15 transition-colors h-full flex flex-col justify-end"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Sparkline background */}
      <svg
        viewBox="0 0 200 40"
        className="absolute bottom-0 left-0 right-0 w-full h-12 opacity-[0.06] group-hover:opacity-[0.1] transition-opacity"
        preserveAspectRatio="none"
      >
        <polyline
          points={points}
          fill="none"
          stroke="#0E39A9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="relative mt-auto">
        <CountUp
          end={value}
          prefix={prefix}
          suffix={suffix}
          className="text-[#111827] block mb-1"
          style={{ fontSize: "clamp(1.375rem, 3vw, 1.75rem)", fontWeight: 600 }}
        />
        <p className="text-[11px] text-[#4B5563] leading-snug" style={{ fontWeight: 500 }}>
          {label}
        </p>
      </div>
    </motion.div>
  );
}