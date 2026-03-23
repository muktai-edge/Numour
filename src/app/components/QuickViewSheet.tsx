import { useState } from "react";
import { Link } from "react-router";
import { X, ShoppingBag, Star, Check, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Product } from "../data/products";

interface QuickViewSheetProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewSheet({ product, onClose }: QuickViewSheetProps) {
  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <AnimatePresence>
      {product && (
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
            className="relative w-full max-w-md md:max-w-lg bg-white rounded-t-3xl md:rounded-3xl max-h-[85vh] overflow-y-auto"
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle (mobile) */}
            <div className="flex justify-center pt-3 pb-1 md:hidden">
              <div className="w-10 h-1 rounded-full bg-[#d1d5db]" />
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#4B5563] hover:text-[#111827] shadow-sm transition-colors"
            >
              <X size={16} />
            </button>

            {/* Image */}
            <div className="aspect-[4/3] bg-[#F7F7F7] overflow-hidden">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Tags */}
              <div className="flex items-center gap-1.5 mb-3">
                {product.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center text-[9px] tracking-[0.06em] uppercase text-[#0E39A9]/70 bg-[#0E39A9]/[0.04] px-2.5 rounded-full"
                    style={{ fontWeight: 500, height: 22 }}
                  >
                    {tag}
                  </span>
                ))}
                {product.isBestseller && (
                  <span
                    className="inline-flex items-center text-[9px] tracking-[0.06em] uppercase text-white bg-[#0E39A9] px-2.5 rounded-full"
                    style={{ fontWeight: 600, height: 22 }}
                  >
                    Bestseller
                  </span>
                )}
              </div>

              <h3 className="text-[#111827] mb-1" style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em" }}>
                {product.name}
              </h3>
              <p className="text-[13px] text-[#4B5563] mb-4 leading-relaxed">{product.description}</p>

              {/* Benefit chip */}
              <div className="flex items-center gap-2 mb-4">
                <Check size={14} className="text-[#0E39A9]" />
                <span className="text-[12px] text-[#4B5563]" style={{ fontWeight: 500 }}>{product.keyBenefit}</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[#111827]" style={{ fontSize: "1.5rem", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-[14px] text-[#9CA3AF] line-through" style={{ fontVariantNumeric: "tabular-nums" }}>
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {discount > 0 && (
                  <span className="text-[10px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>
                    Save {discount}%
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className="fill-[#0E39A9] text-[#0E39A9]" />
                  ))}
                </div>
                <span className="text-[11px] text-[#4B5563]">4.9</span>
              </div>

              {/* CTAs */}
              <div className="flex gap-3">
                <button
                  className="flex-1 flex items-center justify-center gap-2 bg-[#0E39A9] text-white py-3.5 rounded-full text-[14px] hover:bg-[#0c2f8a] transition-all active:scale-[0.98]"
                  style={{ fontWeight: 500 }}
                >
                  <ShoppingBag size={16} /> Add to Cart
                </button>
                <Link
                  to={`/product/${product.id}`}
                  className="flex items-center justify-center gap-1 px-5 py-3.5 rounded-full text-[13px] text-[#0E39A9] border border-[#0E39A9]/20 hover:bg-[#0E39A9]/5 transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  Details <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
