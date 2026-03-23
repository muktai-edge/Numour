import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const layers = [
  { id: "surface", label: "Surface", depth: "0–0.1mm", color: "#E0E7FF" },
  { id: "mid", label: "Mid", depth: "0.1–0.5mm", color: "#C7D2FE" },
  { id: "deep", label: "Deep", depth: "0.5–2mm", color: "#A5B4FC" },
];

const formats = [
  { id: "gel", label: "Gel", time: "60–90s", depth: 1 },
  { id: "jelly", label: "Jelly", time: "90–120s", depth: 2 },
  { id: "device", label: "Device", time: "3:00", depth: 2 },
];

interface DeliveryEngineProps {
  compact?: boolean;
}

export function DeliveryEngine({ compact = false }: DeliveryEngineProps) {
  const [deliveryOn, setDeliveryOn] = useState(false);
  const [activeFormat, setActiveFormat] = useState(0);
  const [animating, setAnimating] = useState(false);

  const maxDepth = deliveryOn ? formats[activeFormat].depth : 0;
  const protocolTime = formats[activeFormat].time;

  useEffect(() => {
    setAnimating(true);
    const t = setTimeout(() => setAnimating(false), 700);
    return () => clearTimeout(t);
  }, [deliveryOn, activeFormat]);

  return (
    <div className={compact ? "" : "bg-white rounded-3xl border border-[#f0f0f0] overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.06)]"}>
      {/* Header */}
      <div className={compact ? "mb-6" : "p-6 border-b border-[#f0f0f0]"}>
        <p className="text-[11px] tracking-[0.1em] uppercase text-[#0E39A9] mb-1" style={{ fontWeight: 600 }}>
          Fig. 01 — Delivery depth model
        </p>
        {!compact && (
          <p className="text-[12px] text-[#4B5563]">Toggle delivery to see penetration depth</p>
        )}
      </div>

      <div className={compact ? "" : "p-6"}>
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {/* Delivery toggle */}
          <button
            onClick={() => setDeliveryOn(!deliveryOn)}
            className="flex items-center gap-3 group"
          >
            <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${deliveryOn ? "bg-[#0E39A9]" : "bg-[#d1d5db]"}`}>
              <motion.div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
                animate={{ left: deliveryOn ? 22 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </div>
            <span className="text-[12px] text-[#4B5563]" style={{ fontWeight: 500 }}>
              {deliveryOn ? "Delivery-assisted" : "Topical only"}
            </span>
          </button>

          {/* Format tabs */}
          <div className="flex bg-[#F3F4F6] rounded-full p-0.5 gap-0.5 ml-auto">
            {formats.map((f, i) => (
              <button
                key={f.id}
                onClick={() => setActiveFormat(i)}
                className={`relative px-4 py-1.5 rounded-full text-[11px] tracking-[0.02em] transition-colors duration-200 ${
                  activeFormat === i ? "text-white" : "text-[#4B5563]"
                }`}
                style={{ fontWeight: activeFormat === i ? 600 : 500 }}
              >
                {activeFormat === i && (
                  <motion.div
                    layoutId="formatTab"
                    className="absolute inset-0 bg-[#0E39A9] rounded-full"
                    transition={{ type: "spring", bounce: 0.12, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Visualization */}
        <div className="relative">
          {/* Layer strips */}
          <div className="space-y-1">
            {layers.map((layer, i) => {
              const isReached = deliveryOn && i <= maxDepth;
              return (
                <motion.div
                  key={layer.id}
                  className="relative rounded-lg overflow-hidden"
                  animate={{
                    height: compact ? 48 : 56,
                  }}
                >
                  {/* Background */}
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    animate={{
                      backgroundColor: isReached ? layer.color : "#F9FAFB",
                      borderColor: isReached ? "#0E39A9" : "#f0f0f0",
                    }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    style={{ border: "1px solid" }}
                  />

                  {/* Active indicator line */}
                  {isReached && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#0E39A9] rounded-l-lg"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.12 }}
                    />
                  )}

                  {/* Content */}
                  <div className="relative h-full flex items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[12px] transition-colors duration-300 ${isReached ? "text-[#0E39A9]" : "text-[#9CA3AF]"}`}
                        style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}
                      >
                        L{i + 1}
                      </span>
                      <div>
                        <p className={`text-[13px] transition-colors duration-300 ${isReached ? "text-[#111827]" : "text-[#6B7280]"}`} style={{ fontWeight: 600 }}>
                          {layer.label}
                        </p>
                        <p className="text-[10px] text-[#9CA3AF]" style={{ fontVariantNumeric: "tabular-nums" }}>
                          {layer.depth}
                        </p>
                      </div>
                    </div>

                    {/* Delivery dot */}
                    <AnimatePresence>
                      {isReached && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.12 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-2 h-2 rounded-full bg-[#0E39A9]" />
                          <span className="text-[10px] text-[#0E39A9]" style={{ fontWeight: 600 }}>Active</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Line draw path */}
          <div className="absolute left-8 top-0 bottom-0 w-px pointer-events-none">
            <motion.div
              className="w-full bg-[#0E39A9]"
              initial={{ height: "0%" }}
              animate={{
                height: deliveryOn
                  ? `${((maxDepth + 1) / layers.length) * 100}%`
                  : "10%",
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Protocol chip */}
        <div className="flex items-center gap-3 mt-6">
          <motion.div
            className="flex items-center gap-2 bg-[#0E39A9]/5 border border-[#0E39A9]/10 rounded-full px-3 py-1.5"
            animate={{ scale: animating ? [1, 1.02, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#0E39A9]" />
            <span className="text-[11px] text-[#0E39A9]" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
              Protocol: {protocolTime}
            </span>
          </motion.div>
          {deliveryOn && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[11px] text-[#4B5563]"
              style={{ fontWeight: 500 }}
            >
              {formats[activeFormat].depth === 2 ? "Deep delivery" : "Mid-layer delivery"}
            </motion.span>
          )}
          {!deliveryOn && (
            <span className="text-[11px] text-[#9CA3AF]" style={{ fontWeight: 500 }}>
              Surface only — limited penetration
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
