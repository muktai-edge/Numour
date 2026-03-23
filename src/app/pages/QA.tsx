import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Zap, Droplets, Shield, Atom, Layers, Timer, Target, Eye, ShoppingBag } from "lucide-react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { MetricTile } from "../components/ui/CountUp";

/* ── Typography Styles ── */
const textStyles = [
  { name: "H1", tag: "h1", sample: "The Science of Better Skin", style: { fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.15 } },
  { name: "H2", tag: "h2", sample: "The Numour Method", style: { fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2 } },
  { name: "H3", tag: "h3", sample: "Ingredient Delivery", style: { fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.35 } },
  { name: "Body", tag: "p", sample: "Every ingredient is clinically validated at effective concentrations. No fillers. No marketing molecules.", style: { fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.7, color: "#4B5563" } },
  { name: "Caption", tag: "p", sample: "Fig. 01 — Based on internal usage data. Results may vary.", style: { fontSize: "0.6875rem", fontWeight: 400, lineHeight: 1.5, color: "#9CA3AF" } },
  { name: "Overline", tag: "p", sample: "Fig. 02 — Our Philosophy", style: { fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#0E39A9", lineHeight: 1.5 } },
];

/* ── Spacing Tokens ── */
const spacingTokens = [
  { name: "--space-1", value: "8px" },
  { name: "--space-2", value: "12px" },
  { name: "--space-3", value: "16px" },
  { name: "--space-4", value: "24px" },
  { name: "--space-5", value: "32px" },
  { name: "--space-6", value: "40px" },
  { name: "--space-7", value: "56px" },
  { name: "--space-8", value: "72px" },
];

/* ── Radius Tokens ── */
const radiusTokens = [
  { name: "Button", value: "12px", css: "--radius-button" },
  { name: "Card", value: "16px", css: "--radius-card" },
  { name: "Hero", value: "20px", css: "--radius-hero" },
  { name: "Chip", value: "999px", css: "--radius-chip" },
];

/* ── Color Palette ── */
const colors = [
  { name: "Numour Blue", value: "#0E39A9", css: "--numour-blue" },
  { name: "Blue Light", value: "#4B7BF5", css: "--numour-blue-light" },
  { name: "Ink", value: "#111827", css: "--numour-ink" },
  { name: "Body", value: "#4B5563", css: "--numour-body" },
  { name: "Caption", value: "#6B7280", css: "--numour-caption" },
  { name: "Muted", value: "#9CA3AF", css: "--numour-muted" },
  { name: "Surface", value: "#F7F7F7", css: "--numour-surface" },
  { name: "Border", value: "#f0f0f0", css: "--numour-border" },
];

export function QA() {
  return (
    <div className="pt-20 pb-32 min-h-screen bg-white">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        {/* Page header */}
        <div className="text-center mb-20 pt-10">
          <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
            Design System QA
          </p>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 600, letterSpacing: "-0.03em" }}>
            Pixel Perfect QA
          </h1>
          <p className="text-[#4B5563] mt-3 max-w-lg mx-auto" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
            Comprehensive design token audit, component states, grid alignment, and typography normalization.
          </p>
        </div>

        {/* ── SECTION 1: Product Card Grid — Equal Heights ── */}
        <section className="mb-24">
          <SectionHeader number="01" label="Product Card Grid" description="Proving equal heights and pinned baselines across rows" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-6 p-4 bg-[#F7F7F7] rounded-xl">
            <p className="text-[11px] text-[#4B5563]" style={{ fontWeight: 500 }}>
              Checklist: 1:1 media aspect ratio, 2-line title clamp (min-height: 2.7em), max 2 tags + "+N", price row pinned to bottom with hairline separator, single badge max (Bestseller), discount chip in price row only.
            </p>
          </div>
        </section>

        {/* ── SECTION 2: Spacing Tokens ── */}
        <section className="mb-24">
          <SectionHeader number="02" label="Spacing Tokens" description="8-point grid system with 8 defined steps" />
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {spacingTokens.map((token) => (
              <div key={token.name} className="text-center">
                <div className="bg-[#F7F7F7] rounded-xl p-4 mb-3 flex items-end justify-center" style={{ height: 100 }}>
                  <div
                    className="bg-[#0E39A9]/20 rounded"
                    style={{ width: parseInt(token.value), height: parseInt(token.value), maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
                <p className="text-[11px] text-[#111827]" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                  {token.value}
                </p>
                <p className="text-[10px] text-[#9CA3AF]" style={{ fontWeight: 500 }}>{token.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: Radius Tokens ── */}
        <section className="mb-24">
          <SectionHeader number="03" label="Radius Tokens" description="Consistent border-radius across component categories" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {radiusTokens.map((token) => (
              <div key={token.name} className="bg-[#F7F7F7] rounded-xl p-6 text-center">
                <div
                  className="w-20 h-20 bg-[#0E39A9]/10 border-2 border-[#0E39A9]/30 mx-auto mb-4"
                  style={{ borderRadius: token.value }}
                />
                <p className="text-[13px] text-[#111827]" style={{ fontWeight: 600 }}>{token.name}</p>
                <p className="text-[11px] text-[#9CA3AF]" style={{ fontVariantNumeric: "tabular-nums", fontWeight: 500 }}>{token.value}</p>
                <p className="text-[10px] text-[#0E39A9]/50 mt-1" style={{ fontWeight: 500 }}>{token.css}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 4: Color Palette ── */}
        <section className="mb-24">
          <SectionHeader number="04" label="Color Palette" description="Brand and semantic colors with CSS custom property names" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colors.map((c) => (
              <div key={c.name} className="bg-white border border-[#f0f0f0] rounded-2xl overflow-hidden">
                <div className="h-20" style={{ backgroundColor: c.value }} />
                <div className="p-4">
                  <p className="text-[13px] text-[#111827]" style={{ fontWeight: 600 }}>{c.name}</p>
                  <p className="text-[11px] text-[#9CA3AF]" style={{ fontWeight: 500, fontFamily: "monospace" }}>{c.value}</p>
                  <p className="text-[10px] text-[#0E39A9]/50 mt-0.5" style={{ fontWeight: 500 }}>{c.css}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 5: Typography Styles ── */}
        <section className="mb-24">
          <SectionHeader number="05" label="Typography" description="6 locked text styles — H1, H2, H3, Body, Caption, Overline" />
          <div className="space-y-6">
            {textStyles.map((ts) => (
              <div key={ts.name} className="bg-white border border-[#f0f0f0] rounded-2xl p-6 flex items-start gap-6">
                <div className="shrink-0 w-20">
                  <span className="text-[10px] tracking-[0.08em] uppercase text-[#0E39A9] bg-[#0E39A9]/5 px-2.5 py-1 rounded-full" style={{ fontWeight: 600 }}>
                    {ts.name}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p style={ts.style}>{ts.sample}</p>
                  <div className="flex flex-wrap gap-3 mt-3">
                    {Object.entries(ts.style).map(([k, v]) => (
                      <span key={k} className="text-[10px] text-[#9CA3AF] bg-[#F7F7F7] px-2 py-0.5 rounded" style={{ fontFamily: "monospace", fontWeight: 400 }}>
                        {k}: {String(v)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 6: Component States ── */}
        <section className="mb-24">
          <SectionHeader number="06" label="Component States" description="Default, hover, and active states for buttons, chips, and cards" />

          <div className="grid md:grid-cols-3 gap-8">
            {/* Buttons */}
            <div className="bg-[#F7F7F7] rounded-2xl p-6">
              <p className="text-[11px] tracking-[0.08em] uppercase text-[#0E39A9] mb-6" style={{ fontWeight: 600 }}>
                Button States
              </p>
              <div className="space-y-4">
                <StateRow label="Default">
                  <button
                    className="bg-[#0E39A9] text-white px-6 rounded-full text-[14px] flex items-center justify-center"
                    style={{ fontWeight: 500, height: 44, borderRadius: 12 }}
                  >
                    Add to Cart
                  </button>
                </StateRow>
                <StateRow label="Hover">
                  <button
                    className="bg-[#0c2f8a] text-white px-6 rounded-full text-[14px] flex items-center justify-center shadow-[0_0_30px_rgba(14,57,169,0.3)]"
                    style={{ fontWeight: 500, height: 44, borderRadius: 12 }}
                  >
                    Add to Cart
                  </button>
                </StateRow>
                <StateRow label="Active">
                  <button
                    className="bg-[#0a2670] text-white px-6 rounded-full text-[14px] flex items-center justify-center scale-[0.97]"
                    style={{ fontWeight: 500, height: 44, borderRadius: 12 }}
                  >
                    Add to Cart
                  </button>
                </StateRow>
              </div>
            </div>

            {/* Chips */}
            <div className="bg-[#F7F7F7] rounded-2xl p-6">
              <p className="text-[11px] tracking-[0.08em] uppercase text-[#0E39A9] mb-6" style={{ fontWeight: 600 }}>
                Chip States
              </p>
              <div className="space-y-4">
                <StateRow label="Default">
                  <span className="inline-flex items-center text-[10px] tracking-[0.06em] uppercase text-[#0E39A9]/70 bg-[#0E39A9]/[0.04] px-3 rounded-full" style={{ fontWeight: 500, height: 28 }}>
                    Skincare
                  </span>
                </StateRow>
                <StateRow label="Hover">
                  <span className="inline-flex items-center text-[10px] tracking-[0.06em] uppercase text-[#0E39A9] bg-[#0E39A9]/[0.08] px-3 rounded-full" style={{ fontWeight: 500, height: 28 }}>
                    Skincare
                  </span>
                </StateRow>
                <StateRow label="Active">
                  <span className="inline-flex items-center text-[10px] tracking-[0.06em] uppercase text-white bg-[#0E39A9] px-3 rounded-full" style={{ fontWeight: 600, height: 28 }}>
                    Skincare
                  </span>
                </StateRow>
              </div>
            </div>

            {/* Card borders */}
            <div className="bg-[#F7F7F7] rounded-2xl p-6">
              <p className="text-[11px] tracking-[0.08em] uppercase text-[#0E39A9] mb-6" style={{ fontWeight: 600 }}>
                Card States
              </p>
              <div className="space-y-4">
                <StateRow label="Default">
                  <div className="bg-white rounded-2xl border border-[#f0f0f0] p-4 w-full">
                    <div className="h-2 w-3/4 bg-[#F3F4F6] rounded mb-2" />
                    <div className="h-2 w-1/2 bg-[#F3F4F6] rounded" />
                  </div>
                </StateRow>
                <StateRow label="Hover">
                  <div className="bg-white rounded-2xl border border-[#0E39A9]/15 p-4 w-full shadow-[0_20px_60px_-12px_rgba(14,57,169,0.12)] -translate-y-0.5">
                    <div className="h-2 w-3/4 bg-[#F3F4F6] rounded mb-2" />
                    <div className="h-2 w-1/2 bg-[#F3F4F6] rounded" />
                  </div>
                </StateRow>
                <StateRow label="Active">
                  <div className="bg-white rounded-2xl border border-[#0E39A9]/30 p-4 w-full shadow-[0_0_0_2px_rgba(14,57,169,0.08)]">
                    <div className="h-2 w-3/4 bg-[#0E39A9]/10 rounded mb-2" />
                    <div className="h-2 w-1/2 bg-[#0E39A9]/10 rounded" />
                  </div>
                </StateRow>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 7: Metric Tiles (CountUp + Sparkline) ── */}
        <section className="mb-24">
          <SectionHeader number="07" label="Metric Tiles" description="Count-up animation on scroll with sparkline background" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricTile value={14200} suffix="+" label="Routines completed" />
            <MetricTile value={96} suffix="%" label="Visible improvement" />
            <MetricTile value={72} suffix="h" label="Moisture retention" />
            <MetricTile value={2} suffix=".1x" label="Better absorption" />
          </div>
        </section>

        {/* ── SECTION 8: Hairline Border ── */}
        <section className="mb-24">
          <SectionHeader number="08" label="Hairline Border" description="Single consistent 1px border style used everywhere" />
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl" style={{ border: "1px solid #f0f0f0" }}>
              <p className="text-[11px] text-[#9CA3AF] mb-2" style={{ fontWeight: 500 }}>Card border</p>
              <p className="text-[12px] text-[#111827]" style={{ fontFamily: "monospace" }}>1px solid #f0f0f0</p>
            </div>
            <div className="p-6 bg-white rounded-2xl" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
              <p className="text-[11px] text-[#9CA3AF] mb-2" style={{ fontWeight: 500 }}>Hairline (CSS var)</p>
              <p className="text-[12px] text-[#111827]" style={{ fontFamily: "monospace" }}>1px solid rgba(0,0,0,0.06)</p>
            </div>
            <div className="p-6 bg-white rounded-2xl relative overflow-hidden" style={{ border: "1px solid #f0f0f0" }}>
              <p className="text-[11px] text-[#9CA3AF] mb-2" style={{ fontWeight: 500 }}>Separator</p>
              <div className="h-px bg-[#f0f0f0] my-3" />
              <p className="text-[12px] text-[#111827]" style={{ fontFamily: "monospace" }}>h-px bg-[#f0f0f0]</p>
            </div>
          </div>
        </section>

        {/* ── SECTION 9: Icon Grid (32x32, 1.5px stroke) ── */}
        <section className="mb-24">
          <SectionHeader number="09" label="Icon Grid" description="Standardized 32x32 containers with 1.5px stroke weight" />
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {[
              { icon: Zap, label: "Zap" },
              { icon: Droplets, label: "Droplets" },
              { icon: Shield, label: "Shield" },
              { icon: Atom, label: "Atom" },
              { icon: Layers, label: "Layers" },
              { icon: Timer, label: "Timer" },
              { icon: Target, label: "Target" },
              { icon: Eye, label: "Eye" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="w-8 h-8 rounded-lg bg-[#0E39A9]/5 flex items-center justify-center mx-auto mb-2">
                  <item.icon size={18} strokeWidth={1.5} className="text-[#0E39A9]" />
                </div>
                <p className="text-[10px] text-[#9CA3AF]" style={{ fontWeight: 500 }}>{item.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-[#F7F7F7] rounded-xl">
            <p className="text-[11px] text-[#4B5563]" style={{ fontWeight: 500 }}>
              All icons use Lucide React at 18px within 32x32 containers. Stroke weight standardized to 1.5px across the site.
            </p>
          </div>
        </section>

        {/* ── SECTION 10: Component Sizing ── */}
        <section className="mb-24">
          <SectionHeader number="09" label="Component Sizing" description="Fixed heights for buttons, chips, badges" />
          <div className="flex flex-wrap gap-6 items-end bg-[#F7F7F7] rounded-2xl p-8">
            <div className="text-center">
              <button className="bg-[#0E39A9] text-white px-6 text-[14px] rounded-xl" style={{ fontWeight: 500, height: 48 }}>
                Mobile Button
              </button>
              <p className="text-[10px] text-[#9CA3AF] mt-2" style={{ fontVariantNumeric: "tabular-nums" }}>48px (mobile)</p>
            </div>
            <div className="text-center">
              <button className="bg-[#0E39A9] text-white px-6 text-[14px] rounded-xl" style={{ fontWeight: 500, height: 44 }}>
                Desktop Button
              </button>
              <p className="text-[10px] text-[#9CA3AF] mt-2" style={{ fontVariantNumeric: "tabular-nums" }}>44px (desktop)</p>
            </div>
            <div className="text-center">
              <span className="inline-flex items-center text-[10px] uppercase text-[#0E39A9] bg-[#0E39A9]/5 px-3 rounded-full" style={{ fontWeight: 500, height: 28 }}>
                Chip
              </span>
              <p className="text-[10px] text-[#9CA3AF] mt-2" style={{ fontVariantNumeric: "tabular-nums" }}>28px</p>
            </div>
            <div className="text-center">
              <span className="inline-flex items-center text-[10px] uppercase text-white bg-[#0E39A9] px-3 rounded-full" style={{ fontWeight: 600, height: 24 }}>
                Badge
              </span>
              <p className="text-[10px] text-[#9CA3AF] mt-2" style={{ fontVariantNumeric: "tabular-nums" }}>24px</p>
            </div>
            <div className="text-center">
              <span className="inline-flex items-center text-[10px] text-green-700 bg-green-50 px-1.5 rounded" style={{ fontWeight: 600, height: 20 }}>
                -15%
              </span>
              <p className="text-[10px] text-[#9CA3AF] mt-2" style={{ fontVariantNumeric: "tabular-nums" }}>20px (discount)</p>
            </div>
          </div>
        </section>

        {/* ── Motion Demos Link ── */}
        <section className="mb-16">
          <SectionHeader number="11" label="Motion Demos" description="Interactive demos of all animation patterns used across the site" />
          <Link
            to="/motion-demos"
            className="group flex items-center justify-between bg-gradient-to-r from-[#0E39A9] to-[#1a47c4] rounded-2xl p-8 text-white hover:shadow-[0_20px_60px_-12px_rgba(14,57,169,0.3)] transition-all duration-500"
          >
            <div>
              <p className="text-white/60 text-[12px] tracking-[0.12em] uppercase mb-2" style={{ fontWeight: 600 }}>Engineering Playground</p>
              <p style={{ fontSize: "1.25rem", fontWeight: 600 }}>View Motion Demos</p>
              <p className="text-white/60 text-[13px] mt-1">Chapter indicator, line-draw, depth strips, hotspot blur, timer ring, parallax</p>
            </div>
            <ArrowRight size={24} className="text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all shrink-0 ml-6" />
          </Link>
        </section>
      </div>
    </div>
  );
}

/* ── Helper Components ── */

function SectionHeader({ number, label, description }: { number: string; label: string; description: string }) {
  return (
    <ScrollReveal>
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] tracking-[0.1em] uppercase text-[#0E39A9] bg-[#0E39A9]/5 w-7 h-7 rounded-lg flex items-center justify-center" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
            {number}
          </span>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em" }}>
            {label}
          </h2>
        </div>
        <p className="text-[13px] text-[#4B5563] ml-10" style={{ lineHeight: 1.6 }}>
          {description}
        </p>
        <motion.div
          className="mt-4 h-px bg-[#0E39A9]/10 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </ScrollReveal>
  );
}

function StateRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[10px] uppercase text-[#9CA3AF] w-14 shrink-0" style={{ fontWeight: 500 }}>
        {label}
      </span>
      {children}
    </div>
  );
}