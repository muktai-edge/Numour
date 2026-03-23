import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Shield,
  Atom,
  Play,
  MousePointerClick,
  Sun,
  Moon,
  ShoppingBag,
  Eye,
} from "lucide-react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";
import { FloatingOrbs } from "../components/ui/FloatingOrbs";
import { Marquee } from "../components/ui/Marquee";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { BlueBoom } from "../components/ui/BlueBoom";
import { GlassCard } from "../components/ui/GlassCard";

import { DeliveryEngine } from "../components/ui/DeliveryEngine";
import { IngredientProofCards } from "../components/ui/IngredientProofCards";
import { BarrierSimulator } from "../components/ui/BarrierSimulator";
import { isCapture } from "../components/ui/captureMode";
import { ProtocolPlayer } from "../components/ui/ProtocolPlayer";
import { ToolsCapabilityMap } from "../components/ui/ToolsCapabilityMap";
import { ConcernMatcher } from "../components/ui/ConcernMatcher";
import { ChapterProgress } from "../components/ui/ChapterProgress";
import { SectionDivider } from "../components/ui/ScrollReveal";
import { MetricTile } from "../components/ui/CountUp";
import { VisualCatalogHotspots } from "../components/ui/VisualCatalogHotspots";
import { QuickViewSheet } from "../components/QuickViewSheet";
import type { Product } from "../data/products";

