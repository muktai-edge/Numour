import { useState } from "react";
import { X, ChevronRight, Beaker, Shield, Droplets, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Ingredient {
  name: string;
  concentration: string;
  benefit: string;
  mechanism: string;
  category: "Active" | "Delivery" | "Barrier" | "Soothing";
}

const ingredientDB: Record<string, Ingredient[]> = {
  default: [
    { name: "Niacinamide", concentration: "10%", benefit: "Brightening & pore refinement", mechanism: "Inhibits melanosome transfer to keratinocytes, reducing pigmentation at source.", category: "Active" },
    { name: "Hyaluronic Acid", concentration: "2%", benefit: "Deep multi-layer hydration", mechanism: "Multi-weight HA (50–1500 kDa) binds 1000x its weight in water across epidermal layers.", category: "Active" },
    { name: "Ceramide NP", concentration: "3%", benefit: "Barrier repair & moisture lock", mechanism: "Replenishes intercellular lipids in stratum corneum, restoring barrier function.", category: "Barrier" },
    { name: "Panthenol", concentration: "5%", benefit: "Soothing & anti-inflammatory", mechanism: "Pro-vitamin B5 penetrates into lower skin layers and binds water molecules effectively.", category: "Soothing" },
    { name: "Squalane", concentration: "4%", benefit: "Emollient & skin softening", mechanism: "Biomimetic lipid that integrates with the skin's natural sebum layer, preventing TEWL.", category: "Barrier" },
  ],
  "damn-dewy": [
    { name: "Hyaluronic Acid", concentration: "2%", benefit: "72h deep hydration", mechanism: "Multi-weight HA penetrates epidermis at multiple depths for sustained moisture delivery.", category: "Active" },
    { name: "Ceramide NP", concentration: "3%", benefit: "Barrier repair & moisture lock", mechanism: "Replenishes stratum corneum lipids to prevent trans-epidermal water loss.", category: "Barrier" },
    { name: "Panthenol", concentration: "5%", benefit: "Soothing anti-inflammatory", mechanism: "Pro-vitamin B5 converts to pantothenic acid, accelerating epithelial regeneration.", category: "Soothing" },
    { name: "Blue LED Activation", concentration: "415nm", benefit: "Product freshness + calming", mechanism: "Blue light wavelength maintains active ingredient integrity and has anti-bacterial properties.", category: "Delivery" },
  ],
  "collagen-bombshell": [
    { name: "Collagen Peptides", concentration: "300Da", benefit: "Deep penetration collagen", mechanism: "Korean-origin 300 Dalton micro-peptides — 10x smaller than standard collagen for transdermal absorption.", category: "Active" },
    { name: "Retinol", concentration: "0.3%", benefit: "Cell turnover acceleration", mechanism: "Binds to RAR/RXR receptors, accelerating keratinocyte differentiation and collagen synthesis.", category: "Active" },
    { name: "Red LED Activation", concentration: "630nm", benefit: "Collagen synthesis boost", mechanism: "Red light at 630nm stimulates fibroblast activity and mitochondrial ATP production.", category: "Delivery" },
    { name: "Adenosine", concentration: "0.04%", benefit: "Anti-wrinkle & skin smoothing", mechanism: "Boosts collagen and elastin production by stimulating fibroblast proliferation.", category: "Active" },
  ],
  "brightening-dual-serum": [
    { name: "Niacinamide", concentration: "10%", benefit: "Brightening at source", mechanism: "Inhibits melanosome transfer, reducing visible pigmentation and evening skin tone.", category: "Active" },
    { name: "Alpha Arbutin", concentration: "2%", benefit: "Tyrosinase inhibition", mechanism: "Competitive inhibitor of tyrosinase enzyme, blocking melanin synthesis safely.", category: "Active" },
    { name: "Vitamin C (SAP)", concentration: "15%", benefit: "Antioxidant protection", mechanism: "Sodium Ascorbyl Phosphate — stable vitamin C derivative that neutralizes free radicals.", category: "Active" },
    { name: "Tranexamic Acid", concentration: "3%", benefit: "Reduces dark spots", mechanism: "Blocks plasmin pathway that triggers melanocyte stimulation post-inflammation.", category: "Active" },
  ],
};

const categoryIcons = {
  Active: Beaker,
  Delivery: Sparkles,
  Barrier: Shield,
  Soothing: Droplets,
};

const categoryColors = {
  Active: "text-[#0E39A9] bg-[#0E39A9]/5",
  Delivery: "text-purple-600 bg-purple-50",
  Barrier: "text-emerald-600 bg-emerald-50",
  Soothing: "text-sky-600 bg-sky-50",
};

interface IngredientExplorerProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
}

