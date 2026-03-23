import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Sun, Moon, Clock, ShoppingBag, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { FloatingOrbs } from "../components/ui/FloatingOrbs";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { BlueBoom } from "../components/ui/BlueBoom";
import { GlassCard } from "../components/ui/GlassCard";
import { ConcernMatcher } from "../components/ui/ConcernMatcher";

const amSteps = [
  { step: 1, product: "Brightening Dual Serum", purpose: "Target pigmentation and brighten skin tone", duration: "30 seconds", application: "3-4 drops, press into skin", price: 899 },
  { step: 2, product: "Damn Dewy", purpose: "Lock in hydration for the day", duration: "45 seconds", application: "Pea-sized amount, upward strokes", price: 995 },
  { step: 3, product: "G.O.A.T Smart GuaSha", purpose: "Lift, firm, and sculpt — Anti Aging Mode", duration: "3 minutes", application: "Upward strokes, medium pressure", price: 4750 },
];

const pmSteps = [
  { step: 1, product: "Anti Aging Dual Serum", purpose: "Repair and rebuild while you sleep", duration: "30 seconds", application: "3-4 drops, gentle patting", price: 899 },
  { step: 2, product: "Collagen Bombshell", purpose: "Overnight collagen synthesis boost with Red LED", duration: "60 seconds", application: "Apply liberally, press into skin", price: 995 },
  { step: 3, product: "i-CONIC LED Eye Mask", purpose: "Targeted eye rejuvenation — LED + sonic massage", duration: "3 minutes", application: "Place over closed eyes, relax", price: 4700 },
  { step: 4, product: "Damn Dewy", purpose: "Seal everything in overnight", duration: "45 seconds", application: "Generous layer, press to lock", price: 995 },
];

