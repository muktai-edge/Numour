import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence, useInView } from "motion/react";
import { Play, Pause, ChevronDown, Info, Layers, Timer, Target } from "lucide-react";
import { ScrollReveal, SectionDivider } from "../components/ui/ScrollReveal";
import { ChapterProgress } from "../components/ui/ChapterProgress";

const demoChapters = [
  { id: "demo-chapter", number: "01", label: "Chapter Indicator" },
  { id: "demo-linedraw", number: "02", label: "Line Draw" },
  { id: "demo-depth", number: "03", label: "Depth Strips" },
  { id: "demo-blur", number: "04", label: "Hotspot Blur" },
  { id: "demo-timer", number: "05", label: "Timer Ring" },
  { id: "demo-parallax", number: "06", label: "Parallax" },
];

export function MotionDemos() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-white">
      <ChapterProgress chapters={demoChapters} />

      {/* Hero */}
      <section className="py-20 md:py-28 bg-[#FAFAFA]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#0E39A9]" />
              <span className="text-[12px] tracking-[0.3em] uppercase text-[#0E39A9]" style={{ fontWeight: 600 }}>
                Engineering
              </span>
            </div>
            <h1
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.04em" }}
            >
              Motion Demos
            </h1>
            <p className="mt-3 text-[#4B5563] max-w-md" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
              Interactive demonstrations of the animation system powering the Numour experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Demo 1: Chapter Indicator */}
      <section id="demo-chapter" className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
              Fig. 01 — Chapter Progress Indicator
            </p>
            <h2 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Table-of-Contents Navigation
            </h2>
            <p className="text-[#4B5563] mb-8" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
              A fixed side rail shows the current chapter (01/10 format) with clickable jump links.
              Active state uses Numour Blue glow. Appears on the right edge of the viewport.
            </p>
          </ScrollReveal>
          <ChapterIndicatorDemo />
        </div>
      </section>

      <SectionDivider className="py-4" />

      {/* Demo 2: Line Draw + Fade-Up */}
      <section id="demo-linedraw" className="py-20 md:py-28 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
              Fig. 02 — Hairline Divider Line-Draw
            </p>
            <h2 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Section Transitions
            </h2>
            <p className="text-[#4B5563] mb-8" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
              Hairline dividers animate from center-out on scroll entry. Combined with fade-up
              reveal for section headings and content blocks.
            </p>
          </ScrollReveal>
          <LineDrawDemo />
        </div>
      </section>

      <SectionDivider className="py-4" />

      {/* Demo 3: 3-Layer Depth Strips */}
      <section id="demo-depth" className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
              Fig. 03 — 3-Layer Depth Strip
            </p>
            <h2 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Skin Layer Visualization
            </h2>
            <p className="text-[#4B5563] mb-8" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
              Three stacked depth strips representing epidermis, dermis, and hypodermis. Toggle
              reveals delivery path animation through each layer.
            </p>
          </ScrollReveal>
          <DepthStripDemo />
        </div>
      </section>

      <SectionDivider className="py-4" />

      {/* Demo 4: Hotspot Blur */}
      <section id="demo-blur" className="py-20 md:py-28 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
              Fig. 04 — Lens-Focus Blur
            </p>
            <h2 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Hotspot Tooltip Focus
            </h2>
            <p className="text-[#4B5563] mb-8" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
              When a hotspot tooltip opens, the surrounding area receives a subtle Gaussian blur
              to create a lens-focus effect drawing attention to the active tooltip.
            </p>
          </ScrollReveal>
          <HotspotBlurDemo />
        </div>
      </section>

      <SectionDivider className="py-4" />

      {/* Demo 5: Timer Ring */}
      <section id="demo-timer" className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
              Fig. 05 — Protocol Timer Ring
            </p>
            <h2 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Animated Session Timer
            </h2>
            <p className="text-[#4B5563] mb-8" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
              SVG ring that animates as a countdown timer for skincare protocol sessions.
              Includes play/pause, time presets, and completion state.
            </p>
          </ScrollReveal>
          <TimerRingDemo />
        </div>
      </section>

      <SectionDivider className="py-4" />

      {/* Demo 6: Parallax */}
      <section id="demo-parallax" className="py-20 md:py-28 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
              Fig. 06 — Subtle Parallax
            </p>
            <h2 className="mb-4" style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Depth Through Motion
            </h2>
            <p className="text-[#4B5563] mb-8" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
              2-4px parallax offset on hero plates and editorial elements creates subtle depth
              without being distracting. Scroll to see the effect.
            </p>
          </ScrollReveal>
          <ParallaxDemo />
        </div>
      </section>
    </div>
  );
}

