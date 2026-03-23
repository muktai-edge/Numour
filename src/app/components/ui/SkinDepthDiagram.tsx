import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const layers = [
  {
    name: "Stratum Corneum",
    depth: "Surface",
    color: "#c7d7f5",
    activeColor: "#0E39A9",
    detail: "Dead cell barrier protecting everything below. Most skincare stops here.",
  },
  {
    name: "Epidermis",
    depth: "0.1mm",
    color: "#a3bfed",
    activeColor: "#2D5FD6",
    detail: "Living cells, melanocytes, and the birthplace of new skin. Where hydration begins.",
  },
  {
    name: "Dermis",
    depth: "1–2mm",
    color: "#7ba1e5",
    activeColor: "#5C73E6",
    detail: "Collagen, elastin, blood vessels. Where real anti-aging and repair happens.",
  },
];

interface SkinDepthDiagramProps {
  interactive?: boolean;
  showDelivery?: boolean;
  className?: string;
}

export function SkinDepthDiagram({ interactive = true, showDelivery = false, className = "" }: SkinDepthDiagramProps) {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [deliveryOn, setDeliveryOn] = useState(showDelivery);

  return (
    <div className={`relative ${className}`}>
      {/* Layer stack */}
      <div className="space-y-1">
        {layers.map((layer, i) => {
          const isActive = activeLayer === i;
          return (
            <motion.div
              key={layer.name}
              className={`relative rounded-xl overflow-hidden ${interactive ? "cursor-pointer" : ""}`}
              style={{ height: 64 + i * 16 }}
              onClick={() => interactive && setActiveLayer(isActive ? null : i)}
              whileHover={interactive ? { scale: 1.02 } : {}}
              animate={{
                backgroundColor: isActive ? layer.activeColor : layer.color,
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute inset-0 flex items-center justify-between px-5">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[13px] transition-colors duration-300 ${isActive ? "text-white" : "text-[#111827]"}`}
                    style={{ fontWeight: 600 }}
                  >
                    {layer.name}
                  </span>
                </div>
                <span
                  className={`text-[11px] transition-colors duration-300 ${isActive ? "text-white/70" : "text-[#4B5563]"}`}
                  style={{ fontVariantNumeric: "tabular-nums", fontWeight: 500 }}
                >
                  {layer.depth}
                </span>
              </div>

              {/* Delivery dots */}
              {deliveryOn && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {Array.from({ length: 5 }).map((_, dotI) => (
                    <motion.div
                      key={dotI}
                      className="absolute w-1.5 h-1.5 rounded-full bg-white"
                      style={{ left: `${15 + dotI * 18}%` }}
                      animate={{
                        y: [-(i * 20 + 10), 64 + i * 16],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 2 + i * 0.5,
                        repeat: Infinity,
                        delay: dotI * 0.3 + i * 0.5,
                        ease: "easeIn",
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Active detail tooltip */}
              <AnimatePresence>
                {isActive && interactive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -bottom-2 left-4 right-4 translate-y-full z-20"
                  >
                    <div className="bg-white rounded-xl p-4 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.15)] border border-[#f0f0f0] mt-3">
                      <p className="text-[12px] text-[#4B5563] leading-relaxed">{layer.detail}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Delivery toggle */}
      {interactive && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => setDeliveryOn(!deliveryOn)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
              deliveryOn ? "bg-[#0E39A9]" : "bg-[#d1d5db]"
            }`}
          >
            <motion.div
              className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
              animate={{ left: deliveryOn ? 22 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className="text-[12px] text-[#4B5563]" style={{ fontWeight: 500 }}>
            {deliveryOn ? "Delivery active" : "Toggle delivery"}
          </span>
        </div>
      )}
    </div>
  );
}
