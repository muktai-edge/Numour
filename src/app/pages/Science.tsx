import { Link } from "react-router";
import { ArrowRight, Beaker, ShieldCheck, Layers, TestTube } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { FloatingOrbs } from "../components/ui/FloatingOrbs";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { BlueBoom } from "../components/ui/BlueBoom";
import { isCapture } from "../components/ui/captureMode";

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1760960067586-3999b9aae844?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBsYWJvcmF0b3J5JTIwcmVzZWFyY2glMjBzY2llbmNlfGVufDF8fHx8MTc3MzIxMjA1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  serum: "https://images.unsplash.com/photo-1765053534710-2409e33e65b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwZHJvcHBlciUyMGJvdHRsZSUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3MzIxMjA1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

const ingredients = [
  {
    name: "Niacinamide",
    type: "Vitamin B3",
    efficacy: "98%",
    benefit: "Brightening, pore refinement, oil regulation",
    concentration: "10%",
  },
  {
    name: "Hyaluronic Acid",
    type: "Polysaccharide",
    efficacy: "96%",
    benefit: "Multi-layer hydration, plumping",
    concentration: "2%",
  },
  {
    name: "Ceramide NP",
    type: "Lipid",
    efficacy: "94%",
    benefit: "Barrier repair, moisture retention",
    concentration: "3%",
  },
  {
    name: "Panthenol",
    type: "Vitamin B5",
    efficacy: "97%",
    benefit: "Soothing, anti-inflammatory, wound healing",
    concentration: "5%",
  },
  {
    name: "Squalane",
    type: "Hydrocarbon",
    efficacy: "92%",
    benefit: "Emollient, non-comedogenic moisture",
    concentration: "8%",
  },
  {
    name: "Tocopherol",
    type: "Vitamin E",
    efficacy: "90%",
    benefit: "Antioxidant protection, UV defense",
    concentration: "1%",
  },
];

const skinLayers = [
  { name: "Stratum Corneum", depth: "Surface", role: "Barrier & protection", color: "#0E39A9" },
  { name: "Epidermis", depth: "0.1mm", role: "Cell renewal & hydration", color: "#2D5FD6" },
  { name: "Dermis", depth: "1-2mm", role: "Collagen, elastin, blood supply", color: "#5C73E6" },
];

