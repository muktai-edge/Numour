import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { FloatingOrbs } from "../components/ui/FloatingOrbs";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { BlueBoom } from "../components/ui/BlueBoom";
import { isCapture } from "../components/ui/captureMode";

const IMAGES = {
  founder: "https://images.unsplash.com/photo-1758691737587-7630b4d31d16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGVudHJlcHJlbmV1ciUyMGZvdW5kZXIlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzMxOTM2OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  lab: "https://images.unsplash.com/photo-1760960067586-3999b9aae844?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBsYWJvcmF0b3J5JTIwcmVzZWFyY2glMjBzY2llbmNlfGVufDF8fHx8MTc3MzIxMjA1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  gradient: "https://images.unsplash.com/photo-1694698955114-82c37b89f961?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwYWJzdHJhY3QlMjBncmFkaWVudCUyMG1lc2glMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3MzIxMjA1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

const values = [
  {
    title: "Science Over Marketing",
    desc: "Every claim is backed by clinical evidence. We don't sell dreams — we sell data-proven results.",
    number: "01",
  },
  {
    title: "Indian Skin First",
    desc: "Formulated specifically for the unique needs of Indian skin — humidity, pollution, melanin-rich conditions.",
    number: "02",
  },
  {
    title: "Technology-Delivered",
    desc: "Getting ingredients into the skin is the real challenge. Our delivery systems solve the 70% problem.",
    number: "03",
  },
  {
    title: "Barrier Non-Negotiable",
    desc: "We never compromise your skin barrier for short-term results. Long-term health is the only metric.",
    number: "04",
  },
];

const milestones = [
  { year: "2021", event: "Founded after 11 years in brand-building" },
  { year: "2022", event: "Launched first Smart Jar technology" },
  { year: "2023", event: "14,200+ routines completed nationwide" },
  { year: "2024", event: "Introduced device ecosystem: GuaSha + LED" },
  { year: "2025", event: "96% customer satisfaction rate achieved" },
];

export function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#030a1a]">
          <ImageWithFallback
            src={IMAGES.gradient}
            alt="About"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030a1a] via-[#030a1a]/70 to-[#030a1a]/50" />
          <FloatingOrbs color="#4B7BF5" count={4} />
        </div>
        <div className="relative max-w-[1320px] mx-auto px-4 md:px-8 py-32 md:py-0 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#4B7BF5]" />
              <span className="text-[12px] tracking-[0.3em] uppercase text-[#4B7BF5]" style={{ fontWeight: 600 }}>
                About Numour
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
              Born out of chaos, caffeine, and{" "}
              <span className="bg-gradient-to-r from-[#4B7BF5] to-[#5C73E6] bg-clip-text text-transparent">
                one obsession.
              </span>
            </h1>
            <p className="text-[#9CA3AF] max-w-md" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
              India's performance-first skincare technology brand. We build products that actually
              work — because if it doesn't go in, it doesn't work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOUNDER STORY ═══ */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <BlueBoom position="bottom-left" />
        <div className="relative max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)]">
                  <ImageWithFallback
                    src={IMAGES.founder}
                    alt="Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -z-10 -top-6 -left-6 w-full h-full rounded-3xl border-2 border-[#0E39A9]/10" />
                {/* Floating stat */}
                <motion.div
                  {...(isCapture ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: 0.5 } })}
                  className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] p-5 border border-[#f0f0f0]"
                >
                  <p className="text-[11px] tracking-[0.1em] uppercase text-[#0E39A9] mb-1" style={{ fontWeight: 600 }}>
                    Experience
                  </p>
                  <p className="text-[#111827]" style={{ fontSize: "1.75rem", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                    11+
                  </p>
                  <p className="text-[12px] text-[#4B5563]">years in brand-building</p>
                </motion.div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
                The Founder
              </p>
              <h2
                className="mb-8"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  fontWeight: 600,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                }}
              >
                The Girl Behind
                <br />
                the Chaos
              </h2>
              <div className="space-y-5 text-[#4B5563]" style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}>
                <p>
                  After 11 years of building brands like ACT II, Philips, and Urban Company, I
                  learnt something wild — 70% of skincare we apply doesn't even go in. So I did what
                  any marketing nerd with trust issues would do: build a brand that actually works.
                </p>
                <p>
                  That's how Numour was born — out of chaos, caffeine, and one obsession: to make
                  science sexy and skincare smart.
                </p>
                <p>
                  Every product is insight-driven, tech-backed, and proudly made for Indian skin.
                </p>
                <div className="bg-gradient-to-r from-[#0E39A9]/5 to-transparent rounded-xl p-5 border-l-2 border-[#0E39A9]">
                  <p className="text-[#0E39A9]" style={{ fontWeight: 500 }}>
                    "If it doesn't go in, it doesn't work. And that's our whole deal."
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="py-28 md:py-36 bg-[#FAFAFA]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
                Values
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                }}
              >
                What We Stand For
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className="group bg-white rounded-2xl p-8 border border-[#f0f0f0] hover:border-[#0E39A9]/20 hover:shadow-[0_20px_60px_-12px_rgba(14,57,169,0.08)] transition-all duration-500 h-full">
                  <span className="text-[32px] text-[#0E39A9]/10 mb-2 block" style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
                    {v.number}
                  </span>
                  <h3 className="text-[#111827] mb-3" style={{ fontSize: "1.0625rem", fontWeight: 600 }}>
                    {v.title}
                  </h3>
                  <p className="text-[13px] text-[#4B5563] leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="py-28 md:py-36">
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
                Journey
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                }}
              >
                Our Timeline
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#0E39A9] via-[#0E39A9]/30 to-transparent" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <ScrollReveal key={m.year} delay={i * 0.1}>
                  <div className="relative pl-16">
                    <div
                      className="absolute left-[10px] top-1 w-8 h-8 rounded-full bg-gradient-to-br from-[#0E39A9] to-[#4B7BF5] text-white flex items-center justify-center text-[10px] z-10 shadow-[0_0_20px_rgba(14,57,169,0.3)]"
                      style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}
                    >
                      {m.year.slice(2)}
                    </div>
                    <div className="bg-[#FAFAFA] rounded-xl p-5 border border-[#f0f0f0] hover:border-[#0E39A9]/20 hover:shadow-sm transition-all duration-300">
                      <span
                        className="text-[12px] text-[#0E39A9]"
                        style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}
                      >
                        {m.year}
                      </span>
                      <p className="text-[#111827] mt-1" style={{ fontSize: "0.9375rem", fontWeight: 500 }}>
                        {m.event}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ IMAGE STRIP ═══ */}
      <section className="py-0">
        <div className="aspect-[21/9] md:aspect-[21/6] overflow-hidden relative">
          <ImageWithFallback
            src={IMAGES.lab}
            alt="Numour Lab"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E39A9]/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
            <p className="text-white/60 text-[12px] tracking-[0.2em] uppercase" style={{ fontWeight: 500 }}>
              Numour Lab, India
            </p>
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
              Join the Precision Skincare Revolution
            </h2>
            <p className="text-white/60 max-w-md mx-auto mb-10" style={{ fontSize: "0.9375rem" }}>
              Experience skincare that's backed by science, not marketing.
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