/* ── Chapter Indicator Demo ── */
function ChapterIndicatorDemo() {
  const [active, setActive] = useState(2);
  const labels = ["Hero", "Proof", "Method", "Products", "Routine", "Reviews"];
  return (
    <div className="bg-[#FAFAFA] rounded-2xl border border-[#f0f0f0] p-8 relative min-h-[200px]">
      <p className="text-[11px] text-[#9CA3AF] mb-4" style={{ fontWeight: 500 }}>Click a chapter to navigate:</p>
      <div className="flex flex-col items-end gap-3">
        {labels.map((label, i) => (
          <button
            key={label}
            onClick={() => setActive(i)}
            className="flex items-center gap-2 group"
          >
            <span
              className={`text-[10px] tracking-[0.06em] uppercase transition-all duration-300 ${
                active === i ? "text-[#0E39A9] opacity-100" : "text-[#9CA3AF] opacity-60 group-hover:opacity-100"
              }`}
              style={{ fontWeight: 500 }}
            >
              {label}
            </span>
            <div
              className={`rounded-full transition-all duration-300 ${
                active === i
                  ? "w-3 h-3 bg-[#0E39A9] shadow-[0_0_10px_rgba(14,57,169,0.4)]"
                  : "w-2 h-2 bg-[#d1d5db] group-hover:bg-[#9CA3AF]"
              }`}
            />
          </button>
        ))}
        <span className="text-[10px] text-[#9CA3AF] mt-2" style={{ fontVariantNumeric: "tabular-nums", fontWeight: 500 }}>
          {String(active + 1).padStart(2, "0")}/{String(labels.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

/* ── Line Draw Demo ── */
function LineDrawDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });
  return (
    <div ref={ref} className="space-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i}>
          <motion.div
            className="h-px bg-[#0E39A9]/20 mx-auto"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: "center" }}
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: i * 0.2 + 0.3 }}
            className="text-center py-6"
          >
            <p className="text-[11px] tracking-[0.12em] uppercase text-[#0E39A9] mb-2" style={{ fontWeight: 600 }}>
              Section {String(i).padStart(2, "0")}
            </p>
            <p className="text-[#4B5563] text-[14px]">Content fades up after the line draws from center</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/* ── Depth Strip Demo ── */
