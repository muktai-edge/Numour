import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Droplets, Zap, Shield, Sparkles, Atom } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { products } from "../../data/products";

interface ConcernData {
  id: string;
  name: string;
  icon: typeof Droplets;
  targetLayer: "Surface" | "Mid" | "Deep";
  format: string;
  routine: "AM" | "PM" | "AM/PM";
  productIds: string[];
  systemPath: { step: string; label: string }[];
  image: string;
}

const concerns: ConcernData[] = [
  {
    id: "hydration",
    name: "Hydration",
    icon: Droplets,
    targetLayer: "Mid",
    format: "Smart Jar",
    routine: "AM/PM",
    productIds: ["damn-dewy", "damn-dewy-skincare", "brightening-dual-serum"],
    systemPath: [
      { step: "💧", label: "Cleanse" },
      { step: "🧪", label: "Treat" },
      { step: "✨", label: "Seal" },
    ],
    image: "https://images.unsplash.com/photo-1770680425428-489c9565bf94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGRyb3BsZXRzJTIwbWFjcm8lMjBibHVlJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzczMjEyMDYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "anti-aging",
    name: "Anti-aging",
    icon: Sparkles,
    targetLayer: "Deep",
    format: "Device + Jar",
    routine: "PM",
    productIds: ["collagen-bombshell", "goat-guasha", "anti-aging-dual-serum"],
    systemPath: [
      { step: "🧪", label: "Serum" },
      { step: "🫙", label: "Jelly" },
      { step: "📱", label: "Device" },
    ],
    image: "https://images.unsplash.com/photo-1579801874037-f28c38c7edbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGdsb3dpbmclMjBza2luJTIwYWZ0ZXIlMjBmYWNpYWwlMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzczMjEyMDYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "acne",
    name: "Acne",
    icon: Zap,
    targetLayer: "Surface",
    format: "Skincare",
    routine: "PM",
    productIds: ["anti-acne-dual-serum", "damn-dewy", "boss-sonic-scrubber"],
    systemPath: [
      { step: "💧", label: "Cleanse" },
      { step: "🧪", label: "Treat" },
      { step: "🛡️", label: "Protect" },
    ],
    image: "https://images.unsplash.com/photo-1737978697863-5d65495b28ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGNsZWFyJTIwc2tpbiUyMGNsb3NldXAlMjBiZWF1dHklMjBwb3J0cmFpdCUyMG5hdHVyYWx8ZW58MXx8fHwxNzczMjEyMDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "barrier",
    name: "Barrier Repair",
    icon: Shield,
    targetLayer: "Mid",
    format: "Smart Jar",
    routine: "AM/PM",
    productIds: ["damn-dewy", "collagen-bombshell-skincare", "brightening-dual-serum"],
    systemPath: [
      { step: "💧", label: "Cleanse" },
      { step: "🛡️", label: "Repair" },
      { step: "✨", label: "Seal" },
    ],
    image: "https://images.unsplash.com/photo-1590923801255-05c5e06536f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoeWRyYXRpbmclMjBtb2lzdHVyaXplciUyMGNyZWFtJTIwc3dpcmwlMjB0ZXh0dXJlfGVufDF8fHx8MTc3MzIxMjA2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "pigmentation",
    name: "Pigmentation",
    icon: Atom,
    targetLayer: "Surface",
    format: "Skincare",
    routine: "PM",
    productIds: ["brightening-dual-serum", "damn-dewy-skincare", "goat-guasha"],
    systemPath: [
      { step: "💧", label: "Cleanse" },
      { step: "🧪", label: "Brighten" },
      { step: "✨", label: "Hydrate" },
    ],
    image: "https://images.unsplash.com/photo-1579801874037-f28c38c7edbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGdsb3dpbmclMjBza2luJTIwYWZ0ZXIlMjBmYWNpYWwlMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzczMjEyMDYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

const layerDepths: Record<string, number> = { Surface: 1, Mid: 2, Deep: 3 };

export function ConcernMatcher() {
  const [activeConcern, setActiveConcern] = useState(0);
  const concern = concerns[activeConcern];
  const matchedProducts = concern.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  return (
    <div>
      {/* Concern tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-8" style={{ scrollbarWidth: "none" }}>
        {concerns.map((c, i) => {
          const isActive = activeConcern === i;
          return (
            <button
              key={c.id}
              onClick={() => setActiveConcern(i)}
              className={`relative shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] border transition-all duration-200 ${
                isActive
                  ? "border-[#0E39A9] bg-[#0E39A9] text-white"
                  : "border-[#e5e7eb] bg-white text-[#4B5563] hover:border-[#0E39A9]/30"
              }`}
              style={{ fontWeight: isActive ? 600 : 500 }}
            >
              <c.icon size={14} strokeWidth={1.5} />
              {c.name}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeConcern}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.15 }}
        >
          <div className="grid md:grid-cols-3 gap-6">
            {/* System Map */}
            <div className="bg-white rounded-2xl border border-[#f0f0f0] p-6 md:col-span-1">
              {/* Target Layer */}
              <div className="mb-6">
                <p className="text-[10px] tracking-[0.08em] uppercase text-[#9CA3AF] mb-3" style={{ fontWeight: 600 }}>
                  Target Layer
                </p>
                <div className="space-y-1.5">
                  {["Surface", "Mid", "Deep"].map((layer) => {
                    const isTarget = layerDepths[layer] <= layerDepths[concern.targetLayer];
                    return (
                      <motion.div
                        key={layer}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${
                          isTarget ? "bg-[#0E39A9]/5" : "bg-[#FAFAFA]"
                        }`}
                        animate={{ opacity: isTarget ? 1 : 0.4 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="w-2 h-2 rounded-full"
                          animate={{
                            backgroundColor: isTarget ? "#0E39A9" : "#d1d5db",
                            scale: layer === concern.targetLayer ? [1, 1.3, 1] : 1,
                          }}
                          transition={{ duration: 0.4 }}
                        />
                        <span className={`text-[12px] ${isTarget ? "text-[#111827]" : "text-[#9CA3AF]"}`} style={{ fontWeight: isTarget ? 600 : 400 }}>
                          {layer}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Format + Routine */}
              <div className="flex gap-2 mb-6">
                <div className="flex-1 bg-[#F7F7F7] rounded-lg p-3">
                  <p className="text-[9px] tracking-[0.06em] uppercase text-[#9CA3AF] mb-1" style={{ fontWeight: 600 }}>Format</p>
                  <p className="text-[12px] text-[#111827]" style={{ fontWeight: 600 }}>{concern.format}</p>
                </div>
                <div className="flex-1 bg-[#F7F7F7] rounded-lg p-3">
                  <p className="text-[9px] tracking-[0.06em] uppercase text-[#9CA3AF] mb-1" style={{ fontWeight: 600 }}>Routine</p>
                  <p className="text-[12px] text-[#0E39A9]" style={{ fontWeight: 600 }}>{concern.routine}</p>
                </div>
              </div>

              {/* System Path */}
              <div>
                <p className="text-[10px] tracking-[0.08em] uppercase text-[#9CA3AF] mb-3" style={{ fontWeight: 600 }}>
                  System Path
                </p>
                <div className="flex items-center gap-1">
                  {concern.systemPath.map((step, i) => (
                    <div key={step.label} className="flex items-center gap-1">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[16px]">{step.step}</span>
                        <span className="text-[9px] text-[#4B5563]" style={{ fontWeight: 500 }}>{step.label}</span>
                      </div>
                      {i < concern.systemPath.length - 1 && (
                        <div className="w-6 h-px bg-[#d1d5db] mx-1 mt-[-12px]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product recommendations */}
            <div className="md:col-span-2">
              <div className="grid sm:grid-cols-3 gap-3">
                {matchedProducts.slice(0, 3).map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="group bg-white rounded-xl border border-[#f0f0f0] overflow-hidden hover:border-[#0E39A9]/20 hover:shadow-md transition-all duration-300"
                  >
                    <div className="aspect-square bg-[#F7F7F7] overflow-hidden">
                      <ImageWithFallback
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-[12px] text-[#111827] line-clamp-1 group-hover:text-[#0E39A9] transition-colors" style={{ fontWeight: 600 }}>
                        {p.name}
                      </p>
                      <p className="text-[11px] text-[#9CA3AF] line-clamp-1">{p.keyBenefit}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[13px] text-[#111827]" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                          ₹{p.price.toLocaleString()}
                        </span>
                        <ArrowRight size={12} className="text-[#9CA3AF] group-hover:text-[#0E39A9] transition-colors" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-4 text-center">
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-1.5 text-[12px] text-[#0E39A9] hover:gap-2 transition-all"
                  style={{ fontWeight: 600 }}
                >
                  Explore this system <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
