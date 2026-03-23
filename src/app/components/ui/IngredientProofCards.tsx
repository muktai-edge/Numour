import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Ingredient {
  name: string;
  role: string;
  evidence: "clinical" | "in-vivo" | "in-vitro";
  supports: string;
  routine: "AM" | "PM" | "AM/PM";
  pairsWith: string[];
  concentration?: string;
}

const defaultIngredients: Ingredient[] = [
  { name: "Niacinamide", role: "Brightening agent", evidence: "clinical", supports: "Designed to support even skin tone and pore refinement", routine: "AM/PM", pairsWith: ["Hyaluronic Acid", "Ceramide NP"], concentration: "10%" },
  { name: "Hyaluronic Acid", role: "Hydration multiplier", evidence: "clinical", supports: "Designed to support multi-layer moisture binding", routine: "AM/PM", pairsWith: ["Niacinamide", "Panthenol"], concentration: "2%" },
  { name: "Ceramide NP", role: "Barrier lipid", evidence: "in-vivo", supports: "Designed to support intercellular lipid replenishment", routine: "PM", pairsWith: ["Panthenol", "Squalane"], concentration: "3%" },
  { name: "Panthenol", role: "Soothing agent", evidence: "clinical", supports: "Designed to support skin calming and recovery", routine: "AM/PM", pairsWith: ["Ceramide NP", "Hyaluronic Acid"], concentration: "5%" },
  { name: "Squalane", role: "Emollient", evidence: "in-vitro", supports: "Designed to support moisture seal without heaviness", routine: "PM", pairsWith: ["Ceramide NP", "Panthenol"] },
  { name: "Collagen Peptides", role: "Firming active", evidence: "clinical", supports: "Designed to support skin elasticity and firmness", routine: "PM", pairsWith: ["Niacinamide", "Hyaluronic Acid"], concentration: "300 Da" },
];

const evidenceColors: Record<string, { bg: string; text: string }> = {
  clinical: { bg: "bg-[#0E39A9]/5", text: "text-[#0E39A9]" },
  "in-vivo": { bg: "bg-emerald-50", text: "text-emerald-700" },
  "in-vitro": { bg: "bg-amber-50", text: "text-amber-700" },
};

interface Props {
  ingredients?: Ingredient[];
  compact?: boolean;
}

export function IngredientProofCards({ ingredients = defaultIngredients, compact = false }: Props) {
  const [activeSheet, setActiveSheet] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -260 : 260, behavior: "smooth" });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-[11px] tracking-[0.1em] uppercase text-[#0E39A9]" style={{ fontWeight: 600 }}>
          Fig. 02 — Active selection
        </p>
        <div className="flex gap-1.5">
          <button onClick={() => scroll("left")} className="w-8 h-8 rounded-full border border-[#e5e7eb] flex items-center justify-center text-[#9CA3AF] hover:border-[#0E39A9] hover:text-[#0E39A9] transition-colors">
            <ChevronLeft size={14} />
          </button>
          <button onClick={() => scroll("right")} className="w-8 h-8 rounded-full border border-[#e5e7eb] flex items-center justify-center text-[#9CA3AF] hover:border-[#0E39A9] hover:text-[#0E39A9] transition-colors">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {ingredients.map((ing, i) => {
          const ev = evidenceColors[ing.evidence];
          return (
            <motion.button
              key={ing.name}
              onClick={() => setActiveSheet(i)}
              className="shrink-0 snap-start text-left bg-white rounded-xl border border-[#f0f0f0] p-5 hover:border-[#0E39A9]/20 hover:shadow-[0_8px_30px_-8px_rgba(14,57,169,0.08)] transition-all duration-300 group"
              style={{ width: compact ? 200 : 240 }}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {/* Name + concentration */}
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-[14px] text-[#111827] group-hover:text-[#0E39A9] transition-colors" style={{ fontWeight: 600 }}>
                  {ing.name}
                </h4>
                {ing.concentration && (
                  <span className="text-[10px] text-[#0E39A9] bg-[#0E39A9]/5 px-2 py-0.5 rounded shrink-0 ml-2" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                    {ing.concentration}
                  </span>
                )}
              </div>

              {/* Chips */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="text-[9px] tracking-[0.04em] uppercase bg-[#F3F4F6] text-[#4B5563] px-2 py-0.5 rounded" style={{ fontWeight: 500 }}>
                  {ing.role}
                </span>
                <span className={`text-[9px] tracking-[0.04em] uppercase ${ev.bg} ${ev.text} px-2 py-0.5 rounded`} style={{ fontWeight: 500 }}>
                  {ing.evidence}
                </span>
              </div>

              {/* Supports */}
              <p className="text-[11px] text-[#6B7280] leading-relaxed line-clamp-2">
                {ing.supports}
              </p>

              {/* Tap hint */}
              <div className="mt-3 pt-3 border-t border-[#f0f0f0]">
                <span className="text-[10px] text-[#9CA3AF] group-hover:text-[#0E39A9] transition-colors" style={{ fontWeight: 500 }}>
                  Tap for details →
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Sheet */}
      <AnimatePresence>
        {activeSheet !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
            onClick={() => setActiveSheet(null)}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md mx-auto md:mx-4 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1 md:hidden">
                <div className="w-10 h-1 bg-[#d1d5db] rounded-full" />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-[#111827] mb-1" style={{ fontSize: "1.125rem", fontWeight: 600 }}>
                      {ingredients[activeSheet].name}
                    </h3>
                    <div className="flex gap-1.5">
                      <span className="text-[10px] tracking-[0.04em] uppercase bg-[#F3F4F6] text-[#4B5563] px-2 py-0.5 rounded" style={{ fontWeight: 500 }}>
                        {ingredients[activeSheet].role}
                      </span>
                      {ingredients[activeSheet].concentration && (
                        <span className="text-[10px] text-[#0E39A9] bg-[#0E39A9]/5 px-2 py-0.5 rounded" style={{ fontWeight: 600 }}>
                          {ingredients[activeSheet].concentration}
                        </span>
                      )}
                    </div>
                  </div>
                  <button onClick={() => setActiveSheet(null)} className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#4B5563] hover:bg-[#e5e7eb] transition-colors">
                    <X size={14} />
                  </button>
                </div>

                <p className="text-[13px] text-[#4B5563] leading-relaxed mb-6">
                  {ingredients[activeSheet].supports}
                </p>

                {/* Routine fit */}
                <div className="mb-5">
                  <p className="text-[10px] tracking-[0.08em] uppercase text-[#9CA3AF] mb-2" style={{ fontWeight: 600 }}>
                    Where it fits
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-[#0E39A9] bg-[#0E39A9]/5 px-3 py-1.5 rounded-full" style={{ fontWeight: 600 }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0E39A9]" />
                    {ingredients[activeSheet].routine} Routine
                  </span>
                </div>

                {/* Pairing guidance */}
                <div className="mb-6">
                  <p className="text-[10px] tracking-[0.08em] uppercase text-[#9CA3AF] mb-2" style={{ fontWeight: 600 }}>
                    Pairs well with
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ingredients[activeSheet].pairsWith.map((p) => (
                      <span key={p} className="text-[11px] text-[#4B5563] bg-[#F7F7F7] border border-[#f0f0f0] px-3 py-1.5 rounded-full" style={{ fontWeight: 500 }}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Link */}
                <button
                  onClick={() => setActiveSheet(null)}
                  className="w-full text-center text-[12px] text-[#0E39A9] py-3 border-t border-[#f0f0f0]"
                  style={{ fontWeight: 600 }}
                >
                  See full INCI →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
