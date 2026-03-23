import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { products } from "../../data/products";

const hotspots = [
  { id: "damn-dewy", x: 28, y: 35, label: "Damn Dewy" },
  { id: "goat-guasha", x: 72, y: 50, label: "G.O.A.T GuaSha" },
  { id: "collagen-bombshell", x: 50, y: 70, label: "Collagen Bombshell" },
];

const LIFESTYLE_IMAGE =
  "https://images.unsplash.com/photo-1727157271534-5828ba85de7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjB3b21hbiUyMHNraW5jYXJlJTIwcm91dGluZSUyMGNsb3NlJTIwdXAlMjBiZWF1dHl8ZW58MXx8fHwxNzczMjE3NDk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function VisualCatalogHotspots() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const activeProduct = activeHotspot
    ? products.find((p) => p.id === activeHotspot)
    : null;

  return (
    <div className="mt-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px w-8 bg-[#0E39A9]" />
        <p
          className="text-[11px] tracking-[0.12em] uppercase text-[#0E39A9]"
          style={{ fontWeight: 600 }}
        >
          Shop the Look
        </p>
      </div>

      <div className="relative rounded-2xl overflow-hidden group">
        {/* Background image */}
        <div
          className={`transition-all duration-500 ${
            activeHotspot ? "blur-[2px] scale-[1.02]" : ""
          }`}
        >
          <ImageWithFallback
            src={LIFESTYLE_IMAGE}
            alt="Numour skincare lifestyle"
            className="w-full aspect-[16/9] md:aspect-[21/9] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Hotspot dots */}
        {hotspots.map((hs) => (
          <button
            key={hs.id}
            onClick={() =>
              setActiveHotspot(activeHotspot === hs.id ? null : hs.id)
            }
            className="absolute z-10 group/dot"
            style={{ left: `${hs.x}%`, top: `${hs.y}%`, transform: "translate(-50%, -50%)" }}
          >
            <span
              className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                activeHotspot === hs.id
                  ? "bg-[#0E39A9] scale-110"
                  : "bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110"
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  activeHotspot === hs.id ? "bg-white" : "bg-[#0E39A9]"
                }`}
              />
              {/* Pulse ring */}
              {activeHotspot !== hs.id && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-white/50"
                  animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                />
              )}
            </span>
            {/* Label chip */}
            <span
              className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] px-2.5 py-1 rounded-full transition-opacity duration-200 ${
                activeHotspot === hs.id
                  ? "bg-[#0E39A9] text-white opacity-100"
                  : "bg-black/50 text-white/90 backdrop-blur-sm opacity-0 group-hover/dot:opacity-100"
              }`}
              style={{ fontWeight: 500 }}
            >
              {hs.label}
            </span>
          </button>
        ))}

        {/* Tooltip card */}
        <AnimatePresence>
          {activeProduct && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-[280px] z-20"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] border border-[#f0f0f0]">
                {/* Close button */}
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/20 transition-colors"
                >
                  <X size={12} />
                </button>

                {/* Product image */}
                <div className="aspect-square bg-[#F7F7F7]">
                  <ImageWithFallback
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product info */}
                <div className="p-4">
                  <p
                    className="text-[#111827] mb-1 line-clamp-1"
                    style={{ fontSize: "0.875rem", fontWeight: 600 }}
                  >
                    {activeProduct.name}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-[#111827]"
                      style={{
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      ₹{activeProduct.price.toLocaleString()}
                    </span>
                    {activeProduct.originalPrice && (
                      <span
                        className="text-[#9CA3AF] line-through text-[12px]"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        ₹{activeProduct.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/product/${activeProduct.id}`}
                    className="flex items-center justify-center gap-1.5 w-full bg-[#0E39A9] text-white rounded-xl text-[13px] hover:bg-[#0c2f8a] transition-colors"
                    style={{ fontWeight: 500, height: 40 }}
                  >
                    View Product <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}