function DepthStripDemo() {
  const [showDelivery, setShowDelivery] = useState(false);
  const layers = [
    { name: "Epidermis", depth: "0–0.1mm", color: "#E8EDFA", desc: "Surface protection layer" },
    { name: "Dermis", depth: "0.1–2mm", color: "#C7D3F4", desc: "Active ingredient target zone" },
    { name: "Hypodermis", depth: "2mm+", color: "#9BB0EA", desc: "Deep structural support" },
  ];
  return (
    <div className="bg-[#FAFAFA] rounded-2xl border border-[#f0f0f0] p-8">
      <div className="flex items-center justify-between mb-6">
        <p className="text-[11px] tracking-[0.1em] uppercase text-[#9CA3AF]" style={{ fontWeight: 600 }}>
          Skin Cross-Section
        </p>
        <button
          onClick={() => setShowDelivery(!showDelivery)}
          className={`text-[12px] px-4 py-1.5 rounded-full transition-all ${
            showDelivery ? "bg-[#0E39A9] text-white" : "bg-white text-[#4B5563] border border-[#e5e7eb]"
          }`}
          style={{ fontWeight: 500 }}
        >
          {showDelivery ? "Hide" : "Show"} Delivery Path
        </button>
      </div>

      <div className="space-y-2 relative">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="relative rounded-xl p-5 overflow-hidden"
            style={{ backgroundColor: layer.color }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#111827] text-[14px]" style={{ fontWeight: 600 }}>{layer.name}</p>
                <p className="text-[12px] text-[#4B5563]">{layer.desc}</p>
              </div>
              <span className="text-[11px] text-[#0E39A9] bg-white/80 px-2.5 py-1 rounded-full" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                {layer.depth}
              </span>
            </div>

            {/* Delivery path animation */}
            <AnimatePresence>
              {showDelivery && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  exit={{ scaleY: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#0E39A9]/40"
                  style={{ transformOrigin: "top" }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Delivery arrow */}
        <AnimatePresence>
          {showDelivery && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center pt-4"
            >
              <span className="text-[11px] text-[#0E39A9] bg-[#0E39A9]/5 px-3 py-1.5 rounded-full" style={{ fontWeight: 600 }}>
                2.1x deeper penetration vs topical
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Hotspot Blur Demo ── */
function HotspotBlurDemo() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const hotspots = [
    { x: 25, y: 30, label: "Niacinamide 10%", desc: "Brightening at melanocyte level" },
    { x: 60, y: 50, label: "Hyaluronic Acid 2%", desc: "Multi-weight hydration" },
    { x: 40, y: 75, label: "Ceramide NP 3%", desc: "Barrier lipid replacement" },
  ];

  return (
    <div className="bg-gradient-to-br from-[#f0f4ff] to-[#e8edfa] rounded-2xl border border-[#f0f0f0] p-8 relative min-h-[300px] overflow-hidden">
      {/* Blurred background when hotspot active */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          backdropFilter: activeHotspot !== null ? "blur(4px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, #0E39A9 1px, transparent 0)",
        backgroundSize: "24px 24px",
      }} />

      {hotspots.map((hs, i) => (
        <div key={i}>
          {/* Hotspot dot */}
          <motion.button
            className="absolute z-10"
            style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
            whileHover={{ scale: 1.2 }}
            onClick={() => setActiveHotspot(activeHotspot === i ? null : i)}
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              activeHotspot === i
                ? "bg-[#0E39A9] border-[#0E39A9] scale-110"
                : "bg-white border-[#0E39A9]/30 hover:border-[#0E39A9]"
            }`}>
              <div className={`w-2 h-2 rounded-full transition-colors ${
                activeHotspot === i ? "bg-white" : "bg-[#0E39A9]"
              }`} />
            </div>
            {activeHotspot !== i && (
              <motion.div
                className="absolute inset-0 rounded-full border border-[#0E39A9]/20"
                animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.button>

          {/* Tooltip (focused, not blurred) */}
          <AnimatePresence>
            {activeHotspot === i && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute z-20 bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-4 w-52"
                style={{ left: `${hs.x}%`, top: `${hs.y + 8}%` }}
              >
                <p className="text-[13px] text-[#111827] mb-1" style={{ fontWeight: 600 }}>{hs.label}</p>
                <p className="text-[11px] text-[#4B5563]">{hs.desc}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      <p className="absolute bottom-4 left-4 text-[10px] text-[#9CA3AF]" style={{ fontWeight: 500 }}>
        Click hotspots to see lens-focus blur effect
      </p>
    </div>
  );
}

/* ── Timer Ring Demo ── */
function TimerRingDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(60);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 1) {
            setIsPlaying(false);
            return 1;
          }
          return prev + 1 / duration;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, duration]);

  const reset = () => {
    setProgress(0);
    setIsPlaying(false);
  };

  const circumference = 2 * Math.PI * 54;
  const strokeOffset = circumference * (1 - progress);
  const remaining = Math.max(0, Math.ceil(duration * (1 - progress)));
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;

  return (
    <div className="bg-[#FAFAFA] rounded-2xl border border-[#f0f0f0] p-8 text-center">
      {/* Timer Ring */}
      <div className="relative w-40 h-40 mx-auto mb-8">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="3" />
          <motion.circle
            cx="60" cy="60" r="54" fill="none"
            stroke="#0E39A9"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            transition={{ duration: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[#111827]" style={{ fontSize: "1.75rem", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
            {mins}:{String(secs).padStart(2, "0")}
          </span>
          <span className="text-[10px] text-[#9CA3AF] mt-0.5" style={{ fontWeight: 500 }}>
            {progress >= 1 ? "Complete" : isPlaying ? "Active" : "Ready"}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <button
          onClick={() => { if (progress >= 1) reset(); setIsPlaying(!isPlaying); }}
          className="w-12 h-12 rounded-full bg-[#0E39A9] text-white flex items-center justify-center hover:bg-[#0c2f8a] transition-colors active:scale-95"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>
        <button
          onClick={reset}
          className="text-[12px] text-[#4B5563] bg-white border border-[#e5e7eb] px-4 py-2 rounded-full hover:bg-[#F7F7F7] transition-colors"
          style={{ fontWeight: 500 }}
        >
          Reset
        </button>
      </div>

      {/* Time presets */}
      <div className="flex justify-center gap-2">
        {[30, 60, 120, 180].map((t) => (
          <button
            key={t}
            onClick={() => { setDuration(t); reset(); }}
            className={`px-3 py-1.5 rounded-full text-[11px] transition-all ${
              duration === t
                ? "bg-[#0E39A9] text-white"
                : "bg-white text-[#4B5563] border border-[#e5e7eb] hover:border-[#0E39A9]/30"
            }`}
            style={{ fontWeight: 500, fontVariantNumeric: "tabular-nums" }}
          >
            {t >= 60 ? `${t / 60}m` : `${t}s`}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Parallax Demo ── */
function ParallaxDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollYProgress = useMotionValue(0);
  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when element bottom enters viewport, 1 when element top exits top
      const progress = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
      scrollYProgress.set(progress);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrollYProgress]);
  const y1 = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const y3 = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <div ref={ref} className="relative min-h-[400px] bg-gradient-to-b from-[#f0f4ff] to-white rounded-2xl border border-[#f0f0f0] overflow-hidden">
      {/* Layer 1 - Background */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-64 h-64 rounded-full bg-[#0E39A9]/[0.03] border border-[#0E39A9]/10" />
      </motion.div>

      {/* Layer 2 - Mid */}
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-40 h-40 rounded-3xl bg-[#0E39A9]/[0.06] border border-[#0E39A9]/15 rotate-12" />
      </motion.div>

      {/* Layer 3 - Foreground */}
      <motion.div
        style={{ y: y3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#f0f0f0] max-w-[220px]">
          <div className="flex items-center gap-2 mb-3">
            <Layers size={16} className="text-[#0E39A9]" />
            <span className="text-[11px] tracking-[0.08em] uppercase text-[#0E39A9]" style={{ fontWeight: 600 }}>Parallax</span>
          </div>
          <p className="text-[#111827] text-[14px]" style={{ fontWeight: 600 }}>3-layer depth</p>
          <p className="text-[12px] text-[#4B5563] mt-1">Scroll to see 2-4px offset between layers</p>
        </div>
      </motion.div>

      <p className="absolute bottom-4 left-4 text-[10px] text-[#9CA3AF]" style={{ fontWeight: 500 }}>
        Fig. 06 — Scroll to see parallax offset
      </p>
    </div>
  );
}