/* ─── Images ─── */
const IMAGES = {
  heroModel:
    "https://images.unsplash.com/photo-1667382137969-a11fd256717d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBJbmRpYW4lMjB3b21hbiUyMHJhZGlhbnQlMjBza2luJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMjEyMDU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  creamTexture:
    "https://images.unsplash.com/photo-1753945967432-5a520d796e1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBza2luY2FyZSUyMGNyZWFtJTIwdGV4dHVyZSUyMHdoaXRlJTIwbWluaW1hbHxlbnwxfHx8fDE3NzMyMTIwNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  serumDropper:
    "https://images.unsplash.com/photo-1765053534710-2409e33e65b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwZHJvcHBlciUyMGJvdHRsZSUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3MzIxMjA1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  lab: "https://images.unsplash.com/photo-1760960067586-3999b9aae844?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBsYWJvcmF0b3J5JTIwcmVzZWFyY2glMjBzY2llbmNlfGVufDF8fHx8MTc3MzIxMjA1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  gradientAbstract:
    "https://images.unsplash.com/photo-1694698955114-82c37b89f961?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwYWJzdHJhY3QlMjBncmFkaWVudCUyMG1lc2glMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3MzIxMjA1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  skincareMorning:
    "https://images.unsplash.com/photo-1676906242609-cb8a9749e95b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGFwcGx5aW5nJTIwc2tpbmNhcmUlMjBtb3JuaW5nJTIwcm91dGluZSUyMGJhdGhyb29tfGVufDF8fHx8MTc3MzIxMjA1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  glowingSkin:
    "https://images.unsplash.com/photo-1579801874037-f28c38c7edbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGdsb3dpbmclMjBza2luJTIwYWZ0ZXIlMjBmYWNpYWwlMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzczMjEyMDYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  moisturizerSwirl:
    "https://images.unsplash.com/photo-1590923801255-05c5e06536f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoeWRyYXRpbmclMjBtb2lzdHVyaXplciUyMGNyZWFtJTIwc3dpcmwlMjB0ZXh0dXJlfGVufDF8fHx8MTc3MzIxMjA2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  waterDroplets:
    "https://images.unsplash.com/photo-1770680425428-489c9565bf94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGRyb3BsZXRzJTIwbWFjcm8lMjBibHVlJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzczMjEyMDYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  guasha:
    "https://images.unsplash.com/photo-1664549761426-6a1cb1032854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwbWFzc2FnZSUyMHN0b25lJTIwdG9vbCUyMGJlYXV0eXxlbnwxfHx8fDE3NzMyMTIwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  techParticles:
    "https://images.unsplash.com/photo-1764350126614-2e529016729c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGJsdWUlMjBsaWdodCUyMHBhcnRpY2xlcyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzczMjEyMDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  clearSkin:
    "https://images.unsplash.com/photo-1737978697863-5d65495b28ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGNsZWFyJTIwc2tpbiUyMGNsb3NldXAlMjBiZWF1dHklMjBwb3J0cmFpdCUyMG5hdHVyYWx8ZW58MXx8fHwxNzczMjEyMDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  founder:
    "https://images.unsplash.com/photo-1758691737587-7630b4d31d16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGVudHJlcHJlbmV1ciUyMGZvdW5kZXIlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzMxOTM2OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ledDevice:
    "https://images.unsplash.com/photo-1547637974-a0d8a38ebbda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMRUQlMjBmYWNpYWwlMjBkZXZpY2UlMjBiZWF1dHklMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MzIxMjA1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

/* ─── Hero Slides ─── */
const heroSlides = [
  {
    headline: (
      <>
        If it doesn't{" "}
        <span className="bg-gradient-to-r from-[#4B7BF5] via-[#0E39A9] to-[#5C73E6] bg-clip-text text-transparent">
          go in,
        </span>
        <br />
        it doesn't work.
      </>
    ),
    subtitle: "Brand Thesis",
    description:
      "Clinically meaningful actives + delivery systems designed to reach where change happens.",
    image: IMAGES.heroModel,
    cta: { label: "Shop All", to: "/shop" },
  },
  {
    headline: (
      <>
        Delivery is{" "}
        <span className="bg-gradient-to-r from-[#4B7BF5] via-[#0E39A9] to-[#5C73E6] bg-clip-text text-transparent">
          the difference.
        </span>
      </>
    ),
    subtitle: "Delivery Proof",
    description:
      "Because results happen below the surface.",
    image: IMAGES.serumDropper,
    cta: { label: "Explore Smart Jars", to: "/collection/smart-jar-series" },
  },
  {
    headline: (
      <>
        Tools that support{" "}
        <span className="bg-gradient-to-r from-[#4B7BF5] via-[#0E39A9] to-[#5C73E6] bg-clip-text text-transparent">
          results.
        </span>
      </>
    ),
    subtitle: "Device Ecosystem",
    description:
      "Mode-led routines built for repeatable performance.",
    image: IMAGES.ledDevice,
    cta: { label: "Explore Devices", to: "/collection/smart-devices" },
  },
];

/* ─── Tabs ─── */
const categories = ["Bestsellers", "Smart Jar Series", "Smart Devices", "Smart Skincare"];

/* ─── Testimonials ─── */
const testimonials = [
  {
    name: "Priya S.",
    rating: 5,
    text: "Damn Dewy completely transformed my skin. The hydration lasts all day, even in Mumbai humidity. Nothing else has come close.",
    product: "Damn Dewy",
    avatar: "PS",
  },
  {
    name: "Ananya R.",
    rating: 5,
    text: "I was skeptical about the 72-hour claim, but my skin genuinely stays moisturized. The texture is incredible — lightweight but so effective.",
    product: "Damn Dewy",
    avatar: "AR",
  },
  {
    name: "Kavya M.",
    rating: 5,
    text: "The GuaSha device is next level. My jawline is more defined and the hot/cold modes feel so professional. Love the build quality.",
    product: "G.O.A.T Smart GuaSha",
    avatar: "KM",
  },
  {
    name: "Rhea D.",
    rating: 4,
    text: "Collagen Bombshell has made my skin feel noticeably firmer. My fine lines around the eyes are softer. Truly impressed.",
    product: "Collagen Bombshell",
    avatar: "RD",
  },
];

/* ─── AM/PM Routine ─── */
const amRoutine = [
  { step: 1, product: "Brightening Dual Serum", purpose: "Brighten", time: "30s" },
  { step: 2, product: "Damn Dewy", purpose: "Hydrate", time: "45s" },
  { step: 3, product: "G.O.A.T Smart GuaSha", purpose: "Sculpt", time: "180s" },
];
const pmRoutine = [
  { step: 1, product: "Anti Aging Dual Serum", purpose: "Repair", time: "30s" },
  { step: 2, product: "Collagen Bombshell", purpose: "Firm", time: "60s" },
  { step: 3, product: "i-CONIC LED Eye Mask", purpose: "Eye Treatment", time: "180s" },
];

/* ─── Trust Badges ─── */
const trustBadges = [
  "Dermatologically Tested",
  "Clinically Validated",
  "Made for Indian Skin",
  "Cruelty Free",
  "Precision Engineered",
  "Barrier-Safe Formula",
];

/* ─── The Numour Method ─── */
const methodPrinciples = [
  {
    icon: Atom,
    title: "Clinically Meaningful Actives",
    desc: "Every ingredient is clinically validated at effective concentrations. No fillers. No marketing molecules.",
    image: IMAGES.lab,
    ingredients: [
      { name: "Niacinamide", role: "Brightening agent", mechanism: "Inhibits melanosome transfer to keratinocytes, reducing pigmentation at source.", concentration: "10%" },
      { name: "Hyaluronic Acid", role: "Hydration multiplier", mechanism: "Multi-weight HA binds 1000× its weight in water across epidermal layers.", concentration: "2%" },
      { name: "Ceramide NP", role: "Barrier lipid", mechanism: "Replenishes intercellular lipids in stratum corneum, restoring barrier function.", concentration: "3%" },
    ],
  },
  {
    icon: Droplets,
    title: "Delivery-Led Design",
    desc: "Getting ingredients through the skin barrier is the real challenge. Our delivery systems ensure deep penetration.",
    image: IMAGES.serumDropper,
    detail: "skin-depth",
  },
  {
    icon: Shield,
    title: "Barrier-First Tolerance",
    desc: "A healthy barrier is non-negotiable. Every product strengthens — never compromises — your skin's natural defense.",
    image: IMAGES.moisturizerSwirl,
    detail: "barrier",
  },
];

/* ─── Video Wall ─── */
const videoWall = [
  { id: 1, title: "Morning Routine", tags: ["Routine", "Tutorial"], thumb: IMAGES.skincareMorning },
  { id: 2, title: "Damn Dewy Application", tags: ["Product", "How-to"], thumb: IMAGES.creamTexture },
  { id: 3, title: "GuaSha Technique", tags: ["Device", "Tutorial"], thumb: IMAGES.guasha },
  { id: 4, title: "Barrier Science", tags: ["Science", "Education"], thumb: IMAGES.lab },
];

export function Home() {
  const [activeTab, setActiveTab] = useState("Bestsellers");
  const [activeRoutine, setActiveRoutine] = useState<"AM" | "PM">("AM");
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [heroIdx, setHeroIdx] = useState(0);
  const [activeRule, setActiveRule] = useState(0);
  const [videoModal, setVideoModal] = useState<number | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [stickyLabel, setStickyLabel] = useState("Shop");
  const [showStickyPill, setShowStickyPill] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const scrollYProgress = useMotionValue(0);
  useEffect(() => {
    const update = () => {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / (rect.height || 1), 0), 1);
      scrollYProgress.set(progress);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrollYProgress]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const filteredProducts =
    activeTab === "Bestsellers"
      ? products.filter((p) => p.isBestseller)
      : products.filter((p) => p.category === activeTab);
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products.slice(0, 4);

  // Auto-rotate hero
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Sticky pill scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setShowStickyPill(y > window.innerHeight * 0.8);
      const sections = [
        { id: "sec-products", label: "Shop Products" },
        { id: "sec-concern", label: "Find Your Fix" },
        { id: "sec-routine", label: "Build Routine" },
        { id: "sec-reviews", label: "See Reviews" },
      ];
      let label = "Shop";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 300) label = s.label;
      }
      setStickyLabel(label);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentSlide = heroSlides[heroIdx];

  const homeChapters = [
    { id: "sec-hero", number: "01", label: "Hero" },
    { id: "sec-proof", number: "02", label: "Proof" },
    { id: "sec-philosophy", number: "03", label: "Method" },
    { id: "sec-video", number: "04", label: "Video" },
    { id: "sec-products", number: "05", label: "Products" },
    { id: "sec-concern", number: "06", label: "Concerns" },
    { id: "sec-tools", number: "07", label: "Tools" },
    { id: "sec-routine", number: "08", label: "Routine" },
    { id: "sec-reviews", number: "09", label: "Reviews" },
    { id: "sec-founder", number: "10", label: "Founder" },
  ];

  return (
    <div className="relative overflow-hidden">
      <ChapterProgress chapters={homeChapters} />

      {/* ═══ SECTION 1: HERO CAROUSEL ═══ */}
      <section id="sec-hero" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 bg-[#030a1a]">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIdx}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <motion.div style={{ scale: heroScale }} className="absolute inset-0">
                <ImageWithFallback
                  src={currentSlide.image}
                  alt="Hero"
                  className="w-full h-full object-cover opacity-40"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-[#030a1a]/95 via-[#030a1a]/70 to-[#030a1a]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030a1a] via-transparent to-[#030a1a]/30" />
          <FloatingOrbs color="#0E39A9" count={4} />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-[1320px] mx-auto px-4 md:px-8 py-32 md:py-0 w-full"
        >
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroIdx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-12 bg-[#0E39A9]" />
                  <span
                    className="text-[12px] tracking-[0.3em] uppercase text-[#0E39A9]"
                    style={{ fontWeight: 600 }}
                  >
                    {currentSlide.subtitle}
                  </span>
                </div>

                <h1
                  className="text-white mb-6"
                  style={{
                    fontSize: "clamp(2.75rem, 7vw, 5rem)",
                    fontWeight: 600,
                    lineHeight: 1.02,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {currentSlide.headline}
                </h1>

                <p
                  className="text-[#9CA3AF] max-w-md mb-12"
                  style={{ fontSize: "1.125rem", lineHeight: 1.8 }}
                >
                  {currentSlide.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to={currentSlide.cta.to}
                    className="group inline-flex items-center gap-2.5 bg-[#0E39A9] text-white px-8 py-4 rounded-full text-[14px] hover:bg-[#1245c7] transition-all duration-300 hover:shadow-[0_0_40px_rgba(14,57,169,0.4)]"
                    style={{ fontWeight: 500 }}
                  >
                    {currentSlide.cta.label}{" "}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Hero carousel indicators */}
            <div className="flex items-center gap-3 mt-12">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIdx(i)}
                  className="relative h-1 rounded-full overflow-hidden bg-white/20"
                  style={{ width: i === heroIdx ? 48 : 16, transition: "width 0.5s ease" }}
                >
                  {i === heroIdx && (
                    <motion.div
                      className="absolute inset-0 bg-[#0E39A9] rounded-full"
                      initial={{ scaleX: 0, transformOrigin: "left" }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 7, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
              <span className="ml-3 text-[11px] text-white/40" style={{ fontVariantNumeric: "tabular-nums", fontWeight: 500 }}>
                0{heroIdx + 1} / 0{heroSlides.length}
              </span>
            </div>

            {/* Stats Row */}
            <div className="flex gap-10 mt-12">
              {[
                { value: "14K+", label: "Routines" },
                { value: "96%", label: "Satisfaction" },
                { value: "72h", label: "Hydration" },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="text-white"
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 600,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {s.value}
                  </p>
                  <p className="text-[11px] text-[#6B7280] mt-0.5" style={{ fontWeight: 400 }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Shoppable hotspot — floating product card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="hidden lg:block absolute right-8 bottom-1/4"
          >
            <Link to="/product/damn-dewy">
              <GlassCard dark className="p-4 w-52 group hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#0E39A9] animate-pulse" />
                  <span className="text-[10px] tracking-[0.1em] uppercase text-white/60" style={{ fontWeight: 600 }}>Shop Now</span>
                </div>
                <p className="text-white text-[14px] mb-1" style={{ fontWeight: 600 }}>Damn Dewy</p>
                <p className="text-[11px] text-white/50 mb-3">72h deep hydration</p>
                <div className="flex items-center justify-between">
                  <span className="text-white text-[14px]" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>₹995</span>
                  <ArrowRight size={14} className="text-[#4B7BF5] group-hover:translate-x-1 transition-transform" />
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#6B7280]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border border-[#4B5563] rounded-full flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 bg-[#0E39A9] rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ TRUST MARQUEE ═══ */}
      <div className="bg-[#0E39A9] py-3 overflow-hidden">
        <Marquee speed={40}>
          {trustBadges.map((badge, i) => (
            <span
              key={`${badge}-${i}`}
              className="flex items-center gap-3 px-8 text-[11px] tracking-[0.12em] uppercase text-white/80 whitespace-nowrap"
              style={{ fontWeight: 500 }}
            >
              <span className="w-1 h-1 rounded-full bg-white/40" />
              {badge}
            </span>
          ))}
        </Marquee>
      </div>

      {/* ═══ STICKY SHOP PILL (Mobile) ═══ */}
      <AnimatePresence>
        {showStickyPill && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden"
          >
            <Link
              to="/shop"
              className="flex items-center gap-2 bg-[#0E39A9] text-white pl-5 pr-4 py-3 rounded-full shadow-[0_8px_32px_rgba(14,57,169,0.4)] active:scale-95 transition-transform"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              <ShoppingBag size={15} />
              {stickyLabel}
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ BESTSELLERS CAROUSEL ═══ */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-3" style={{ fontWeight: 600 }}>
                  Most Loved
                </p>
                <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                  Bestsellers
                </h2>
              </div>
              <Link to="/shop" className="group text-[13px] text-[#0E39A9] flex items-center gap-1 hover:gap-2 transition-all" style={{ fontWeight: 500 }}>
                View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products.filter(p => p.isBestseller).slice(0, 4).map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.08}>
                <div className="group relative">
                  <ProductCard product={p} />
                  {/* Feature chips overlay */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1 z-10">
                    {p.concern.slice(0, 2).map(c => (
                      <span key={c} className="text-[8px] tracking-[0.04em] uppercase bg-white/90 backdrop-blur-sm text-[#0E39A9] px-2 py-0.5 rounded-full shadow-sm" style={{ fontWeight: 600 }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SHOP BY CATEGORY ═══ */}
      <section className="py-6 md:py-10 bg-[#FAFAFA]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {[
                { label: "Smart Jars", path: "/collection/smart-jar-series", emoji: "🫙" },
                { label: "Devices", path: "/collection/smart-devices", emoji: "⚡" },
                { label: "Skincare", path: "/collection/smart-skincare", emoji: "💧" },
                { label: "Shop All", path: "/shop", emoji: "✦" },
              ].map((cat) => (
                <Link
                  key={cat.label}
                  to={cat.path}
                  className="group flex items-center gap-2.5 px-5 py-3.5 bg-white rounded-2xl border border-[#f0f0f0] hover:border-[#0E39A9]/20 hover:shadow-sm transition-all duration-300 whitespace-nowrap shrink-0"
                >
                  <span className="text-[16px]">{cat.emoji}</span>
                  <span className="text-[13px] text-[#111827] group-hover:text-[#0E39A9] transition-colors" style={{ fontWeight: 500 }}>
                    {cat.label}
                  </span>
                  <ChevronRight size={14} className="text-[#d1d5db] group-hover:text-[#0E39A9] transition-colors" />
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SHOP BY PRICE ═══ */}
      <section className="py-6 md:py-10 bg-[#FAFAFA]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.12em] uppercase text-[#9CA3AF] mb-3" style={{ fontWeight: 600 }}>Shop by Price</p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {[
                { label: "Under ₹999", filter: "under-999" },
                { label: "₹999 – ₹2,999", filter: "999-2999" },
                { label: "₹2,999+", filter: "2999-plus" },
              ].map((price) => (
                <Link
                  key={price.filter}
                  to="/shop"
                  className="px-5 py-2.5 bg-white rounded-full border border-[#e5e7eb] text-[13px] text-[#4B5563] hover:border-[#0E39A9]/30 hover:text-[#0E39A9] transition-all whitespace-nowrap shrink-0"
                  style={{ fontWeight: 500, fontVariantNumeric: "tabular-nums" }}
                >
                  {price.label}
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ BUNDLES / SYSTEMS ═══ */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-3" style={{ fontWeight: 600 }}>
                Curated Systems
              </p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                Better Together
              </h2>
              <p className="text-[#4B5563] mt-3 max-w-md mx-auto" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
                Routines designed to compound results. Add the full system.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "The Hydration System",
                desc: "Damn Dewy + Brightening Dual Serum + G.O.A.T GuaSha",
                price: 6644,
                originalPrice: 8647,
                items: 3,
                image: "https://images.unsplash.com/photo-1773000129212-3546d5e083cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGJ1bmRsZSUyMGdpZnQlMjBzZXQlMjBwcmVtaXVtfGVufDF8fHx8MTc3MzIyNzQ5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              },
              {
                name: "The Anti-Aging System",
                desc: "Collagen Bombshell + Anti Aging Dual Serum + i-CONIC Eye Mask",
                price: 6394,
                originalPrice: 8547,
                items: 3,
                image: "https://images.unsplash.com/photo-1743309026555-97f545a08490?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwZHJvcHBlciUyMGx1eHVyeSUyMG1pbmltYWx8ZW58MXx8fHwxNzczMjI3NDk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              },
            ].map((bundle, i) => (
              <ScrollReveal key={bundle.name} delay={i * 0.1}>
                <div className="group bg-[#FAFAFA] rounded-2xl border border-[#f0f0f0] overflow-hidden hover:shadow-lg transition-all duration-500">
                  <div className="aspect-[16/9] overflow-hidden">
                    <ImageWithFallback
                      src={bundle.image}
                      alt={bundle.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] tracking-[0.06em] uppercase text-[#0E39A9] bg-[#0E39A9]/5 px-2.5 py-0.5 rounded-full" style={{ fontWeight: 600 }}>
                        {bundle.items} Products
                      </span>
                      <span className="text-[10px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>
                        Save ₹{(bundle.originalPrice - bundle.price).toLocaleString()}
                      </span>
                    </div>
                    <h3 className="text-[#111827] mb-1" style={{ fontSize: "1.125rem", fontWeight: 600 }}>{bundle.name}</h3>
                    <p className="text-[12px] text-[#4B5563] mb-4">{bundle.desc}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[#111827]" style={{ fontSize: "1.25rem", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                          ₹{bundle.price.toLocaleString()}
                        </span>
                        <span className="text-[13px] text-[#9CA3AF] line-through" style={{ fontVariantNumeric: "tabular-nums" }}>
                          ₹{bundle.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <button
                        className="flex items-center gap-2 bg-[#0E39A9] text-white px-5 py-2.5 rounded-full text-[12px] hover:bg-[#0c2f8a] transition-all active:scale-95"
                        style={{ fontWeight: 500 }}
                      >
                        <ShoppingBag size={13} /> Add Bundle
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider className="py-4" />

      {/* ═══ SECTION 2: PROOF METRICS WITH SPARKLINES ═══ */}
      <section id="sec-proof" className="py-16 md:py-36 bg-white relative overflow-hidden">
        <BlueBoom position="center" />
        <FloatingOrbs color="#0E39A9" count={3} className="opacity-20" />
        <div className="relative max-w-[1320px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-8 md:mb-16">
              <p
                className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-3 md:mb-4"
                style={{ fontWeight: 600 }}
              >
                Fig. 01 — Proven Results
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  fontWeight: 600,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                }}
              >
                Numbers don't lie.
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {[
              { value: 14200, suffix: "+", label: "Routines completed", sparkData: [20, 35, 28, 50, 42, 68, 75, 90, 100, 130, 142] },
              { value: 96, suffix: "%", label: "Visible improvement", sparkData: [60, 65, 70, 72, 78, 82, 85, 88, 92, 94, 96] },
              { value: 72, suffix: "h", label: "Moisture retention", sparkData: [24, 30, 36, 42, 48, 55, 60, 64, 68, 70, 72] },
              { value: 2, suffix: ".1×", label: "Absorption vs topical", sparkData: [1, 1.1, 1.2, 1.3, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1] },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08}>
                <MetricTile
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  sparkData={stat.sparkData}
                />
              </ScrollReveal>
            ))}
          </div>
          {/* Data provenance */}
          <ScrollReveal delay={0.4}>
            <p className="text-center text-[11px] text-[#9CA3AF] mt-6 md:mt-10" style={{ fontWeight: 400 }}>
              Based on internal data & customer reporting. Results may vary.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider className="py-4" />

      {/* ═══ SECTION 3: THE NUMOUR METHOD — INTERACTIVE PRINCIPLES HUB ═══ */}
      <section id="sec-philosophy" className="py-28 md:py-36 bg-[#FAFAFA] relative overflow-hidden">
        <BlueBoom position="top-right" />
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-6">
              <p
                className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4"
                style={{ fontWeight: 600 }}
              >
                Fig. 02 — The Method
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  fontWeight: 600,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                }}
              >
                The Numour Method
              </h2>
              <p className="text-[#4B5563] mt-3 max-w-lg mx-auto" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
                Three principles that drive every formulation, device, and routine we build.
              </p>
            </div>
          </ScrollReveal>

          {/* Principle Tab Bar */}
          <ScrollReveal delay={0.1}>
            <div className="flex justify-center mb-12">
              <div className="inline-flex bg-white rounded-2xl p-1.5 border border-[#e5e7eb] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                {methodPrinciples.map((rule, i) => (
                  <button
                    key={rule.title}
                    onClick={() => setActiveRule(i)}
                    className={`relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-[13px] transition-all duration-300 whitespace-nowrap ${
                      activeRule === i
                        ? "text-white"
                        : "text-[#4B5563] hover:text-[#111827]"
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    {activeRule === i && (
                      <motion.div
                        layoutId="methodTab"
                        className="absolute inset-0 bg-[#0E39A9] rounded-xl"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <rule.icon size={16} strokeWidth={1.5} />
                      <span className="hidden sm:inline">{rule.title}</span>
                      <span className="sm:hidden">0{i + 1}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Two-column: Visualization (left/hero) + Copy (right) */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Left: Dynamic visualization panel — takes 3/5 width */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRule}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {activeRule === 0 && (
                    <div className="bg-white rounded-3xl border border-[#f0f0f0] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.06)] p-6">
                      <IngredientProofCards />
                    </div>
                  )}
                  {activeRule === 1 && <DeliveryEngine />}
                  {activeRule === 2 && <BarrierSimulator />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Principle copy + context — takes 2/5 width */}
            <div className="lg:col-span-2 lg:sticky lg:top-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRule}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  {/* Active principle detail */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-[#0E39A9] text-white flex items-center justify-center">
                        {(() => {
                          const Icon = methodPrinciples[activeRule].icon;
                          return <Icon size={20} strokeWidth={1.5} />;
                        })()}
                      </div>
                      <div>
                        <p className="text-[10px] tracking-[0.1em] uppercase text-[#0E39A9]" style={{ fontWeight: 600 }}>
                          Principle {String(activeRule + 1).padStart(2, "0")}
                        </p>
                        <h3 className="text-[#111827]" style={{ fontSize: "1.25rem", fontWeight: 600, letterSpacing: "-0.02em" }}>
                          {methodPrinciples[activeRule].title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-[#4B5563] leading-relaxed" style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}>
                      {methodPrinciples[activeRule].desc}
                    </p>
                  </div>

                  {/* Principle highlights */}
                  <div className="space-y-3">
                    {activeRule === 0 && (
                      <>
                        {methodPrinciples[0].ingredients?.map((ing) => (
                          <div key={ing.name} className="flex items-start gap-3 bg-[#FAFAFA] rounded-xl p-4 border border-[#f0f0f0]">
                            <div className="w-8 h-8 rounded-lg bg-[#0E39A9]/5 flex items-center justify-center shrink-0 mt-0.5">
                              <Atom size={14} className="text-[#0E39A9]" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-0.5">
                                <p className="text-[14px] text-[#111827]" style={{ fontWeight: 600 }}>{ing.name}</p>
                                {ing.concentration && (
                                  <span className="text-[10px] text-[#0E39A9] bg-[#0E39A9]/5 px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>
                                    {ing.concentration}
                                  </span>
                                )}
                              </div>
                              <p className="text-[12px] text-[#4B5563]">{ing.role}</p>
                            </div>
                          </div>
                        ))}
                      </>
                    )}

                    {activeRule === 1 && (
                      <div className="bg-gradient-to-br from-[#0E39A9]/5 to-transparent rounded-xl p-5 border border-[#0E39A9]/10">
                        <p className="text-[12px] tracking-[0.06em] uppercase text-[#0E39A9] mb-2" style={{ fontWeight: 600 }}>Key Insight</p>
                        <p className="text-[14px] text-[#4B5563] leading-relaxed">
                          Traditional topicals lose up to 70% of actives at the surface. Our delivery formats — gels, jellies, and device-assisted protocols — ensure ingredients reach their target depth.
                        </p>
                      </div>
                    )}

                    {activeRule === 2 && (
                      <div className="bg-gradient-to-br from-[#0E39A9]/5 to-transparent rounded-xl p-5 border border-[#0E39A9]/10">
                        <p className="text-[12px] tracking-[0.06em] uppercase text-[#0E39A9] mb-2" style={{ fontWeight: 600 }}>Key Insight</p>
                        <p className="text-[14px] text-[#4B5563] leading-relaxed">
                          Performance without barrier protection is a losing game. Every Numour product is formulated to strengthen — never compromise — your skin's natural defense system.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Progress dots */}
                  <div className="flex items-center gap-3 mt-8 pt-6 border-t border-[#f0f0f0]">
                    {methodPrinciples.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveRule(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeRule === i ? "w-8 bg-[#0E39A9]" : "w-4 bg-[#d1d5db] hover:bg-[#9CA3AF]"
                        }`}
                      />
                    ))}
                    <span className="ml-auto text-[11px] text-[#9CA3AF]" style={{ fontVariantNumeric: "tabular-nums" }}>
                      {activeRule + 1} / {methodPrinciples.length}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STORY STRIP ═══ */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                figure: "01",
                title: "The Problem",
                caption: "70% of skincare ingredients never reach the layers where change happens.",
                image: IMAGES.waterDroplets,
              },
              {
                figure: "02",
                title: "The Fix",
                caption: "Delivery-led formats + barrier-first formulation ensure actives reach their target depth.",
                image: IMAGES.lab,
              },
              {
                figure: "03",
                title: "The Result",
                caption: "Repeatable performance — visible, measurable, and protocol-driven skincare.",
                image: IMAGES.glowingSkin,
              },
            ].map((card, i) => (
              <ScrollReveal key={card.figure} delay={i * 0.1}>
                <div className="bg-[#FAFAFA] rounded-2xl overflow-hidden border border-[#f0f0f0] group">
                  <div className="aspect-[16/9] overflow-hidden">
                    <ImageWithFallback
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p
                      className="text-[10px] tracking-[0.12em] uppercase text-[#0E39A9] mb-2"
                      style={{ fontWeight: 600 }}
                    >
                      Fig. {card.figure} — Story
                    </p>
                    <h3 className="text-[#111827] mb-2" style={{ fontSize: "1.0625rem", fontWeight: 600 }}>
                      {card.title}
                    </h3>
                    <p className="text-[13px] text-[#4B5563] leading-relaxed">{card.caption}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider className="py-4" />

      {/* ═══ SECTION 4: VIDEO WALL ═══ */}
      <section id="sec-video" className="py-28 md:py-36 bg-white relative overflow-hidden">
        <BlueBoom position="bottom-left" />
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
                Fig. 03 — Watch & Learn
              </p>
              <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 600, letterSpacing: "-0.03em" }}>
                Video Wall
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {videoWall.map((vid, i) => (
              <ScrollReveal key={vid.id} delay={i * 0.08}>
                <motion.div
                  className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer"
                  whileHover={{ scale: 0.98 }}
                  onClick={() => setVideoModal(vid.id)}
                >
                  <ImageWithFallback
                    src={vid.thumb}
                    alt={vid.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500" />
                  {/* Hover preview progress bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div
                      className="h-full bg-white/80 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[1500ms] ease-linear"
                    />
                  </div>
                  {/* Play icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <Play size={20} className="text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex gap-1.5 mb-2">
                      {vid.tags.map((tag) => (
                        <span key={tag} className="text-[9px] tracking-[0.06em] uppercase text-white/80 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded" style={{ fontWeight: 500 }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-white text-[14px]" style={{ fontWeight: 600 }}>{vid.title}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {videoModal !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              onClick={() => setVideoModal(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#111827] rounded-3xl max-w-2xl w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="aspect-video bg-[#030a1a] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-[#0E39A9]/20 flex items-center justify-center mx-auto mb-4">
                      <Play size={32} className="text-[#0E39A9] ml-1" />
                    </div>
                    <p className="text-white/60 text-[13px]">Video content placeholder</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-white mb-2" style={{ fontSize: "1.125rem", fontWeight: 600 }}>
                    {videoWall.find((v) => v.id === videoModal)?.title}
                  </h3>
                  <div className="flex gap-2 mb-4">
                    {videoWall
                      .find((v) => v.id === videoModal)
                      ?.tags.map((tag) => (
                        <span key={tag} className="text-[10px] text-[#4B7BF5] bg-[#4B7BF5]/10 px-2.5 py-0.5 rounded-full" style={{ fontWeight: 500 }}>
                          {tag}
                        </span>
                      ))}
                  </div>
                  <Link to="/shop" className="text-[13px] text-[#4B7BF5] flex items-center gap-1" style={{ fontWeight: 500 }}>
                    Shop related products <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <SectionDivider className="py-4" />

      {/* ═══ SECTION 5: PRODUCT CATALOG (TABBED) ═══ */}
      <section id="sec-products" className="py-28 md:py-36 bg-[#FAFAFA] relative">
        <BlueBoom position="top-right" />
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
            <ScrollReveal>
              <div>
                <p
                  className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4"
                  style={{ fontWeight: 600 }}
                >
                  Fig. 04 — Our Products
                </p>
                <h2
                  style={{
                    fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                    fontWeight: 600,
                    lineHeight: 1.15,
                    letterSpacing: "-0.03em",
                  }}
                >
                  Precision Formulations
                </h2>
              </div>
            </ScrollReveal>
            <Link
              to={activeTab === "Bestsellers" ? "/shop" : `/collection/${activeTab.toLowerCase().replace(/ /g, "-")}`}
              className="mt-4 md:mt-0 group text-[13px] text-[#0E39A9] flex items-center gap-1 hover:gap-2 transition-all"
              style={{ fontWeight: 500 }}
            >
              View All {activeTab}{" "}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-12 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`relative px-6 py-2.5 rounded-full text-[13px] whitespace-nowrap transition-all duration-300 ${
                  activeTab === cat
                    ? "text-white"
                    : "bg-white text-[#4B5563] hover:bg-[#f0f0f0] border border-[#e5e7eb]"
                }`}
                style={{ fontWeight: 500 }}
              >
                {activeTab === cat && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#0E39A9] rounded-full"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {displayProducts.map(
                (product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </motion.div>

          {/* Visual Catalog Hotspots */}
          <ScrollReveal>
            <VisualCatalogHotspots />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SECTION 6: BEFORE/AFTER COMPARISON ═══ */}
      <BeforeAfterSection />

      {/* ═══ SECTION 7: CONCERN → SYSTEM MATCHER ═══ */}
      <section id="sec-concern" className="py-28 md:py-36 bg-white relative overflow-hidden">
        <BlueBoom position="center" />
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p
                className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4"
                style={{ fontWeight: 600 }}
              >
                Fig. 05 — Concern Studio
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  fontWeight: 600,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                }}
              >
                Shop by Concern
              </h2>
              <p className="text-[#4B5563] mt-3 max-w-lg mx-auto" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
                Select your skin concern to see a complete system — target layer, format, routine, and recommended products.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <ConcernMatcher />
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider className="py-4" />

      {/* ═══ SECTION 8: TOOLS CAPABILITY MAP + PROTOCOL PLAYER ═══ */}
      <section id="sec-tools" className="relative py-28 md:py-36 bg-[#FAFAFA] overflow-hidden">
        <BlueBoom position="center" />
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p
                className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4"
                style={{ fontWeight: 600 }}
              >
                Fig. 06 — Tools that support
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  fontWeight: 600,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                }}
              >
                Science Tools
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Capability Map — 2/3 width */}
            <div className="md:col-span-2">
              <ScrollReveal>
                <ToolsCapabilityMap />
              </ScrollReveal>
            </div>

            {/* Protocol Player — 1/3 width */}
            <div className="md:col-span-1 flex flex-col gap-6">
              <ScrollReveal delay={0.1}>
                <ProtocolPlayer />
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="text-center">
                  <Link
                    to="/technology"
                    className="group inline-flex items-center gap-2 text-[#0E39A9] text-[13px] hover:gap-3 transition-all"
                    style={{ fontWeight: 500 }}
                  >
                    Explore All Technology{" "}
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 9: AM/PM ROUTINE ═══ */}
      <section id="sec-routine" className="py-28 md:py-36 bg-white relative overflow-hidden">
        <BlueBoom position="bottom-left" />
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left: Image */}
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden">
                  <ImageWithFallback
                    src={IMAGES.skincareMorning}
                    alt="Skincare routine"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating card */}
                <motion.div
                  {...(isCapture ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: 0.6 } })}
                  className="absolute -bottom-6 -right-6 md:right-0"
                >
                  <GlassCard className="p-5 max-w-[220px]">
                    <p
                      className="text-[11px] tracking-[0.1em] uppercase text-[#0E39A9] mb-1"
                      style={{ fontWeight: 600 }}
                    >
                      Total Time
                    </p>
                    <p
                      className="text-[#111827]"
                      style={{ fontSize: "1.75rem", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}
                    >
                      {activeRoutine === "AM" ? "4:15" : "5:15"}
                    </p>
                    <p className="text-[12px] text-[#4B5563]">minutes for complete routine</p>
                  </GlassCard>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Right: Content */}
            <div>
              <ScrollReveal direction="right">
                <p
                  className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4"
                  style={{ fontWeight: 600 }}
                >
                  Fig. 07 — Your Protocol
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
                  AM / PM Routine
                </h2>
              </ScrollReveal>

              {/* Toggle */}
              <div className="flex mb-10">
                <div className="bg-[#F7F7F7] rounded-full p-1 flex">
                  {(["AM", "PM"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setActiveRoutine(r)}
                      className={`relative px-8 py-2.5 rounded-full text-[13px] transition-all duration-300 ${
                        activeRoutine === r ? "text-white" : "text-[#4B5563]"
                      }`}
                      style={{ fontWeight: 500 }}
                    >
                      {activeRoutine === r && (
                        <motion.div
                          layoutId="routineToggle"
                          className={`absolute inset-0 rounded-full ${
                            r === "AM" ? "bg-[#0E39A9]" : "bg-[#111827]"
                          }`}
                          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5">
                        {r === "AM" ? <Sun size={14} /> : <Moon size={14} />}
                        {r} Routine
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Steps — animated timeline */}
              <div className="space-y-4 relative">
                {/* Timeline line */}
                <div className="absolute left-[19px] top-5 bottom-5 w-px bg-gradient-to-b from-[#0E39A9]/40 to-transparent" />
                <AnimatePresence mode="popLayout">
                  {(activeRoutine === "AM" ? amRoutine : pmRoutine).map((step, i) => (
                    <motion.div
                      key={`${activeRoutine}-${step.step}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="flex items-center gap-5 bg-[#FAFAFA] rounded-xl p-5 border border-[#f0f0f0] hover:border-[#0E39A9]/20 hover:shadow-sm transition-all duration-300 relative"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 relative z-10 ${
                          activeRoutine === "AM" ? "bg-[#0E39A9]" : "bg-[#111827]"
                        }`}
                        style={{ fontSize: "0.875rem", fontWeight: 600 }}
                      >
                        {step.step}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-[#111827] truncate"
                          style={{ fontSize: "0.9375rem", fontWeight: 600 }}
                        >
                          {step.product}
                        </p>
                        <p className="text-[12px] text-[#4B5563]">{step.purpose}</p>
                      </div>
                      <span
                        className="text-[12px] text-[#0E39A9] shrink-0 bg-[#0E39A9]/5 px-3 py-1 rounded-full"
                        style={{ fontWeight: 500, fontVariantNumeric: "tabular-nums" }}
                      >
                        {step.time}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Add routine CTA */}
              <div className="mt-8 flex items-center gap-4">
                <button className="group flex items-center gap-2 bg-[#0E39A9] text-white px-6 py-3 rounded-full text-[13px] hover:bg-[#0c2f8a] hover:shadow-[0_0_30px_rgba(14,57,169,0.3)] transition-all duration-300" style={{ fontWeight: 500 }}>
                  <ShoppingBag size={14} /> Add Routine to Cart
                </button>
                <Link
                  to="/routines"
                  className="group inline-flex items-center gap-2 text-[13px] text-[#0E39A9] hover:gap-3 transition-all"
                  style={{ fontWeight: 500 }}
                >
                  Full Guide{" "}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 10: TESTIMONIALS ═══ */}
      <section id="sec-reviews" className="py-28 md:py-36 bg-[#FAFAFA] relative overflow-hidden">
        <FloatingOrbs color="#0E39A9" count={2} className="opacity-20" />
        <div className="relative max-w-[1320px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p
                className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4"
                style={{ fontWeight: 600 }}
              >
                Fig. 08 — Real Results
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  fontWeight: 600,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                }}
              >
                What Our Customers Say
              </h2>
              {/* Star summary */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="fill-[#0E39A9] text-[#0E39A9]" />
                  ))}
                </div>
                <span className="text-[13px] text-[#4B5563]" style={{ fontVariantNumeric: "tabular-nums" }}>4.9 average from 142 reviews</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-8 md:p-14 border border-[#f0f0f0] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.06)]"
              >
                {/* Pull-quote style */}
                <div className="text-[#0E39A9]/10 mb-4" style={{ fontSize: "4rem", lineHeight: 1, fontWeight: 700 }}>
                  "
                </div>
                <p
                  className="text-[#111827] -mt-10 mb-8"
                  style={{ fontSize: "1.25rem", lineHeight: 1.7, fontWeight: 400 }}
                >
                  {testimonials[testimonialIdx].text}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0E39A9] to-[#5C73E6] flex items-center justify-center text-white text-[13px]" style={{ fontWeight: 600 }}>
                    {testimonials[testimonialIdx].avatar}
                  </div>
                  <div>
                    <p
                      className="text-[#111827]"
                      style={{ fontSize: "0.9375rem", fontWeight: 600 }}
                    >
                      {testimonials[testimonialIdx].name}
                    </p>
                    <p className="text-[12px] text-[#4B5563]">
                      on {testimonials[testimonialIdx].product}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: testimonials[testimonialIdx].rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-[#0E39A9] text-[#0E39A9]" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={() =>
                  setTestimonialIdx(
                    (prev) => (prev - 1 + testimonials.length) % testimonials.length
                  )
                }
                className="w-11 h-11 rounded-full border border-[#e5e7eb] flex items-center justify-center text-[#4B5563] hover:border-[#0E39A9] hover:text-[#0E39A9] transition-all duration-300 hover:shadow-md"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIdx(i)}
                    className="relative w-8 h-1.5 rounded-full overflow-hidden bg-[#e5e7eb]"
                  >
                    {i === testimonialIdx && (
                      <motion.div
                        layoutId="testimonialDot"
                        className="absolute inset-0 bg-[#0E39A9] rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>
              <button
                onClick={() =>
                  setTestimonialIdx((prev) => (prev + 1) % testimonials.length)
                }
                className="w-11 h-11 rounded-full border border-[#e5e7eb] flex items-center justify-center text-[#4B5563] hover:border-[#0E39A9] hover:text-[#0E39A9] transition-all duration-300 hover:shadow-md"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 11: FOUNDER STORY — EDITORIAL ═══ */}
      <section id="sec-founder" className="py-28 md:py-36 bg-white relative overflow-hidden">
        <BlueBoom position="bottom-left" />
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden">
                  <ImageWithFallback
                    src={IMAGES.founder}
                    alt="Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -z-10 -top-6 -left-6 w-full h-full rounded-3xl border-2 border-[#0E39A9]/10" />
                {/* Signature block */}
                <motion.div
                  {...(isCapture ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: 0.6 } })}
                  className="absolute -bottom-6 -right-6 md:right-0"
                >
                  <GlassCard className="p-5 max-w-[200px]">
                    <p className="text-[11px] tracking-[0.1em] uppercase text-[#0E39A9] mb-2" style={{ fontWeight: 600 }}>
                      Founder
                    </p>
                    <p className="text-[#111827] italic" style={{ fontSize: "1.25rem", fontWeight: 500, fontFamily: "serif" }}>
                      Numour
                    </p>
                    <p className="text-[11px] text-[#4B5563] mt-1">Est. 2021, India</p>
                  </GlassCard>
                </motion.div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div>
                <p
                  className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4"
                  style={{ fontWeight: 600 }}
                >
                  Fig. 09 — The Founder
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
                <div
                  className="space-y-5 text-[#4B5563]"
                  style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}
                >
                  <p>
                    After 11 years of building brands like ACT II, Philips, and Urban Company, I
                    learnt something wild — 70% of skincare we apply doesn't even go in.
                  </p>
                  <p>
                    So I did what any marketing nerd with trust issues would do: build a brand that
                    actually works.
                  </p>
                  {/* Pull-quote highlight */}
                  <div className="bg-gradient-to-r from-[#0E39A9]/5 to-transparent rounded-xl p-6 border-l-2 border-[#0E39A9] my-6">
                    <p className="text-[#0E39A9]" style={{ fontSize: "1.0625rem", fontWeight: 500, lineHeight: 1.6 }}>
                      "If it doesn't go in, it doesn't work. And that's our whole deal."
                    </p>
                  </div>
                  <p>
                    That's how Numour was born — out of chaos, caffeine, and one obsession: to make
                    science sexy and skincare smart.
                  </p>
                </div>
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2 mt-8 text-[13px] text-[#0E39A9] hover:gap-3 transition-all"
                  style={{ fontWeight: 500 }}
                >
                  Meet the Team{" "}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 12: VISUAL GRID ═══ */}
      <section className="py-0 overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {[IMAGES.creamTexture, IMAGES.glowingSkin, IMAGES.guasha, IMAGES.ledDevice].map(
            (img, i) => (
              <motion.div
                key={i}
                className="relative aspect-square overflow-hidden group cursor-pointer"
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.4 }}
              >
                <ImageWithFallback
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-[#0E39A9]/0 group-hover:bg-[#0E39A9]/20 transition-all duration-500" />
                {/* Hover caption */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <GlassCard dark className="px-4 py-2">
                    <span className="text-[10px] tracking-[0.1em] uppercase text-white/90 flex items-center gap-1.5" style={{ fontWeight: 600 }}>
                      <Eye size={12} /> View
                    </span>
                  </GlassCard>
                </div>
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* ═══ SECTION 13: FINAL CTA ═══ */}
      <section className="relative py-32 md:py-44 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0E39A9] to-[#1a47c4]" />
        {/* Blue bloom background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 30% 50%, rgba(75,123,245,0.3) 0%, transparent 60%)",
          }}
        />
        {/* Product silhouette watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[400px] h-[400px] rounded-full border-2 border-white/[0.05]" />
          <div className="absolute w-[300px] h-[300px] rounded-full border border-white/[0.03]" />
        </div>
        <FloatingOrbs color="#ffffff" count={3} />
        <div className="relative max-w-[1320px] mx-auto px-4 md:px-8 text-center">
          <ScrollReveal>
            <p
              className="text-[12px] tracking-[0.3em] uppercase text-white/60 mb-6"
              style={{ fontWeight: 500 }}
            >
              Ready to Transform Your Skin?
            </p>
            <h2
              className="text-white mb-6"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              Experience Precision
              <br />
              Skincare
            </h2>
            <p
              className="text-white/60 max-w-md mx-auto mb-12"
              style={{ fontSize: "1rem", lineHeight: 1.7 }}
            >
              Science-backed formulations designed to deliver visible results. Because your skin
              deserves better than marketing.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2.5 bg-white text-[#0E39A9] px-10 py-4 rounded-full text-[14px] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-all duration-300"
                style={{ fontWeight: 600 }}
              >
                Shop Now{" "}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                to="/routines"
                className="group inline-flex items-center gap-2.5 bg-transparent text-white px-10 py-4 rounded-full text-[14px] border border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                style={{ fontWeight: 500 }}
              >
                Find Your Routine
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ QUICK VIEW SHEET ═══ */}
      <QuickViewSheet product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}

/* ─── Before/After Comparison Slider ─── */
function BeforeAfterSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleInteraction = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    handleInteraction(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleInteraction(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleInteraction(e.touches[0].clientX);
  };

  return (
    <section className="py-28 md:py-36 bg-white relative overflow-hidden">
      <BlueBoom position="center" />
      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <ScrollReveal direction="left">
            <div>
              <p
                className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4"
                style={{ fontWeight: 600 }}
              >
                Real Results
              </p>
              <h2
                className="mb-6"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  fontWeight: 600,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                }}
              >
                See the difference.
              </h2>
              <p
                className="text-[#4B5563] mb-8"
                style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}
              >
                Drag the slider to see real results after 3 weeks of consistent use with the
                Numour routine.
              </p>
              <div className="flex items-center gap-2 text-[12px] text-[#9CA3AF]">
                <MousePointerClick size={14} />
                <span>Drag to compare</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div
              ref={sliderRef}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)]"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchMove={handleTouchMove}
            >
              {/* Before */}
              <div className="absolute inset-0">
                <ImageWithFallback
                  src={IMAGES.clearSkin}
                  alt="Before"
                  className="w-full h-full object-cover grayscale brightness-90 contrast-90"
                />
                <span
                  className="absolute bottom-5 left-5 text-white bg-black/50 backdrop-blur-sm px-4 py-1.5 rounded-full text-[11px] tracking-[0.08em] uppercase"
                  style={{ fontWeight: 600 }}
                >
                  Before
                </span>
              </div>
              {/* After */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <ImageWithFallback
                  src={IMAGES.clearSkin}
                  alt="After"
                  className="w-full h-full object-cover brightness-110 saturate-[1.2]"
                />
                <span
                  className="absolute bottom-5 right-5 text-white bg-[#0E39A9]/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-[11px] tracking-[0.08em] uppercase"
                  style={{ fontWeight: 600 }}
                >
                  After
                </span>
              </div>
              {/* Slider handle */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-white z-10"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex items-center justify-center">
                  <div className="flex gap-[3px]">
                    <ChevronLeft size={12} className="text-[#4B5563]" />
                    <ChevronRight size={12} className="text-[#4B5563]" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
