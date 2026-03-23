import { Link } from "react-router";
import { ArrowRight, Thermometer, Lightbulb, Scan, Layers } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { FloatingOrbs } from "../components/ui/FloatingOrbs";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { BlueBoom } from "../components/ui/BlueBoom";

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1764350126614-2e529016729c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGJsdWUlMjBsaWdodCUyMHBhcnRpY2xlcyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzczMjEyMDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  delivery: "https://images.unsplash.com/photo-1765053534710-2409e33e65b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwZHJvcHBlciUyMGJvdHRsZSUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3MzIxMjA1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  cryoHeat: "https://images.unsplash.com/photo-1770680425428-489c9565bf94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGRyb3BsZXRzJTIwbWFjcm8lMjBibHVlJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzczMjEyMDYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  led: "https://images.unsplash.com/photo-1547637974-a0d8a38ebbda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMRUQlMjBmYWNpYWwlMjBkZXZpY2UlMjBiZWF1dHklMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MzIxMjA1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  scanner: "https://images.unsplash.com/photo-1760960067586-3999b9aae844?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBsYWJvcmF0b3J5JTIwcmVzZWFyY2glMjBzY2llbmNlfGVufDF8fHx8MTc3MzIxMjA1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  device: "https://images.unsplash.com/photo-1702261952308-6492b50a0022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHRlY2hub2xvZ3klMjBkZXZpY2UlMjBiZWF1dHklMjB0b29sfGVufDF8fHx8MTc3MzIwODQ4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

const technologies = [
  {
    icon: Layers,
    title: "Smart Delivery System",
    subtitle: "Encapsulation Technology",
    description:
      "Our proprietary encapsulation technology wraps active ingredients in nano-lipid carriers that penetrate 2.1× deeper than traditional topical application. Each carrier is calibrated to release its payload at the correct skin depth.",
    specs: [
      { label: "Absorption Rate", value: "2.1×" },
      { label: "Carrier Size", value: "80nm" },
      { label: "Release Depth", value: "3 layers" },
    ],
    image: IMAGES.delivery,
  },
  {
    icon: Thermometer,
    title: "Cryo-Heat Module",
    subtitle: "Dual Temperature Technology",
    description:
      "The dual-temperature module alternates between precision cooling (5°C) and therapeutic heat (42°C). Cold constricts to reduce puffiness and pore size, while heat expands pathways for deeper product absorption.",
    specs: [
      { label: "Cold Mode", value: "5°C" },
      { label: "Heat Mode", value: "42°C" },
      { label: "Precision", value: "±0.5°C" },
    ],
    image: IMAGES.cryoHeat,
  },
  {
    icon: Lightbulb,
    title: "LED Light Array",
    subtitle: "Multi-Spectrum Therapy",
    description:
      "Medical-grade LED arrays emit precisely calibrated wavelengths targeting specific skin concerns. Red light (630nm) stimulates collagen, blue light (415nm) targets acne bacteria, and near-infrared (850nm) penetrates deepest for cellular repair.",
    specs: [
      { label: "Red Light", value: "630nm" },
      { label: "Blue Light", value: "415nm" },
      { label: "NIR", value: "850nm" },
    ],
    image: IMAGES.led,
  },
  {
    icon: Scan,
    title: "UV Skin Scanner",
    subtitle: "Sub-Surface Analysis",
    description:
      "Professional-grade UV analysis at 365nm wavelength reveals sun damage, dehydration patterns, and bacterial colonies invisible to the naked eye. Provides baseline and progress tracking data for your skincare protocol.",
    specs: [
      { label: "Wavelength", value: "365nm" },
      { label: "Analysis", value: "6 layers" },
      { label: "Accuracy", value: "94%" },
    ],
    image: IMAGES.scanner,
  },
];

export function Technology() {
  return (
    <div className="min-h-screen bg-white">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#030a1a]">
          <ImageWithFallback
            src={IMAGES.hero}
            alt="Technology"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030a1a]/90 via-[#030a1a]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030a1a] via-transparent to-transparent" />
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
                <span
                  className="text-[12px] tracking-[0.3em] uppercase text-[#4B7BF5]"
                  style={{ fontWeight: 600 }}
                >
                  Technology
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
                The science of{" "}
                <span className="bg-gradient-to-r from-[#4B7BF5] to-[#5C73E6] bg-clip-text text-transparent">
                  getting it in.
                </span>
              </h1>
              <p className="text-[#9CA3AF] max-w-md mb-10" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
                70% of skincare never penetrates the barrier. Our technology changes that with
                precision delivery systems and smart devices engineered for Indian skin.
              </p>
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 bg-[#0E39A9] text-white px-8 py-4 rounded-full text-[14px] hover:bg-[#1245c7] hover:shadow-[0_0_40px_rgba(14,57,169,0.4)] transition-all duration-300"
                style={{ fontWeight: 500 }}
              >
                Shop Devices{" "}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_80px_-20px_rgba(75,123,245,0.3)]">
                <ImageWithFallback
                  src={IMAGES.device}
                  alt="Device"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ TECHNOLOGIES ═══ */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <BlueBoom position="center" />
        <div className="relative max-w-[1320px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-20">
              <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
                Engineered for Performance
              </p>
              <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 600, letterSpacing: "-0.03em" }}>
                Our Technology Stack
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-24">
            {technologies.map((tech, i) => {
              const isReversed = i % 2 === 1;
              return (
                <ScrollReveal key={tech.title}>
                  <div className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center ${isReversed ? "md:[direction:rtl]" : ""}`}>
                    <div className={isReversed ? "md:[direction:ltr]" : ""}>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-12 h-12 rounded-xl bg-[#0E39A9]/5 flex items-center justify-center">
                          <tech.icon size={22} className="text-[#0E39A9]" strokeWidth={1.5} />
                        </div>
                        <span
                          className="text-[11px] tracking-[0.1em] uppercase text-[#0E39A9]"
                          style={{ fontWeight: 600 }}
                        >
                          {tech.subtitle}
                        </span>
                      </div>
                      <h3 className="text-[#111827] mb-4" style={{ fontSize: "1.75rem", fontWeight: 600, letterSpacing: "-0.02em" }}>
                        {tech.title}
                      </h3>
                      <p className="text-[#4B5563] mb-8" style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}>
                        {tech.description}
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {tech.specs.map((spec) => (
                          <div key={spec.label} className="bg-[#FAFAFA] rounded-xl p-4 text-center border border-[#f0f0f0] hover:border-[#0E39A9]/20 transition-colors">
                            <p className="text-[#0E39A9] mb-1" style={{ fontSize: "1.25rem", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                              {spec.value}
                            </p>
                            <p className="text-[10px] text-[#9CA3AF] uppercase tracking-[0.06em]" style={{ fontWeight: 500 }}>
                              {spec.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={`${isReversed ? "md:[direction:ltr]" : ""}`}>
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_60px_-12px_rgba(0,0,0,0.1)] group">
                        <ImageWithFallback
                          src={tech.image}
                          alt={tech.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
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
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 600, letterSpacing: "-0.03em" }}
            >
              Experience the Difference
            </h2>
            <p className="text-white/60 max-w-md mx-auto mb-10" style={{ fontSize: "0.9375rem" }}>
              Technology-delivered skincare that actually works.
            </p>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 bg-white text-[#0E39A9] px-10 py-4 rounded-full text-[14px] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all"
              style={{ fontWeight: 600 }}
            >
              Shop Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}