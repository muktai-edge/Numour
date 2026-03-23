import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";

const toggles = [
  { id: "fragrance", label: "Fragrance-free / irritant mindful", default: true },
  { id: "soothing", label: "Soothing support", default: true },
  { id: "daily", label: "Daily protocol safe", default: true },
];

export function BarrierSimulator({ compact = false }: { compact?: boolean }) {
  const [sliderValue, setSliderValue] = useState(65); // 0=Performance, 100=Tolerance
  const [activeToggles, setActiveToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(toggles.map((t) => [t.id, t.default]))
  );

  const tolerance = sliderValue / 100;
  const shieldLayers = 4;

  return (
    <div className={compact ? "" : "bg-white rounded-3xl border border-[#f0f0f0] overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.06)]"}>
      <div className={compact ? "mb-6" : "p-6 border-b border-[#f0f0f0]"}>
        <p className="text-[11px] tracking-[0.1em] uppercase text-[#0E39A9] mb-1" style={{ fontWeight: 600 }}>
          Fig. 03 — Barrier tolerance model
        </p>
        {!compact && (
          <p className="text-[12px] text-[#4B5563]">Adjust the balance between active performance and barrier tolerance</p>
        )}
      </div>

      <div className={compact ? "" : "p-6"}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Shield visualization */}
          <div className="flex items-center justify-center py-8">
            <div className="relative w-40 h-40">
              {Array.from({ length: shieldLayers }).map((_, i) => {
                const size = 100 - i * 16;
                const layerOpacity = 0.08 + tolerance * 0.15 + i * 0.04;
                const activeCount = Object.values(activeToggles).filter(Boolean).length;
                const strengthMultiplier = 0.6 + (activeCount / toggles.length) * 0.4;

                return (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border-2 border-[#0E39A9]"
                    animate={{
                      width: `${size}%`,
                      height: `${size}%`,
                      opacity: layerOpacity * strengthMultiplier,
                      borderWidth: 1 + tolerance * 2,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{
                      top: `${(100 - size) / 2}%`,
                      left: `${(100 - size) / 2}%`,
                      backgroundColor: `rgba(14, 57, 169, ${0.02 + tolerance * 0.06})`,
                    }}
                  />
                );
              })}

              {/* Center label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <motion.p
                  className="text-[#0E39A9]"
                  style={{ fontSize: "1.5rem", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 0.4 }}
                  key={sliderValue}
                >
                  {Math.round(sliderValue)}%
                </motion.p>
                <p className="text-[10px] text-[#4B5563]" style={{ fontWeight: 500 }}>
                  Tolerance
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div>
            {/* Slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] tracking-[0.06em] uppercase text-[#9CA3AF]" style={{ fontWeight: 600 }}>
                  Performance
                </span>
                <span className="text-[10px] tracking-[0.06em] uppercase text-[#0E39A9]" style={{ fontWeight: 600 }}>
                  Tolerance
                </span>
              </div>
              <div className="relative h-2 bg-gradient-to-r from-[#F3F4F6] to-[#0E39A9]/20 rounded-full">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#0E39A9] rounded-full"
                  animate={{ width: `${sliderValue}%` }}
                  transition={{ duration: 0.2 }}
                />
                <input
                  type="range"
                  min={10}
                  max={95}
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-[#0E39A9] shadow-sm pointer-events-none"
                  animate={{ left: `calc(${sliderValue}% - 10px)` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>

            {/* Micro toggles */}
            <div className="space-y-2.5">
              {toggles.map((toggle) => {
                const isOn = activeToggles[toggle.id];
                return (
                  <button
                    key={toggle.id}
                    onClick={() =>
                      setActiveToggles((prev) => ({ ...prev, [toggle.id]: !prev[toggle.id] }))
                    }
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left ${
                      isOn
                        ? "border-[#0E39A9]/15 bg-[#0E39A9]/[0.03]"
                        : "border-[#f0f0f0] bg-white hover:bg-[#FAFAFA]"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors duration-200 ${
                      isOn ? "bg-[#0E39A9] text-white" : "bg-[#F3F4F6] text-transparent"
                    }`}>
                      <Check size={12} strokeWidth={2.5} />
                    </div>
                    <span className={`text-[12px] transition-colors duration-200 ${isOn ? "text-[#111827]" : "text-[#6B7280]"}`} style={{ fontWeight: 500 }}>
                      {toggle.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}