export function Routines() {
  const [active, setActive] = useState<"AM" | "PM">("AM");
  const [showDrawer, setShowDrawer] = useState(false);
  const steps = active === "AM" ? amSteps : pmSteps;
  const totalPrice = steps.reduce((sum, s) => sum + s.price, 0);
  const totalTime = active === "AM" ? "4:15" : "5:15";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#030a1a]">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1676906242609-cb8a9749e95b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGFwcGx5aW5nJTIwc2tpbmNhcmUlMjBtb3JuaW5nJTIwcm91dGluZSUyMGJhdGhyb29tfGVufDF8fHx8MTc3MzIxMjA1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Routine"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030a1a]/95 via-[#030a1a]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030a1a] via-transparent to-[#030a1a]/30" />
          <FloatingOrbs color="#4B7BF5" count={3} />
        </div>
        <div className="relative max-w-[1320px] mx-auto px-4 md:px-8 py-32 md:py-0 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#4B7BF5]" />
              <span className="text-[12px] tracking-[0.3em] uppercase text-[#4B7BF5]" style={{ fontWeight: 600 }}>Protocols</span>
            </div>
            <h1 className="text-white mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.04em" }}>
              Your precision{" "}
              <span className="bg-gradient-to-r from-[#4B7BF5] to-[#5C73E6] bg-clip-text text-transparent">routine.</span>
            </h1>
            <p className="text-[#9CA3AF] max-w-md" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
              Curated AM and PM protocols designed to maximize absorption, barrier health, and visible results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Routine Builder */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <BlueBoom position="center" />
        <div className="relative max-w-3xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <p className="text-center text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-2" style={{ fontWeight: 600 }}>
              Fig. 01 — Daily Protocol
            </p>
            <h2 className="text-center mb-12" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Build Your Routine
            </h2>
          </ScrollReveal>
          {/* Toggle */}
          <div className="flex justify-center mb-16">
            <div className="bg-[#F7F7F7] rounded-full p-1.5 flex">
              <button
                onClick={() => setActive("AM")}
                className={`relative flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-[13px] sm:text-[14px] transition-all duration-300 ${
                  active === "AM" ? "text-white" : "text-[#4B5563]"
                }`}
                style={{ fontWeight: 500 }}
              >
                {active === "AM" && (
                  <motion.div layoutId="routineTab" className="absolute inset-0 bg-[#0E39A9] rounded-full" transition={{ type: "spring", bounce: 0.15, duration: 0.5 }} />
                )}
                <span className="relative z-10 flex items-center gap-2"><Sun size={16} /> AM Routine</span>
              </button>
              <button
                onClick={() => setActive("PM")}
                className={`relative flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-[13px] sm:text-[14px] transition-all duration-300 ${
                  active === "PM" ? "text-white" : "text-[#4B5563]"
                }`}
                style={{ fontWeight: 500 }}
              >
                {active === "PM" && (
                  <motion.div layoutId="routineTab" className="absolute inset-0 bg-[#111827] rounded-full" transition={{ type: "spring", bounce: 0.15, duration: 0.5 }} />
                )}
                <span className="relative z-10 flex items-center gap-2"><Moon size={16} /> PM Routine</span>
              </button>
            </div>
          </div>

          {/* Session info chips */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            <div className="flex items-center gap-1.5 bg-[#0E39A9]/5 text-[#0E39A9] px-4 py-1.5 rounded-full text-[12px]" style={{ fontWeight: 500 }}>
              <Clock size={13} /> {totalTime} total
            </div>
            <div className="flex items-center gap-1.5 bg-[#0E39A9]/5 text-[#0E39A9] px-4 py-1.5 rounded-full text-[12px]" style={{ fontWeight: 500 }}>
              {active === "AM" ? <Sun size={13} /> : <Moon size={13} />} {active} Protocol
            </div>
            <div className="flex items-center gap-1.5 bg-[#0E39A9]/5 text-[#0E39A9] px-4 py-1.5 rounded-full text-[12px]" style={{ fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>
              {steps.length} steps
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#0E39A9] via-[#0E39A9]/30 to-transparent" />

            <div className="space-y-8">
              <AnimatePresence mode="popLayout">
                {steps.map((step, i) => (
                  <motion.div
                    key={`${active}-${step.step}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: i * 0.12 }}
                    className="relative pl-16"
                  >
                    {/* Dot */}
                    <div className={`absolute left-[14px] top-6 w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] z-10 shadow-[0_0_15px_rgba(14,57,169,0.3)] ${
                      active === "AM" ? "bg-gradient-to-br from-[#0E39A9] to-[#4B7BF5]" : "bg-[#111827]"
                    }`} style={{ fontWeight: 600 }}>
                      {step.step}
                    </div>

                    <div className="bg-[#FAFAFA] rounded-xl p-6 border border-[#f0f0f0] hover:border-[#0E39A9]/20 hover:shadow-sm transition-all duration-300">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] tracking-[0.06em] uppercase text-[#9CA3AF]" style={{ fontWeight: 500 }}>
                              Step {String(step.step).padStart(2, "0")}
                            </span>
                          </div>
                          <h3 className="text-[#111827]" style={{ fontSize: "1.0625rem", fontWeight: 600 }}>{step.product}</h3>
                          <p className="text-[12px] text-[#4B5563]">{step.purpose}</p>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-[#0E39A9] shrink-0 bg-[#0E39A9]/5 px-2.5 py-1 rounded-full" style={{ fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>
                          <Clock size={12} /> {step.duration}
                        </div>
                      </div>
                      <p className="text-[12px] text-[#4B5563] bg-white rounded-lg px-3 py-2 mb-3">
                        <span style={{ fontWeight: 500 }}>Application:</span> {step.application}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[14px] text-[#111827]" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                          ₹{step.price.toLocaleString()}
                        </span>
                        <Link to="/shop" className="text-[12px] text-[#0E39A9] flex items-center gap-1" style={{ fontWeight: 500 }}>
                          View Product <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Add All to Cart — with drawer preview */}
          <div className="mt-12">
            <div className="bg-white rounded-2xl border border-[#f0f0f0] overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)]">
              <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-[13px] text-[#4B5563]" style={{ fontWeight: 500 }}>
                    Complete {active} Routine — {steps.length} products
                  </p>
                  <p className="text-[#111827]" style={{ fontSize: "1.25rem", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                    ₹{totalPrice.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowDrawer(!showDrawer)}
                    className="flex items-center gap-1 text-[12px] text-[#4B5563] hover:text-[#0E39A9] transition-colors"
                    style={{ fontWeight: 500 }}
                  >
                    Preview <ChevronDown size={14} className={`transition-transform ${showDrawer ? "rotate-180" : ""}`} />
                  </button>
                  <button className="group flex items-center gap-2 bg-[#0E39A9] text-white px-8 py-3.5 rounded-full text-[14px] hover:bg-[#0c2f8a] hover:shadow-[0_0_30px_rgba(14,57,169,0.3)] transition-all duration-300" style={{ fontWeight: 500 }}>
                    <ShoppingBag size={16} /> Add Routine to Cart
                  </button>
                </div>
              </div>

              {/* Mini Preview Drawer */}
              <AnimatePresence>
                {showDrawer && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-[#f0f0f0] p-4">
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {steps.map((step) => (
                          <div key={step.step} className="text-center">
                            <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-[#0E39A9]/5 to-[#4B7BF5]/5 flex items-center justify-center mb-2">
                              <span className="text-[#0E39A9] text-[14px]" style={{ fontWeight: 600 }}>{step.step}</span>
                            </div>
                            <p className="text-[11px] text-[#111827] truncate" style={{ fontWeight: 600 }}>{step.product}</p>
                            <p className="text-[10px] text-[#9CA3AF]" style={{ fontVariantNumeric: "tabular-nums" }}>₹{step.price}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Concern → System Matcher */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
                Fig. 02 — Find Your System
              </p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em" }}>
                Build a Routine by Concern
              </h2>
              <p className="text-[#4B5563] mt-3 max-w-lg mx-auto" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
                Select your primary concern to see the recommended system — target layer, format, routine timing, and products.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <ConcernMatcher />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0E39A9] to-[#5C73E6]" />
        <FloatingOrbs color="#ffffff" count={3} />
        <div className="relative max-w-[1320px] mx-auto px-4 md:px-8 text-center">
          <ScrollReveal>
            <h2
              className="text-white mb-4"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 600, letterSpacing: "-0.03em" }}
            >
              Ready to Start Your Protocol?
            </h2>
            <p className="text-white/60 max-w-md mx-auto mb-10" style={{ fontSize: "0.9375rem" }}>
              Shop the complete routine and save with our bundle pricing.
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