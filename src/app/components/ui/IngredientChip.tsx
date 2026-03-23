import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlassCard } from "./GlassCard";

interface Ingredient {
  name: string;
  role: string;
  mechanism: string;
  concentration: string;
}

interface IngredientChipProps {
  ingredient: Ingredient;
}

export function IngredientChip({ ingredient }: IngredientChipProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`px-4 py-2 rounded-full text-[12px] border transition-all duration-300 ${
          open
            ? "bg-[#0E39A9] text-white border-[#0E39A9] shadow-[0_0_20px_rgba(14,57,169,0.3)]"
            : "bg-white text-[#111827] border-[#e5e7eb] hover:border-[#0E39A9]/40 hover:shadow-sm"
        }`}
        style={{ fontWeight: 500 }}
      >
        {ingredient.name}
        <span className={`ml-1.5 text-[10px] ${open ? "text-white/70" : "text-[#0E39A9]"}`} style={{ fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>
          {ingredient.concentration}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-0 z-30 w-64"
          >
            <GlassCard className="p-4">
              <p className="text-[11px] tracking-[0.1em] uppercase text-[#0E39A9] mb-1" style={{ fontWeight: 600 }}>
                {ingredient.name}
              </p>
              <p className="text-[13px] text-[#111827] mb-2" style={{ fontWeight: 600 }}>{ingredient.role}</p>
              <p className="text-[11px] text-[#4B5563] leading-relaxed">{ingredient.mechanism}</p>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