export function Science() {
  return (
    <div className="min-h-screen bg-white">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#030a1a]">
          <ImageWithFallback
            src={IMAGES.hero}
            alt="Science"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030a1a]/95 via-[#030a1a]/70 to-[#030a1a]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030a1a] via-transparent to-[#030a1a]/30" />
          <FloatingOrbs color="#4B7BF5" count={4} />
        </div>

        <div className="relative max-w-[1320px] mx-auto px-4 md:px-8 py-32 md:py-0 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#4B7BF5]" />
                <span className="text-[12px] tracking-[0.3em] uppercase text-[#4B7BF5]" style={{ fontWeight: 600 }}>
                  Science
                </span>
              </div>
              <h1
                className="text-white mb-6"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4rem)",
                  fontWeight: 600,
                  lineHeight: 1.05,
                  letterSpacing: "-0.04em",
                }}
              >
                Evidence over{" "}
                <span className="bg-gradient-to-r from-[#4B7BF5] to-[#5C73E6] bg-clip-text text-transparent">
                  marketing.
                </span>
              </h1>
              <p className="text-[#9CA3AF] max-w-md" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
                Every ingredient is clinically validated. Every concentration is optimized. Every
                claim is testable. This is skincare built on data, not hype.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_80px_-20px_rgba(75,123,245,0.3)]">
                <ImageWithFallback src={IMAGES.serum} alt="Science" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ THREE PILLARS ═══ */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <BlueBoom position="center" />
        <div className="relative max-w-[1320px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
                Framework
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                }}
              >
                The Numour Science Model
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Beaker,
                title: "Ingredient Efficacy",
                desc: "We only use ingredients with peer-reviewed clinical evidence at concentrations proven to deliver results. No marketing molecules.",
              },
              {
                icon: Layers,
                title: "Depth-Targeted Delivery",
                desc: "Our 3-layer depth model ensures each active ingredient reaches its target skin layer — surface, mid, or deep dermis.",
              },
              {
                icon: ShieldCheck,
                title: "Barrier-First Protocol",
                desc: "Every formulation is designed to strengthen the skin barrier. We never compromise barrier integrity for short-term results.",
              },
            ].map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.1}>
                <div className="group bg-[#FAFAFA] rounded-2xl p-8 border border-[#f0f0f0] hover:border-[#0E39A9]/20 hover:shadow-[0_20px_60px_-12px_rgba(14,57,169,0.08)] transition-all duration-500 h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#0E39A9]/5 flex items-center justify-center mb-6 group-hover:bg-[#0E39A9]/10 transition-colors">
                    <p.icon size={22} className="text-[#0E39A9]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[#111827] mb-3" style={{ fontSize: "1.125rem", fontWeight: 600 }}>
                    {p.title}
                  </h3>
                  <p className="text-[13px] text-[#4B5563] leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INGREDIENT DATABASE ═══ */}
      <section className="py-28 md:py-36 bg-[#FAFAFA]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
                Ingredients
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                }}
              >
                Ingredient Database
              </h2>
              <p className="text-[#4B5563] mt-3 max-w-md mx-auto" style={{ fontSize: "0.9375rem" }}>
                Every active ingredient we use, with its clinical concentration and validated
                efficacy rate.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ingredients.map((ing, i) => (
              <ScrollReveal key={ing.name} delay={i * 0.06}>
                <div className="group bg-white rounded-2xl p-6 border border-[#f0f0f0] hover:border-[#0E39A9]/20 hover:shadow-[0_20px_60px_-12px_rgba(14,57,169,0.08)] transition-all duration-500">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-[#111827]" style={{ fontSize: "1rem", fontWeight: 600 }}>
                        {ing.name}
                      </h4>
                      <p className="text-[11px] text-[#9CA3AF]" style={{ fontWeight: 500 }}>
                        {ing.type}
                      </p>
                    </div>
                    <span
                      className="text-[#0E39A9] bg-[#0E39A9]/5 px-3 py-1 rounded-full text-[12px]"
                      style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}
                    >
                      {ing.concentration}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#4B5563] leading-relaxed mb-4">{ing.benefit}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-[#F7F7F7] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#0E39A9] to-[#4B7BF5] rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: ing.efficacy }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                      />
                    </div>
                    <span
                      className="text-[12px] text-[#0E39A9]"
                      style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}
                    >
                      {ing.efficacy}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SKIN DEPTH MODEL ═══ */}
      <section className="py-28 md:py-36">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div>
                <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
                  Depth Model
                </p>
                <h2
                  className="mb-6"
                  style={{
                    fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.03em",
                  }}
                >
                  3-Layer Skin Depth Model
                </h2>
                <p className="text-[#4B5563] mb-8" style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}>
                  Different actives need to reach different depths to be effective. Our delivery
                  system targets each layer precisely.
                </p>
                <div className="space-y-4">
                  {skinLayers.map((layer) => (
                    <div
                      key={layer.name}
                      className="flex items-center gap-4 p-4 bg-[#FAFAFA] rounded-xl border border-[#f0f0f0] hover:border-[#0E39A9]/20 transition-colors"
                    >
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: layer.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[#111827]" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                          {layer.name}
                        </p>
                        <p className="text-[11px] text-[#4B5563]">{layer.role}</p>
                      </div>
                      <span
                        className="text-[11px] text-[#0E39A9] shrink-0 bg-[#0E39A9]/5 px-3 py-1 rounded-full"
                        style={{ fontWeight: 500, fontVariantNumeric: "tabular-nums" }}
                      >
                        {layer.depth}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="aspect-square rounded-3xl bg-gradient-to-b from-[#0E39A9]/5 to-[#5C73E6]/5 border border-[#f0f0f0] flex items-center justify-center p-10 overflow-hidden relative">
                {/* Animated layers */}
                <div className="w-full max-w-xs space-y-4">
                  {skinLayers.map((layer, i) => (
                    <motion.div
                      key={layer.name}
                      {...(isCapture ? {} : { initial: { opacity: 0, x: -40, scaleX: 0.8 }, whileInView: { opacity: 1, x: 0, scaleX: 1 }, viewport: { once: true }, transition: { delay: 0.2 + i * 0.25, duration: 0.7, ease: "easeOut" } })}
                      className="relative rounded-2xl overflow-hidden"
                      style={{ height: 60 + i * 20 }}
                    >
                      <div
                        className="absolute inset-0 flex items-center justify-between px-6 text-white"
                        style={{ backgroundColor: layer.color }}
                      >
                        <span className="text-[13px]" style={{ fontWeight: 500 }}>
                          {layer.name}
                        </span>
                        <span className="text-[11px] opacity-70" style={{ fontVariantNumeric: "tabular-nums" }}>
                          {layer.depth}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  {/* Arrow indicator */}
                  <motion.div
                    {...(isCapture ? {} : { initial: { opacity: 0, y: -20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: 1.2 } })}
                    className="text-center pt-4"
                  >
                    <p className="text-[11px] text-[#0E39A9]" style={{ fontWeight: 500 }}>
                      ↑ Active ingredients penetrate to target depth
                    </p>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ TESTING ═══ */}
      <section className="py-28 md:py-36 bg-[#FAFAFA]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8 text-center">
          <ScrollReveal>
            <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
              Validation
            </p>
            <h2
              className="mb-12"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
              }}
            >
              Our Testing Approach
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {[
              {
                icon: TestTube,
                title: "In-vitro Testing",
                desc: "Lab-validated ingredient performance",
              },
              { icon: Beaker, title: "Stability Testing", desc: "12-month accelerated stability" },
              {
                icon: ShieldCheck,
                title: "Dermatologist Tested",
                desc: "Panel-tested on Indian skin types",
              },
              {
                icon: Layers,
                title: "Penetration Assay",
                desc: "Franz cell diffusion studies",
              },
            ].map((t, i) => (
              <ScrollReveal key={t.title} delay={i * 0.08}>
                <div className="group bg-white rounded-2xl p-7 border border-[#f0f0f0] hover:border-[#0E39A9]/20 hover:shadow-[0_20px_60px_-12px_rgba(14,57,169,0.08)] transition-all duration-500 h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#0E39A9]/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#0E39A9]/10 transition-colors">
                    <t.icon size={22} className="text-[#0E39A9]" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-[#111827] mb-2" style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
                    {t.title}
                  </h4>
                  <p className="text-[12px] text-[#4B5563] leading-relaxed">{t.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0E39A9] to-[#5C73E6]" />
        <FloatingOrbs color="#ffffff" count={3} />
        <div className="relative max-w-[1320px] mx-auto px-4 md:px-8 text-center">
          <ScrollReveal>
            <h2
              className="text-white mb-4"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
              }}
            >
              See the Science in Action
            </h2>
            <p className="text-white/60 max-w-md mx-auto mb-10" style={{ fontSize: "0.9375rem" }}>
              Experience the difference evidence-based skincare makes.
            </p>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 bg-white text-[#0E39A9] px-10 py-4 rounded-full text-[14px] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all"
              style={{ fontWeight: 600 }}
            >
              Shop Now{" "}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}