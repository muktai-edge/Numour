import { useState, useMemo } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Eye } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { QuickViewSheet } from "../components/QuickViewSheet";
import { products, type Product } from "../data/products";
import { FloatingOrbs } from "../components/ui/FloatingOrbs";
import { ScrollReveal } from "../components/ui/ScrollReveal";

const collectionMeta: Record<string, { title: string; subtitle: string; category: string }> = {
  "smart-jar-series": {
    title: "Smart Jar Series",
    subtitle: "LED-powered smart jars that keep your skincare active and fresh.",
    category: "Smart Jar Series",
  },
  "smart-devices": {
    title: "Smart Devices",
    subtitle: "Professional-grade skincare devices designed for Indian skin.",
    category: "Smart Devices",
  },
  "smart-skincare": {
    title: "Smart Skincare",
    subtitle: "Clinically formulated serums, creams, and treatments.",
    category: "Smart Skincare",
  },
};

const sortOptions = ["Recommended", "Price: Low to High", "Price: High to Low", "Newest"];

export function Collection() {
  const { slug } = useParams<{ slug: string }>();
  const meta = collectionMeta[slug || ""];
  const [activeConcern, setActiveConcern] = useState("All");
  const [sort, setSort] = useState("Recommended");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    let list = meta
      ? products.filter((p) => p.category === meta.category)
      : products;
    if (activeConcern !== "All") {
      list = list.filter((p) => p.concern.includes(activeConcern));
    }
    if (sort === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [meta, activeConcern, sort]);

  const allConcerns = useMemo(() => {
    const base = meta
      ? products.filter((p) => p.category === meta.category)
      : products;
    const set = new Set<string>();
    base.forEach((p) => p.concern.forEach((c) => set.add(c)));
    return ["All", ...Array.from(set)];
  }, [meta]);

  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[#111827] mb-4" style={{ fontSize: "2rem", fontWeight: 600 }}>
            Collection not found
          </h1>
          <Link to="/" className="text-[#0E39A9] text-[14px]" style={{ fontWeight: 500 }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-20 md:pt-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#FAFAFA]">
          <FloatingOrbs color="#0E39A9" count={3} className="opacity-30" />
        </div>
        <div className="relative max-w-[1320px] mx-auto px-4 md:px-8 py-16 md:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#0E39A9]" />
              <span className="text-[12px] tracking-[0.3em] uppercase text-[#0E39A9]" style={{ fontWeight: 600 }}>
                Collection
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 600, letterSpacing: "-0.04em" }}>
              {meta.title}
            </h1>
            <p className="text-[#4B5563] mt-3 max-w-lg" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
              {meta.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-12 md:py-16 pb-20 md:pb-24">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          {/* Sticky filter bar */}
          <div className="sticky top-[64px] md:top-[72px] z-20 bg-white/90 backdrop-blur-xl -mx-4 px-4 md:-mx-8 md:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-[#f0f0f0]">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-0.5">
              {allConcerns.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveConcern(c)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] transition-all duration-200 ${
                    activeConcern === c
                      ? "bg-[#0E39A9] text-white"
                      : "bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]"
                  }`}
                  style={{ fontWeight: activeConcern === c ? 600 : 500 }}
                >
                  {c}
                </button>
              ))}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[12px] text-[#9CA3AF] hidden sm:inline" style={{ fontVariantNumeric: "tabular-nums" }}>
                  {filtered.length} products
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="text-[13px] text-[#4B5563] bg-[#F7F7F7] border-none rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#0E39A9] cursor-pointer"
                  style={{ fontWeight: 500 }}
                >
                  {sortOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative group/card"
                >
                  <ProductCard product={p} />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setQuickViewProduct(p);
                    }}
                    className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#4B5563] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 hover:text-[#0E39A9] shadow-sm"
                  >
                    <Eye size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#9CA3AF]" style={{ fontSize: "0.9375rem" }}>
                No products match your filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Quick View Sheet */}
      {quickViewProduct && (
        <QuickViewSheet product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
}