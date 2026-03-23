import { useState, useRef } from "react";
import { Link } from "react-router";
import { ShoppingBag, Plus } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Product } from "../data/products";

export function ProductCard({ product }: { product: Product }) {
  const displayTags = product.tags.slice(0, 2);
  const extraTags = product.tags.length - 2;
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link
      ref={cardRef}
      to={`/product/${product.id}`}
      className="group relative flex flex-col bg-white overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_-12px_rgba(14,57,169,0.12)] hover:-translate-y-1"
      style={{ borderRadius: 16, border: "1px solid var(--numour-border, #f0f0f0)" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Shine effect */}
      {isHovered && (
        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-40 transition-opacity"
          style={{
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(14,57,169,0.06), transparent 60%)`,
          }}
        />
      )}

      {/* ── 1:1 Media — consistent aspect ratio ── */}
      <div className="relative aspect-square bg-[#F7F7F7] overflow-hidden shrink-0" style={{ minHeight: 140 }}>
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Single badge — consistent position */}
        {product.isBestseller && (
          <span
            className="absolute top-3 left-3 bg-[#0E39A9] text-white px-3 rounded-full text-[10px] tracking-[0.08em] uppercase flex items-center"
            style={{ fontWeight: 600, height: 24 }}
          >
            Bestseller
          </span>
        )}

        {/* Quick add FAB */}
        <motion.button
          initial={false}
          animate={{ y: isHovered ? 0 : 16, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-[#0E39A9] flex items-center justify-center shadow-lg hover:bg-[#0E39A9] hover:text-white transition-colors z-20"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        >
          <Plus size={16} strokeWidth={2.5} />
        </motion.button>
      </div>

      {/* ── Content — flex-col with pinned CTA ── */}
      <div className="flex flex-col flex-1 p-4">
        {/* Tags — max 2 + "+N", consistent chip height */}
        <div className="flex items-center gap-1.5 mb-2" style={{ minHeight: 22 }}>
          {displayTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center text-[9px] tracking-[0.06em] uppercase text-[#0E39A9]/70 bg-[#0E39A9]/[0.04] px-2.5 rounded-full"
              style={{ fontWeight: 500, height: 22 }}
            >
              {tag}
            </span>
          ))}
          {extraTags > 0 && (
            <span
              className="inline-flex items-center text-[9px] text-[#9CA3AF] bg-[#F3F4F6] px-2 rounded-full"
              style={{ fontWeight: 500, height: 22 }}
            >
              +{extraTags}
            </span>
          )}
        </div>

        {/* Name — clamped 2 lines, fixed line-height for alignment */}
        <h3
          className="text-[#111827] line-clamp-2 group-hover:text-[#0E39A9] transition-colors duration-300"
          style={{ fontSize: "0.9375rem", fontWeight: 600, lineHeight: 1.35, minHeight: "2.7em" }}
        >
          {product.name}
        </h3>

        {/* Benefit — single line clamp, then pushes price down */}
        <p className="text-[12px] text-[#4B5563] line-clamp-1 mt-1 mb-auto">{product.keyBenefit}</p>

        {/* ── Price Row — pinned baseline ── */}
        <div
          className="flex items-center justify-between mt-4 pt-3"
          style={{ borderTop: "1px solid var(--numour-border, #f0f0f0)" }}
        >
          <div className="flex items-baseline gap-2">
            <span
              className="text-[#111827]"
              style={{ fontSize: "1rem", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}
            >
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span
                className="text-[12px] text-[#9CA3AF] line-through"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
            {/* Discount pill — always in price row, never floating */}
            {discount > 0 && (
              <span
                className="inline-flex items-center text-[10px] text-green-700 bg-green-50 px-1.5 rounded"
                style={{ fontWeight: 600, height: 20 }}
              >
                -{discount}%
              </span>
            )}
          </div>

          {/* CTA — pinned bottom, fixed height */}
          <button
            className="w-9 h-9 rounded-full bg-[#0E39A9] text-white flex items-center justify-center hover:bg-[#0c2f8a] transition-all duration-300 hover:scale-105 active:scale-95 shrink-0"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          >
            <ShoppingBag size={14} strokeWidth={2} />
          </button>
        </div>
      </div>
    </Link>
  );
}
