import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Capability {
  id: string;
  label: string;
  supports: string;
  type: "led" | "thermal" | "cryo";
  specs: { label: string; value: string }[];
}

const capabilities: Capability[] = [
  {
    id: "led-red",
    label: "Red LED",
    supports: "Supports collagen stimulation and skin rejuvenation at cellular level",
    type: "led",
    specs: [
      { label: "Wavelength", value: "630nm" },
      { label: "LEDs", value: "72 units" },
    ],
  },
  {
    id: "led-blue",
    label: "Blue LED",
    supports: "Supports bacteria reduction and calming of inflamed skin",
    type: "led",
    specs: [
      { label: "Wavelength", value: "460nm" },
      { label: "Target", value: "Surface" },
    ],
  },
  {
    id: "led-purple",
    label: "Purple LED",
    supports: "Supports combined anti-aging and clearing benefits",
    type: "led",
    specs: [
      { label: "Wavelength", value: "405nm" },
      { label: "Mode", value: "Dual-action" },
    ],
  },
  {
    id: "thermal",
    label: "Thermal 42°C",
    supports: "Supports vasodilation and product absorption through controlled heat",
    type: "thermal",
    specs: [
      { label: "Temperature", value: "42°C" },
      { label: "Precision", value: "±0.5°C" },
    ],
  },
  {
    id: "cryo",
    label: "Cryo 12°C",
    supports: "Supports pore tightening and de-puffing through controlled cooling",
    type: "cryo",
    specs: [
      { label: "Temperature", value: "12°C" },
      { label: "Precision", value: "±0.5°C" },
    ],
  },
];

function LEDWaveform({ wavelength }: { wavelength: string }) {
  const nm = parseInt(wavelength);
  const hue = nm < 450 ? 260 : nm < 500 ? 220 : nm < 600 ? 280 : 0;
  const color = `hsl(${hue}, 70%, 55%)`;

  return (
    <svg viewBox="0 0 120 40" className="w-full h-10" fill="none">
      <motion.path
        d="M0 20 Q10 5 20 20 Q30 35 40 20 Q50 5 60 20 Q70 35 80 20 Q90 5 100 20 Q110 35 120 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </svg>
  );
}

function ThermalBar({ temp }: { temp: string }) {
  const value = parseInt(temp);
  const pct = ((value - 10) / 40) * 100;

  return (
    <div className="w-full">
      <div className="relative h-3 bg-gradient-to-r from-blue-100 via-amber-100 to-red-200 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-400 to-red-400 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-red-400 shadow-sm"
          initial={{ left: "0%" }}
          animate={{ left: `calc(${pct}% - 8px)` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[9px] text-[#9CA3AF]">10°C</span>
        <span className="text-[9px] text-[#9CA3AF]">50°C</span>
      </div>
    </div>
  );
}

function CryoBar({ temp }: { temp: string }) {
  const value = parseInt(temp);
  const pct = ((30 - value) / 30) * 100;

  return (
    <div className="w-full">
      <div className="relative h-3 bg-gradient-to-r from-blue-300 via-blue-100 to-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-blue-400 shadow-sm"
          initial={{ left: "0%" }}
          animate={{ left: `calc(${pct}% - 8px)` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[9px] text-[#9CA3AF]">0°C</span>
        <span className="text-[9px] text-[#9CA3AF]">30°C</span>
      </div>
    </div>
  );
}

export function ToolsCapabilityMap() {
  const [activeCap, setActiveCap] = useState<string>("led-red");
  const active = capabilities.find((c) => c.id === activeCap)!;

  return (
    <div className="bg-white rounded-2xl border border-[#f0f0f0] overflow-hidden">
      <div className="p-6 border-b border-[#f0f0f0]">
        <p className="text-[11px] tracking-[0.1em] uppercase text-[#0E39A9] mb-1" style={{ fontWeight: 600 }}>
          Fig. 04 — Tool capabilities
        </p>
        <p className="text-[12px] text-[#4B5563]">Select a capability to see its specifications</p>
      </div>

      <div className="p-6">
        {/* Capability strip */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6" style={{ scrollbarWidth: "none" }}>
          {capabilities.map((cap) => {
            const isActive = activeCap === cap.id;
            return (
              <button
                key={cap.id}
                onClick={() => setActiveCap(cap.id)}
                className={`relative shrink-0 px-4 py-2 rounded-xl text-[12px] border transition-all duration-200 ${
                  isActive
                    ? "border-[#0E39A9]/20 bg-[#0E39A9]/[0.03] text-[#0E39A9]"
                    : "border-[#f0f0f0] bg-white text-[#4B5563] hover:border-[#d1d5db]"
                }`}
                style={{ fontWeight: isActive ? 600 : 500 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="capIndicator"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#0E39A9] rounded-full"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                  />
                )}
                {cap.label}
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCap}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Mini diagram */}
              <div className="bg-[#FAFAFA] rounded-xl p-5 border border-[#f0f0f0]">
                <p className="text-[10px] tracking-[0.06em] uppercase text-[#9CA3AF] mb-3" style={{ fontWeight: 600 }}>
                  {active.type === "led" ? "Waveform" : active.type === "thermal" ? "Temperature" : "Cooling"}
                </p>
                {active.type === "led" && <LEDWaveform wavelength={active.specs[0].value} />}
                {active.type === "thermal" && <ThermalBar temp={active.specs[0].value} />}
                {active.type === "cryo" && <CryoBar temp={active.specs[0].value} />}

                {/* Specs chips */}
                <div className="flex gap-2 mt-4">
                  {active.specs.map((spec) => (
                    <div key={spec.label} className="flex items-center gap-1.5 bg-white border border-[#f0f0f0] rounded-lg px-3 py-1.5">
                      <span className="text-[10px] text-[#9CA3AF]" style={{ fontWeight: 500 }}>{spec.label}</span>
                      <span className="text-[11px] text-[#0E39A9]" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col justify-center">
                <h4 className="text-[#111827] mb-2" style={{ fontSize: "1rem", fontWeight: 600 }}>
                  {active.label}
                </h4>
                <p className="text-[13px] text-[#4B5563] leading-relaxed">
                  {active.supports}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
