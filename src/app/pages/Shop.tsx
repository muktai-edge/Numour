import { useState } from "react";
import { SlidersHorizontal, X, Eye, ShoppingBag, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ProductCard } from "../components/ProductCard";
import { QuickViewSheet } from "../components/QuickViewSheet";
import { products, type Product } from "../data/products";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { FloatingOrbs } from "../components/ui/FloatingOrbs";

const categoryFilters = ["All", "Smart Jar Series", "Smart Devices", "Smart Skincare"];
const concernFilters = [
  "All",
  "Hydration",
  "Barrier repair",
  "Acne",
  "Anti-aging",
  "Pigmentation",
  "Firming",
  "Sculpting",
];
const techFilters = [
  { label: "Blue LED", key: "blue-led" },
  { label: "Red LED", key: "red-led" },
  { label: "Thermal", key: "thermal" },
  { label: "Cryo", key: "cryo" },
  { label: "Sonic", key: "sonic" },
  { label: "EMS", key: "ems" },
];

const techFilterMap: Record<string, string[]> = {
  "blue-led": ["damn-dewy"],
  "red-led": ["collagen-bombshell", "iconic-led", "goat-guasha"],
  "thermal": ["goat-guasha"],
  "cryo": ["goat-guasha"],
  "sonic": ["boss-sonic-scrubber", "iconic-led"],
  "ems": ["goat-guasha"],
};

export function Shop() {
  const [category, setCategory] = useState("All");
  const [concern, setConcern] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTech, setActiveTech] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  let filtered = products.filter((p) => {
    if (category !== "All" && p.category !== category) return false;
    if (concern !== "All" && !p.concern.includes(concern)) return false;
    if (activeTech.length > 0) {
      const matchIds = activeTech.flatMap((t) => techFilterMap[t] || []);
      if (!matchIds.includes(p.id)) return false;
    }
    return true;
  });

  if (sortBy === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered.sort((a, b) => b.price - a.price);

  const hasActiveFilters = category !== "All" || concern !== "All" || activeTech.length > 0;

  const toggleTech = (key: string) => {
    setActiveTech((prev) =>
      prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]
    );
  };

  const clearAll = () => {
    setCategory("All");
    setConcern("All");
    setActiveTech([]);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ═══ HERO ═══ */}
      <section className="relative pt-20 md:pt-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#FAFAFA]">
          <FloatingOrbs color="#0E39A9" count={3} className="opacity-30" />
        </div>
        <div className="relative max-w-[1320px] mx-auto px-4 md:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#0E39A9]" />
              <span
                className="text-[12px] tracking-[0.3em] uppercase text-[#0E39A9]"
                style={{ fontWeight: 600 }}
              >
                Shop
              </span>
            </div>
            <h1
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.04em",
              }}
            >
              All Products
            </h1>
            <p className="mt-3 text-[#4B5563] max-w-md" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
              Precision-engineered skincare and technology devices for Indian skin.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1320px] mx-auto px-4 md:px-8 pb-28">
        {/* ═══ STICKY TOOLBAR ═══ */}
        <div className="sticky top-[64px] md:top-[72px] z-20 bg-white/90 backdrop-blur-xl -mx-4 px-4 md:-mx-8 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-[#f0f0f0]">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] transition-all duration-300 shrink-0 ${
                  showFilters
                    ? "bg-[#0E39A9] text-white"
                    : "bg-[#F7F7F7] text-[#4B5563] hover:bg-[#ebebeb]"
                }`}
                style={{ fontWeight: 500 }}
              >
                <SlidersHorizontal size={14} /> Filters
                {hasActiveFilters && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </button>

              {/* Quick tech filter pills (mobile-visible) */}
              {techFilters.map((t) => (
                <button
                  key={t.key}
                  onClick={() => toggleTech(t.key)}
                  className={`px-3 py-1.5 rounded-full text-[11px] transition-all duration-200 whitespace-nowrap shrink-0 ${
                    activeTech.includes(t.key)
                      ? "bg-[#0E39A9] text-white"
                      : "bg-[#F7F7F7] text-[#4B5563] hover:bg-[#e5e7eb]"
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  {t.label}
                </button>
              ))}

              {hasActiveFilters && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1 px-3 py-1.5 text-[11px] text-[#0E39A9] bg-[#0E39A9]/5 rounded-full hover:bg-[#0E39A9]/10 transition-colors shrink-0"
                  style={{ fontWeight: 500 }}
                >
                  Clear <X size={10} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[12px] text-[#9CA3AF] hidden sm:inline" style={{ fontVariantNumeric: "tabular-nums" }}>
                {filtered.length} products
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-[13px] text-[#4B5563] bg-[#F7F7F7] border-none rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#0E39A9] cursor-pointer"
                style={{ fontWeight: 500 }}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* ═══ EXPANDED FILTERS PANEL ═══ */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mb-8 p-6 bg-[#FAFAFA] rounded-2xl space-y-5 border border-[#f0f0f0]">
                <div>
                  <p
                    className="text-[11px] tracking-[0.1em] uppercase text-[#9CA3AF] mb-3"
                    style={{ fontWeight: 600 }}
                  >
                    Category
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categoryFilters.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCategory(c)}
                        className={`px-4 py-1.5 rounded-full text-[12px] transition-all duration-300 ${
                          category === c
                            ? "bg-[#0E39A9] text-white shadow-sm"
                            : "bg-white text-[#4B5563] border border-[#e5e7eb] hover:border-[#0E39A9]/30"
                        }`}
                        style={{ fontWeight: 500 }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p
                    className="text-[11px] tracking-[0.1em] uppercase text-[#9CA3AF] mb-3"
                    style={{ fontWeight: 600 }}
                  >
                    Concern
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {concernFilters.map((c) => (
                      <button
                        key={c}
                        onClick={() => setConcern(c)}
                        className={`px-4 py-1.5 rounded-full text-[12px] transition-all duration-300 ${
                          concern === c
                            ? "bg-[#0E39A9] text-white shadow-sm"
                            : "bg-white text-[#4B5563] border border-[#e5e7eb] hover:border-[#0E39A9]/30"
                        }`}
                        style={{ fontWeight: 500 }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p
                    className="text-[11px] tracking-[0.1em] uppercase text-[#9CA3AF] mb-3"
                    style={{ fontWeight: 600 }}
                  >
                    Technology
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {techFilters.map((t) => (
                      <button
                        key={t.key}
                        onClick={() => toggleTech(t.key)}
                        className={`px-4 py-1.5 rounded-full text-[12px] transition-all duration-300 ${
                          activeTech.includes(t.key)
                            ? "bg-[#0E39A9] text-white shadow-sm"
                            : "bg-white text-[#4B5563] border border-[#e5e7eb] hover:border-[#0E39A9]/30"
                        }`}
                        style={{ fontWeight: 500 }}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ GRID ═══ */}
        <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative group/card"
              >
                <ProductCard product={product} />
                {/* Quick View overlay button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuickViewProduct(product);
                  }}
                  className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#4B5563] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 hover:text-[#0E39A9] shadow-sm"
                >
                  <Eye size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#0E39A9]/5 flex items-center justify-center mx-auto mb-4">
              <SlidersHorizontal size={24} className="text-[#0E39A9]" />
            </div>
            <p className="text-[#4B5563] mb-3" style={{ fontSize: "1rem", fontWeight: 500 }}>
              No products match your filters
            </p>
            <button
              onClick={clearAll}
              className="text-[13px] text-[#0E39A9]"
              style={{ fontWeight: 500 }}
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Quick View */}
      <QuickViewSheet product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