export function IngredientExplorer({ isOpen, onClose, productId }: IngredientExplorerProps) {
  const ingredients = ingredientDB[productId || ""] || ingredientDB.default;
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(ingredients.map((i) => i.category)))];
  const filtered = filterCategory === "All" ? ingredients : ingredients.filter((i) => i.category === filterCategory);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-lg bg-white rounded-t-3xl md:rounded-3xl max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 md:hidden">
              <div className="w-10 h-1 rounded-full bg-[#d1d5db]" />
            </div>

            {/* Header */}
            <div className="px-6 pt-4 pb-3 border-b border-[#f0f0f0] flex items-center justify-between shrink-0">
              <div>
                <p className="text-[10px] tracking-[0.12em] uppercase text-[#0E39A9] mb-1" style={{ fontWeight: 600 }}>
                  Fig. 08 — Formula
                </p>
                <h3 className="text-[#111827]" style={{ fontSize: "1.125rem", fontWeight: 600, letterSpacing: "-0.02em" }}>
                  Ingredient Explorer
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#F7F7F7] flex items-center justify-center text-[#4B5563] hover:text-[#111827] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Category filter */}
            <div className="px-6 py-3 flex gap-2 overflow-x-auto scrollbar-hide shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] transition-all duration-200 whitespace-nowrap shrink-0 ${
                    filterCategory === cat
                      ? "bg-[#0E39A9] text-white"
                      : "bg-[#F7F7F7] text-[#4B5563] hover:bg-[#e5e7eb]"
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Ingredient list */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <div className="space-y-2 pt-2">
                {filtered.map((ing, i) => {
                  const isExpanded = expandedIdx === i;
                  const Icon = categoryIcons[ing.category];
                  const colorClass = categoryColors[ing.category];

                  return (
                    <motion.div
                      key={ing.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`rounded-xl border transition-colors duration-200 ${
                        isExpanded ? "border-[#0E39A9]/20 bg-[#FAFAFA]" : "border-[#f0f0f0] bg-white"
                      }`}
                    >
                      <button
                        onClick={() => setExpandedIdx(isExpanded ? null : i)}
                        className="w-full flex items-center gap-3 p-4 text-left"
                      >
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}>
                          <Icon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] text-[#111827]" style={{ fontWeight: 600 }}>{ing.name}</span>
                            <span
                              className="text-[10px] text-[#0E39A9] bg-[#0E39A9]/5 px-2 py-0.5 rounded-full"
                              style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}
                            >
                              {ing.concentration}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#4B5563] mt-0.5">{ing.benefit}</p>
                        </div>
                        <ChevronRight
                          size={14}
                          className={`text-[#9CA3AF] shrink-0 transition-transform duration-200 ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 pt-0">
                              <div className="bg-white rounded-lg p-3 border border-[#f0f0f0]">
                                <p className="text-[10px] tracking-[0.08em] uppercase text-[#0E39A9] mb-1.5" style={{ fontWeight: 600 }}>
                                  Mechanism of Action
                                </p>
                                <p className="text-[12px] text-[#4B5563] leading-relaxed">
                                  {ing.mechanism}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

              {/* Disclaimer */}
              <p className="text-center text-[10px] text-[#9CA3AF] mt-6" style={{ fontWeight: 400 }}>
                Concentrations based on formulation specs. Results may vary by individual.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
