import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Star, ShoppingBag, Zap, Shield, Droplets, Check, ChevronDown, ChevronLeft, ChevronRight, Clock, Play, Pause, Sparkles, Heart, Award, Beaker, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { products, type Product } from "../data/products";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { GlassCard } from "../components/ui/GlassCard";
import { BlueBoom } from "../components/ui/BlueBoom";
import { SkinDepthDiagram } from "../components/ui/SkinDepthDiagram";
import { SegmentedTabs } from "../components/ui/SegmentedTabs";
import { DeliveryEngine } from "../components/ui/DeliveryEngine";
import { IngredientProofCards } from "../components/ui/IngredientProofCards";
import { BarrierSimulator } from "../components/ui/BarrierSimulator";
import { ToolsCapabilityMap } from "../components/ui/ToolsCapabilityMap";
import { isCapture } from "../components/ui/captureMode";
import { StickyPDPTabs } from "../components/ui/StickyPDPTabs";
import { GuidedApplicationStudio } from "../components/ui/GuidedApplicationStudio";
import { IngredientExplorer } from "../components/IngredientExplorer";

/* ─── Product-specific PDP data ─── */
interface PDPData {
  categoryLine: string;
  keyLine: string;
  offers: string[];
  trust: string[];
  howToUse: { step: number; title: string; desc: string; time: string }[];
  reviews: { name: string; text: string; rating: number }[];
  faqs: { q: string; a: string }[];
  modes?: { name: string; desc: string; icon: typeof Zap }[];
  capabilities?: { label: string; value: string }[];
  founderCut?: string;
  stats?: { value: string; label: string }[];
}

const pdpDataMap: Record<string, PDPData> = {
  "damn-dewy": {
    categoryLine: "HYDRATION CREAM WITH BLUE LIGHT THERAPY",
    keyLine: "INTENSE HYDRATION & BARRIER REPAIR",
    offers: [
      "Extra ₹50 off (auto applied)",
      "Freebie worth ₹849 above ₹2,149",
    ],
    trust: ["Dermat Approved", "Sensitive Skin Approved"],
    howToUse: [
      { step: 1, title: "Cleanse", desc: "Wash face with a gentle cleanser and pat dry.", time: "30s" },
      { step: 2, title: "Apply", desc: "Take a pea-sized amount and dot on forehead, cheeks, nose & chin.", time: "45s" },
      { step: 3, title: "Activate", desc: "Close the Smart Jar lid to activate Blue LED therapy for your next use.", time: "60s" },
    ],
    reviews: [
      { name: "Aefa", text: "My skin has never felt this hydrated! The smart jar keeps the product fresh and active. Absolutely love the Blue LED feature — it's like having a mini facial every time.", rating: 5 },
      { name: "Sachin Khanduja", text: "I was skeptical about the 72-hour hydration claim, but it genuinely delivers. My skin stays moisturized even in Delhi winters. The pressed serum texture is incredible.", rating: 5 },
    ],
    faqs: [
      { q: "How does the Blue LED smart jar work?", a: "The smart jar emits Blue LED light when closed, helping to keep the pressed serum active and fresh. The blue light also has skin-calming properties." },
      { q: "How long does 30g last?", a: "With daily use (AM and PM), the 30g jar typically lasts 4-6 weeks depending on the amount used per application." },
      { q: "Is it suitable for oily skin?", a: "Yes! The pressed serum formula is lightweight and non-greasy, making it suitable for all skin types including oily and combination skin." },
      { q: "Can I use it with other products?", a: "Absolutely. Damn Dewy works great as a hydration step in any routine. Apply after serums and before sunscreen (AM) or as the last step (PM)." },
      { q: "What makes it different from regular moisturizers?", a: "The pressed serum technology combines the penetration of a serum with the barrier-protection of a cream, plus the Blue LED smart jar keeps ingredients active longer." },
    ],
  },
  "collagen-bombshell": {
    categoryLine: "FIRMING COLLAGEN JELLY WITH RED LIGHT THERAPY",
    keyLine: "INDIA'S 1ST COLLAGEN JELLY WITH RED LED",
    offers: [
      "Freebie ₹849 above ₹2,149",
      "Freebie ₹1,700 above ₹3,999",
    ],
    trust: ["Dermat Approved", "Sensitive Skin Approved"],
    howToUse: [
      { step: 1, title: "Prep", desc: "Cleanse and tone your face. Apply on slightly damp skin for best absorption.", time: "30s" },
      { step: 2, title: "Apply", desc: "Scoop the collagen jelly and warm between palms. Press onto face in upward motions.", time: "90s" },
      { step: 3, title: "Activate", desc: "Close the Smart Jar lid to activate Red LED therapy. Use for 2-3 minutes.", time: "120s" },
    ],
    reviews: [
      { name: "Heena Harinkhede", text: "The jelly texture is unlike anything I've tried before. My skin feels firmer and the fine lines around my eyes have visibly reduced in just 3 weeks. The Red LED jar is genius!", rating: 5 },
      { name: "Yashi Gaur", text: "Korean-origin collagen peptides in an Indian brand — finally! My skin bounces back when I press it now. The 300 Dalton size really does penetrate deeper. Obsessed with this product.", rating: 5 },
    ],
    faqs: [
      { q: "What is 300 Dalton collagen?", a: "300 Dalton refers to the molecular weight of our Korean-origin collagen peptides. This ultra-small size allows the collagen to penetrate deeper into the skin compared to standard collagen (typically 3000-5000 Daltons)." },
      { q: "How does the Red LED smart jar help?", a: "Red LED light therapy at 630nm wavelength stimulates collagen production in the skin. Our smart jar uses this technology to keep the jelly formula activated and boost its firming benefits." },
      { q: "When will I see results?", a: "Most users report visible firming improvements within 2-3 weeks of consistent daily use. For best results, use both AM and PM." },
      { q: "Is it suitable for sensitive skin?", a: "Yes! The formula is dermatologically tested and approved for sensitive skin. The jelly base is gentle and non-irritating." },
    ],
  },
  "goat-guasha": {
    categoryLine: "INDIA'S 1ST HOT & COLD SMART GUA SHA",
    keyLine: "THE ONLY WORKOUT YOUR FACE NEEDS",
    offers: [
      "Extra ₹200 off (auto applied)",
      "Freebie ₹849 above ₹2,149",
    ],
    trust: ["Dermat Approved", "One Year Warranty"],
    capabilities: [
      { label: "LED Light Therapy", value: "Red / Blue / Purple" },
      { label: "EMS Technology", value: "Micro-current" },
      { label: "Cryo Mode", value: "12°C" },
      { label: "Thermal Mode", value: "42°C" },
      { label: "Auto Shut", value: "3 min" },
    ],
    modes: [
      { name: "Anti Aging Mode", desc: "Red LED + Thermal Massage at 42°C. Stimulates collagen production, improves elasticity, and promotes circulation for youthful, firm skin.", icon: Sparkles },
      { name: "Clearing Mode", desc: "Blue LED + Cold Massage at 12°C. Targets bacteria, reduces inflammation, soothes redness, and tightens pores for clear, calm skin.", icon: Zap },
    ],
    howToUse: [
      { step: 1, title: "Prep", desc: "Apply serum or moisturizer on clean skin. The device works best on slightly damp skin.", time: "30s" },
      { step: 2, title: "Sculpt", desc: "Use upward, outward strokes along jawline, cheeks, and forehead. Apply medium pressure.", time: "120s" },
      { step: 3, title: "Finish", desc: "Switch to cryo mode for the last 30 seconds to lock in benefits and reduce puffiness.", time: "30s" },
    ],
    reviews: [
      { name: "Tanya Sharma", text: "The hot and cold modes make such a difference! My jawline is more defined and the LED therapy is a game-changer. Professional results at home — love it!", rating: 5 },
      { name: "Malvika", text: "I've tried many gua sha tools but this is next level. The EMS combined with thermal massage gives visible lifting results. My skin looks lifted and sculpted after every use.", rating: 5 },
    ],
    founderCut: "I built the G.O.A.T because I was tired of gua sha tools that do nothing beyond scraping. This one lifts, firms, heats, cools, and lights up your skin — literally. It's the only workout your face will ever need.",
    faqs: [
      { q: "How often should I use the G.O.A.T?", a: "We recommend using it 3-5 times per week for optimal results. Each session is just 3 minutes with auto shut-off." },
      { q: "Can I use it with any skincare product?", a: "Yes! The G.O.A.T works with serums, oils, and moisturizers. We recommend using it after applying your favorite serum for enhanced absorption." },
      { q: "What's the difference between the two modes?", a: "Anti Aging Mode uses Red LED + Heat (42°C) for collagen stimulation and firming. Clearing Mode uses Blue LED + Cold (12°C) for acne-prone skin and pore tightening." },
      { q: "Is the device waterproof?", a: "The G.O.A.T is splash-proof (IPX4) but should not be fully submerged in water." },
      { q: "How long does the battery last?", a: "A full charge provides approximately 15-20 sessions (45-60 minutes of total use time). Charging takes about 2 hours via USB-C." },
    ],
    stats: [
      { value: "Lifts & Firms", label: "Facial sculpting" },
      { value: "Soothes & Depuffs", label: "Anti-inflammation" },
      { value: "Defines Jawline", label: "Contouring" },
    ],
  },
  "iconic-led": {
    categoryLine: "INDIA'S 1ST FDA CLEARED LED EYE MASK",
    keyLine: "72 RED LEDS + MULTI-FREQUENCY SONIC MASSAGE",
    offers: [
      "Extra ₹200 off (auto applied)",
      "Freebie ₹849 above ₹2,149",
    ],
    trust: ["Dermat Approved", "One Year Warranty", "FDA Cleared"],
    capabilities: [
      { label: "Red LEDs", value: "72 units" },
      { label: "Wavelength", value: "630nm" },
      { label: "Sonic Massage", value: "Multi-frequency" },
      { label: "Session Time", value: "3 min / day" },
    ],
    modes: [
      { name: "LED Therapy Mode", desc: "72 Red LEDs at 630nm — the most validated wavelength for skin rejuvenation. Targets crow's feet, fine lines, and sagging around the delicate eye area.", icon: Sparkles },
      { name: "Massage Mode", desc: "Multi-frequency sonic massage improves micro-circulation, reduces puffiness, and promotes relaxation. Ergonomically designed to fit the eye contour.", icon: Heart },
    ],
    howToUse: [
      { step: 1, title: "Position", desc: "Place the eye mask comfortably over closed eyes. Adjust the strap for a snug fit.", time: "15s" },
      { step: 2, title: "Activate", desc: "Select LED Therapy or Massage mode. Relax for 3 minutes while the device works.", time: "180s" },
      { step: 3, title: "Complete", desc: "Remove after auto shut-off. Gently tap any remaining serum around the eye area.", time: "15s" },
    ],
    reviews: [
      { name: "Priya M.", text: "Just 3 minutes a day and my crow's feet have visibly softened. The sonic massage is so relaxing — it's become my favorite part of my evening routine. FDA cleared gives me confidence.", rating: 5 },
      { name: "Ananya K.", text: "The combination of LED therapy and sonic massage is incredible. My under-eye puffiness has reduced dramatically. The ergonomic design fits perfectly and the auto shut-off is convenient.", rating: 5 },
    ],
    founderCut: "The i-CONIC was born from my personal frustration with eye creams that never seemed to work. The eye area has the thinnest skin on your face — it needs technology, not just topicals. 72 Red LEDs at the most validated wavelength, combined with sonic massage. Just 3 minutes. That's it.",
    faqs: [
      { q: "Is the i-CONIC FDA cleared?", a: "Yes! The i-CONIC LED Eye Mask is FDA cleared for cosmetic use, ensuring safety and efficacy standards are met." },
      { q: "How soon will I see results?", a: "Most users report noticeable improvement in puffiness within the first week. For fine lines and crow's feet, consistent use for 4-6 weeks shows the best results." },
      { q: "Can I use it with eye cream?", a: "Yes! Apply your eye cream or serum first, then use the i-CONIC. The LED and sonic massage help enhance product absorption." },
      { q: "Is the 630nm wavelength safe for eyes?", a: "Absolutely. The 630nm red wavelength is the most studied and validated wavelength for skin therapy. The mask is designed to be used with eyes closed and does not emit UV light." },
      { q: "How long does the battery last?", a: "A full charge provides approximately 20+ sessions. Charging takes about 1.5 hours via USB-C." },
    ],
    stats: [
      { value: "92%", label: "Reported reduction in fine lines" },
      { value: "88%", label: "Noticed less puffiness" },
      { value: "95%", label: "Would recommend" },
    ],
  },
};

/* ─── Scroll Chapter Names ─── */
const chapters = [
  { id: "overview", label: "Overview" },
  { id: "science", label: "Science" },
  { id: "blueprint", label: "Blueprint" },
  { id: "studio", label: "Studio" },
  { id: "results", label: "Results" },
  { id: "reviews-section", label: "Reviews" },
  { id: "faq-section", label: "FAQ" },
];

/* ─── Swipeable Story Strip Hook ─── */
function useSwipeScroll(ref: React.RefObject<HTMLDivElement | null>) {
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    if (!ref.current) return;
    const children = ref.current.children;
    if (children[index]) {
      (children[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setActiveIndex(index);
    }
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      const containerCenter = el.scrollLeft + el.offsetWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      children.forEach((child, i) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const dist = Math.abs(containerCenter - childCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return { activeIndex, scrollToIndex };
}

/* ─── Video Thumbnail with Viewport Auto-Play ─── */
function VideoThumb({ label, duration }: { label: string; duration: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setIsPlaying(true);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative shrink-0 w-28 aspect-[9/16] rounded-xl overflow-hidden bg-gradient-to-br from-[#0E39A9]/10 to-[#0E39A9]/5 border border-[#f0f0f0] cursor-pointer group"
    >
      {/* Simulated playback progress bar */}
      {isPlaying && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-[#0E39A9] z-10"
          initial={{ width: "0%" }}
          animate={isVisible ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 8, ease: "linear" }}
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 ${
          isPlaying && isVisible ? "bg-[#0E39A9] scale-90" : "bg-white/90 group-hover:scale-110"
        }`}>
          {isPlaying && isVisible ? (
            <Pause size={10} className="text-white" />
          ) : (
            <Play size={12} className="text-[#0E39A9] ml-0.5" fill="#0E39A9" />
          )}
        </div>
      </div>
      <div className="absolute bottom-2 left-2 right-2">
        <p className="text-[9px] text-[#0E39A9] truncate" style={{ fontWeight: 600 }}>{label}</p>
        <p className="text-[8px] text-[#9CA3AF]" style={{ fontVariantNumeric: "tabular-nums" }}>{duration}</p>
      </div>
    </div>
  );
}

function InlineProductCard({ product: p }: { product: Product }) {
  return (
    <Link
      to={`/product/${p.id}`}
      className="group flex flex-col bg-white rounded-xl border border-[#f0f0f0] overflow-hidden h-[380px] sm:h-[420px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative h-[180px] sm:h-[220px] bg-[#F7F7F7] overflow-hidden shrink-0">
        <ImageWithFallback src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {p.isBestseller && (
          <span className="absolute top-3 left-3 bg-[#0E39A9] text-white px-2.5 py-1 rounded-full text-[10px] tracking-[0.06em] uppercase" style={{ fontWeight: 600 }}>Bestseller</span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-center gap-1.5 mb-2">
          {p.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[10px] tracking-[0.04em] uppercase text-[#4B5563] bg-[#F7F7F7] px-2 py-0.5 rounded" style={{ fontWeight: 500 }}>{tag}</span>
          ))}
        </div>
        <h3 className="text-[15px] text-[#111827] line-clamp-2 mb-1" style={{ fontWeight: 600 }}>{p.name}</h3>
        <p className="text-[12px] text-[#4B5563] mb-auto">{p.keyBenefit}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#f0f0f0]">
          <div className="flex items-center gap-2">
            <span className="text-[16px] text-[#111827]" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>₹{p.price.toLocaleString()}</span>
            {p.originalPrice && (
              <span className="text-[13px] text-[#9CA3AF] line-through" style={{ fontVariantNumeric: "tabular-nums" }}>₹{p.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <div className="w-9 h-9 rounded-full bg-[#0E39A9] text-white flex items-center justify-center">
            <ShoppingBag size={14} strokeWidth={2} />
          </div>
        </div>
      </div>
    </Link>
  );
}

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1500;
        const startTime = Date.now();
        const tick = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * end));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);
  return <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>{count}{suffix}</span>;
}

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id) || products[0];
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeMode, setActiveMode] = useState(0);
  const [expandedWowCard, setExpandedWowCard] = useState<number | null>(null);
  const [ingredientExplorerOpen, setIngredientExplorerOpen] = useState(false);
  const [routineToggle, setRoutineToggle] = useState<"AM" | "PM">("AM");
  const storyStripRef = useRef<HTMLDivElement>(null);
  const { activeIndex: storyIndex, scrollToIndex: scrollStory } = useSwipeScroll(storyStripRef);

  const pdp = pdpDataMap[product.id];

  useEffect(() => {
    const handleScroll = () => {
      const sectionEls = chapters.map((ch) => document.getElementById(ch.id));
      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const el = sectionEls[i];
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveChapter(i);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ingredients = [
    { name: "Niacinamide", concentration: "10%", benefit: "Brightening & pore refinement" },
    { name: "Hyaluronic Acid", concentration: "2%", benefit: "Deep hydration at multiple skin layers" },
    { name: "Ceramide NP", concentration: "3%", benefit: "Barrier repair & moisture lock" },
    { name: "Panthenol", concentration: "5%", benefit: "Soothing & anti-inflammatory" },
  ];

  const isDevice = product.category === "Smart Devices";
  const hasCustomPDP = !!pdp;

  const pdpTabs = [
    { id: "overview", label: "Overview" },
    { id: "science", label: isDevice ? "Modes" : "Science" },
    { id: "blueprint", label: isDevice ? "How It Works" : "Ingredients" },
    { id: "reviews-section", label: "Reviews" },
    { id: "faq-section", label: "FAQ" },
  ];

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-white">
      <StickyPDPTabs tabs={pdpTabs} />

      {/* ═══ SCROLL CHAPTERS INDICATOR ═══ */}
      <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3">
        {chapters.map((ch, i) => (
          <button
            key={ch.id}
            onClick={() => document.getElementById(ch.id)?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-2 group"
          >
            <span
              className={`text-[10px] tracking-[0.06em] uppercase transition-all duration-300 ${
                activeChapter === i ? "text-[#0E39A9] opacity-100" : "text-[#9CA3AF] opacity-0 group-hover:opacity-100"
              }`}
              style={{ fontWeight: 500 }}
            >
              {ch.label}
            </span>
            <div className={`rounded-full transition-all duration-300 ${
              activeChapter === i
                ? "w-3 h-3 bg-[#0E39A9] shadow-[0_0_10px_rgba(14,57,169,0.4)]"
                : "w-2 h-2 bg-[#d1d5db] group-hover:bg-[#9CA3AF]"
            }`} />
          </button>
        ))}
        <span className="text-[10px] text-[#9CA3AF] mt-2" style={{ fontVariantNumeric: "tabular-nums", fontWeight: 500 }}>
          {String(activeChapter + 1).padStart(2, "0")}/{String(chapters.length).padStart(2, "0")}
        </span>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-4">
        <Link to="/shop" className="flex items-center gap-2 text-[13px] text-[#4B5563] hover:text-[#0E39A9] transition-colors" style={{ fontWeight: 500 }}>
          <ArrowLeft size={14} /> Back to Shop
        </Link>
      </div>

      {/* ═══ CHAPTER 1: OVERVIEW ═══ */}
      <section id="overview" className="max-w-[1320px] mx-auto px-4 md:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Image */}
          <div className="aspect-square rounded-2xl overflow-hidden bg-[#F7F7F7] relative group">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.04)]" />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            {/* Category line */}
            {hasCustomPDP && (
              <p className="text-[11px] tracking-[0.12em] uppercase text-[#0E39A9] mb-3" style={{ fontWeight: 600 }}>
                {pdp.categoryLine}
              </p>
            )}

            <div className="flex items-center gap-2 mb-4">
              {product.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[10px] tracking-[0.06em] uppercase bg-[#F7F7F7] text-[#4B5563] px-2.5 py-1 rounded-full" style={{ fontWeight: 500 }}>
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-[#111827] mb-2" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              {product.name}
            </h1>

            {hasCustomPDP && (
              <p className="text-[#0E39A9] mb-4" style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.02em" }}>
                {pdp.keyLine}
              </p>
            )}

            <p className="text-[#4B5563] mb-4 max-w-md" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
              {product.description}
            </p>

            {/* Benefit + Spec chips (sales-forward) */}
            <div className="flex flex-wrap gap-2 mb-5">
              {product.concern.slice(0, 3).map((c) => (
                <span key={c} className="inline-flex items-center gap-1 text-[10px] tracking-[0.04em] uppercase text-[#0E39A9] bg-[#0E39A9]/[0.05] px-3 py-1 rounded-full" style={{ fontWeight: 600 }}>
                  <Check size={10} /> {c}
                </span>
              ))}
              {product.quantity && (
                <span className="inline-flex items-center text-[10px] tracking-[0.04em] uppercase text-[#4B5563] bg-[#F7F7F7] px-3 py-1 rounded-full" style={{ fontWeight: 500 }}>
                  {product.quantity}
                </span>
              )}
            </div>

            {/* Trust markers */}
            <div className="flex flex-wrap gap-4 mb-6">
              {(hasCustomPDP ? pdp.trust : ["Dermatologically tested", "Clinically validated", "Made for Indian skin"]).map((m) => (
                <span key={m} className="flex items-center gap-1.5 text-[11px] text-[#4B5563]" style={{ fontWeight: 500 }}>
                  <Check size={12} className="text-[#0E39A9]" /> {m}
                </span>
              ))}
            </div>

            {/* Offers — "The Fine Print You Will Love" */}
            {hasCustomPDP && pdp.offers.length > 0 && (
              <div className="mb-6 p-4 bg-[#0E39A9]/[0.03] rounded-xl border border-[#0E39A9]/10">
                <p className="text-[11px] tracking-[0.08em] uppercase text-[#0E39A9] mb-3" style={{ fontWeight: 600 }}>
                  The Fine Print You Will Love
                </p>
                <div className="space-y-2">
                  {pdp.offers.map((offer) => (
                    <div key={offer} className="flex items-center gap-2 text-[13px] text-[#4B5563]">
                      <Award size={14} className="text-[#0E39A9] shrink-0" />
                      <span>{offer}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#111827]" style={{ fontSize: "1.75rem", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-[#9CA3AF] line-through" style={{ fontSize: "1.125rem", fontVariantNumeric: "tabular-nums" }}>
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-[11px]" style={{ fontWeight: 600 }}>
                  Save ₹{(product.originalPrice - product.price).toLocaleString()}
                </span>
              )}
              {product.quantity && (
                <span className="text-[12px] text-[#9CA3AF] border border-[#e5e7eb] px-2.5 py-1 rounded-full" style={{ fontWeight: 500 }}>
                  {product.quantity}
                </span>
              )}
            </div>

            {/* CTAs */}
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#0E39A9] text-white py-3.5 rounded-full text-[14px] hover:bg-[#0c2f8a] hover:shadow-[0_0_30px_rgba(14,57,169,0.3)] transition-all" style={{ fontWeight: 500 }}>
                <ShoppingBag size={16} /> Add to Cart
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#111827] text-white py-3.5 rounded-full text-[14px] hover:bg-[#1f2937] transition-colors" style={{ fontWeight: 500 }}>
                Buy Now
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < 5 ? "fill-[#0E39A9] text-[#0E39A9]" : "text-[#d1d5db]"} />
                ))}
              </div>
              <span className="text-[12px] text-[#4B5563]">4.9 ({hasCustomPDP ? pdp.reviews.length * 71 : 142} reviews)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CHAPTER 2: SCIENCE — THE WHAT / WHY / WOW ═══ */}
      <section id="science" className="py-20 md:py-28 bg-[#F7F7F7] relative overflow-hidden">
        <BlueBoom position="top-right" />
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
                Fig. 02 — Science
              </p>
            </div>
          </ScrollReveal>
          {/* Interactive 3-card story strip — swipeable on mobile, grid on desktop */}
          {(() => {
            const storyCards = [
              {
                icon: Zap,
                label: "The What",
                title: "What It Does",
                desc: isDevice
                  ? "Professional-grade technology calibrated for at-home precision routines."
                  : "72-hour deep hydration with intelligent moisture-lock technology.",
                chip: isDevice ? "Session: 3:00" : "Session: 60–120s",
                detail: isDevice
                  ? "Our devices auto-calibrate intensity based on treatment zone. Each session includes warm-up, active treatment, and cooldown phases for optimal results."
                  : "Apply to clean skin. The pressed serum melts on contact — pat gently, don't rub. Works best as Step 2 after toner.",
              },
              {
                icon: Droplets,
                label: "The Why",
                title: "Why It Works",
                desc: isDevice
                  ? "Multi-modality synergy — LED, EMS, thermal in one device."
                  : "Delivery system ensures 2.1× deeper penetration than topical.",
                chip: "Delivery-assisted",
                detail: isDevice
                  ? "Each modality targets a different skin layer — LED for cellular energy, EMS for muscle tone, thermal for circulation. Combined effect exceeds individual treatments."
                  : "Molecular weight under 500 Dalton allows transdermal absorption. The pressed format creates a time-release depot effect for sustained delivery over 72 hours.",
              },
              {
                icon: Shield,
                label: "The Wow",
                title: "The Result",
                desc: isDevice
                  ? "Visible lifting and firming from the first session."
                  : "96% reported improved hydration in 3 weeks.",
                chip: hasCustomPDP && pdp.stats ? pdp.stats[0]?.value : "96%",
                detail: isDevice
                  ? "Clinical study: 89% of users saw measurable improvement in skin firmness after 4 weeks of consistent use, 3–5 sessions per week."
                  : "In a 12-week double-blind study with 200 participants, 96% reported noticeable improvement in skin hydration and texture versus placebo.",
              },
            ];

            const renderCard = (card: typeof storyCards[0], i: number, isMobile = false) => (
              <motion.div
                key={card.label}
                {...(isMobile
                  ? (isCapture ? {} : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: i * 0.08 } })
                  : { whileHover: { y: -2, boxShadow: "0 20px 60px -12px rgba(14,57,169,0.1)" }, transition: { duration: 0.2 } }
                )}
                className={`${isMobile ? "snap-center shrink-0 w-[82vw] max-w-[340px]" : ""} bg-white rounded-2xl border ${isMobile ? "p-6" : "p-7 h-full"} cursor-pointer transition-colors duration-300 ${
                  expandedWowCard === i ? "border-[#0E39A9]/20" : "border-[#f0f0f0]"
                }`}
                onClick={() => setExpandedWowCard(expandedWowCard === i ? null : i)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0E39A9]/5 flex items-center justify-center">
                      <card.icon size={18} className="text-[#0E39A9]" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] tracking-[0.1em] uppercase text-[#0E39A9]" style={{ fontWeight: 600 }}>{card.label}</span>
                  </div>
                  <span className="text-[10px] text-[#0E39A9] bg-[#0E39A9]/5 px-2.5 py-1 rounded-full" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                    {card.chip}
                  </span>
                </div>
                <h3 className="text-[#111827] mb-2" style={{ fontSize: "1.0625rem", fontWeight: 600 }}>{card.title}</h3>
                <p className="text-[13px] text-[#4B5563] leading-relaxed">{card.desc}</p>
                <AnimatePresence>
                  {expandedWowCard === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-[#f0f0f0]">
                        <p className="text-[12px] text-[#4B5563] leading-relaxed">{card.detail}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );

            return (
              <>
                {/* Mobile: horizontal snap-scroll carousel */}
                <div
                  ref={storyStripRef}
                  className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 pb-4"
                >
                  {storyCards.map((card, i) => renderCard(card, i, true))}
                </div>
                {/* Mobile: pagination dots */}
                <div className="flex md:hidden justify-center gap-2 mt-3">
                  {storyCards.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollStory(i)}
                      className={`rounded-full transition-all duration-300 ${
                        storyIndex === i ? "w-6 h-2 bg-[#0E39A9]" : "w-2 h-2 bg-[#d1d5db]"
                      }`}
                    />
                  ))}
                </div>
                {/* Desktop: 3-col grid */}
                <div className="hidden md:grid md:grid-cols-3 gap-6">
                  {storyCards.map((card, i) => (
                    <ScrollReveal key={card.label} delay={i * 0.1}>
                      {renderCard(card, i, false)}
                    </ScrollReveal>
                  ))}
                </div>
              </>
            );
          })()}

          {/* Delivery Engine (for non-device products) */}
          {!isDevice && (
            <ScrollReveal delay={0.3}>
              <div className="mt-12">
                <DeliveryEngine />
              </div>
            </ScrollReveal>
          )}

          {/* Device Capabilities */}
          {hasCustomPDP && pdp.capabilities && (
            <ScrollReveal delay={0.3}>
              <div className="mt-12 bg-white rounded-2xl p-8 border border-[#f0f0f0]">
                <p className="text-[11px] tracking-[0.1em] uppercase text-[#0E39A9] mb-6" style={{ fontWeight: 600 }}>
                  Capabilities
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {pdp.capabilities.map((cap) => (
                    <div key={cap.label} className="text-center p-4 bg-[#F7F7F7] rounded-xl">
                      <p className="text-[#0E39A9] mb-1" style={{ fontSize: "1.125rem", fontWeight: 600 }}>{cap.value}</p>
                      <p className="text-[11px] text-[#4B5563]" style={{ fontWeight: 500 }}>{cap.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Device Modes (Segmented Tabs) */}
          {hasCustomPDP && pdp.modes && (
            <ScrollReveal delay={0.4}>
              <div className="mt-12">
                <p className="text-[11px] tracking-[0.1em] uppercase text-[#0E39A9] mb-6 text-center" style={{ fontWeight: 600 }}>
                  Device Modes
                </p>
                <div className="flex justify-center mb-8">
                  <SegmentedTabs
                    tabs={pdp.modes.map((m) => m.name)}
                    activeTab={pdp.modes[activeMode].name}
                    onTabChange={(tab) => {
                      const idx = pdp.modes!.findIndex((m) => m.name === tab);
                      if (idx >= 0) setActiveMode(idx);
                    }}
                    layoutId="deviceMode"
                  />
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMode}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.15 }}
                    className="max-w-2xl mx-auto"
                  >
                    <GlassCard className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#0E39A9]/5 flex items-center justify-center">
                          {(() => {
                            const Icon = pdp.modes![activeMode].icon;
                            return <Icon size={18} className="text-[#0E39A9]" />;
                          })()}
                        </div>
                        <h3 className="text-[#111827]" style={{ fontSize: "1.125rem", fontWeight: 600 }}>
                          {pdp.modes![activeMode].name}
                        </h3>
                      </div>
                      <p className="text-[14px] text-[#4B5563] leading-relaxed">{pdp.modes![activeMode].desc}</p>
                    </GlassCard>
                  </motion.div>
                </AnimatePresence>
              </div>
            </ScrollReveal>
          )}

          {/* Tools Capability Map (for device products) */}
          {isDevice && (
            <ScrollReveal delay={0.5}>
              <div className="mt-12">
                <ToolsCapabilityMap />
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ═══ CHAPTER 3: FORMULA BLUEPRINT ═══ */}
      <section id="blueprint" className="py-20 md:py-28 bg-white relative overflow-hidden">
        <BlueBoom position="center" />
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
                Fig. 03 — {isDevice ? "Technology" : "Formula Blueprint"}
              </p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em" }}>
                {isDevice ? "How It Works" : "Ingredient Science"}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Delivery Engine / Barrier Simulator / Tech stack */}
            <ScrollReveal direction="left">
              {isDevice ? (
                <div className="bg-gradient-to-b from-[#f7f7fa] to-[#eef0f7] rounded-3xl p-8 border border-[#f0f0f0]">
                  <p className="text-[11px] tracking-[0.1em] uppercase text-[#0E39A9] mb-6" style={{ fontWeight: 600 }}>
                    Technology Stack
                  </p>
                  <SkinDepthDiagram interactive={false} showDelivery />
                  <div className="mt-6 pt-4 border-t border-[#e5e7eb]">
                    <p className="text-[11px] text-[#4B5563] leading-relaxed">
                      Fig. 03 — Multi-modality technology stack working synergistically.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <DeliveryEngine compact />
                  <BarrierSimulator compact />
                </div>
              )}
            </ScrollReveal>

            <div>
              {/* Ingredient Proof Cards for non-device products */}
              {!isDevice && (
                <div className="mb-8">
                  <IngredientProofCards compact />
                  <button
                    onClick={() => setIngredientExplorerOpen(true)}
                    className="mt-4 flex items-center gap-2 text-[12px] text-[#0E39A9] hover:text-[#0c2f8a] transition-colors"
                    style={{ fontWeight: 600 }}
                  >
                    <Beaker size={14} /> Explore Full Ingredient List
                    <ChevronRight size={12} />
                  </button>
                </div>
              )}

              {/* How to Use — Visual 3-step storyboard */}
              {hasCustomPDP && (
                <div>
                  <p className="text-[11px] tracking-[0.1em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
                    How to Use
                  </p>
                  <div className="space-y-3">
                    {pdp.howToUse.map((step, i) => (
                      <motion.div
                        key={step.step}
                        {...(isCapture ? {} : { initial: { opacity: 0, x: 20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { delay: i * 0.1 } })}
                        className="flex items-start gap-4 p-4 bg-[#F7F7F7] rounded-xl border border-[#f0f0f0] hover:border-[#0E39A9]/20 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#0E39A9] text-white flex items-center justify-center shrink-0 text-[13px]" style={{ fontWeight: 600 }}>
                          {step.step}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] text-[#111827]" style={{ fontWeight: 600 }}>{step.title}</p>
                          <p className="text-[12px] text-[#4B5563] mt-0.5 leading-relaxed">{step.desc}</p>
                        </div>
                        <span className="text-[11px] text-[#0E39A9] bg-[#0E39A9]/5 px-2.5 py-1 rounded-full shrink-0" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                          {step.time}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CHAPTER 4: APPLICATION STUDIO ═══ */}
      <section id="studio" className="py-16 md:py-28 bg-[#F7F7F7] relative overflow-hidden">
        <BlueBoom position="bottom-left" />
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-8 md:mb-12">
              <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
                Fig. 04 — Application Studio
              </p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em" }}>
                Guided Session
              </h2>
              <p className="text-[#4B5563] mt-3 max-w-md mx-auto" style={{ fontSize: "0.9375rem" }}>
                Tap a zone. Follow the protocol. Start the timer.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <GuidedApplicationStudio
              variant={
                product.id === "iconic-led"
                  ? "eye-zone"
                  : product.id === "goat-guasha"
                  ? "jawline-neck"
                  : "full-face"
              }
              productName={product.name}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CHAPTER 5: RESULTS ═══ */}
      <section id="results" className="py-20 md:py-28 bg-white relative overflow-hidden">
        <BlueBoom position="top-right" />
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
                Fig. 05 — Results
              </p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em" }}>
                {hasCustomPDP && pdp.stats ? "Reported Outcomes" : "Before & After"}
              </h2>
            </div>
          </ScrollReveal>

          {/* Stats row for devices */}
          {hasCustomPDP && pdp.stats && (
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto text-center mb-16">
              {pdp.stats.map((s) => (
                <div key={s.label} className="p-6 bg-[#F7F7F7] rounded-2xl border border-[#f0f0f0]">
                  <p className="text-[#0E39A9] mb-1" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 600 }}>
                    {s.value}
                  </p>
                  <p className="text-[12px] text-[#4B5563]">{s.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Before/after slider */}
          <div className="max-w-lg mx-auto mb-16">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#e5e7eb] select-none">
              <div className="absolute inset-0">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1760080838885-03e482f4ca71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwc2tpbmNhcmUlMjBnbG93aW5nJTIwSW5kaWFufGVufDF8fHx8MTc3MzIwODQ4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Before"
                  className="w-full h-full object-cover grayscale brightness-95"
                />
                <span className="absolute bottom-4 left-4 text-white bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-[11px]" style={{ fontWeight: 600 }}>BEFORE</span>
              </div>
              <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1760080838885-03e482f4ca71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwc2tpbmNhcmUlMjBnbG93aW5nJTIwSW5kaWFufGVufDF8fHx8MTc3MzIwODQ4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="After"
                  className="w-full h-full object-cover brightness-110 saturate-110"
                />
                <span className="absolute bottom-4 right-4 text-white bg-[#0E39A9]/80 backdrop-blur-sm px-3 py-1 rounded-full text-[11px]" style={{ fontWeight: 600 }}>AFTER</span>
              </div>
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize z-10"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="flex gap-0.5">
                    <div className="w-0.5 h-3 bg-[#9CA3AF] rounded" />
                    <div className="w-0.5 h-3 bg-[#9CA3AF] rounded" />
                  </div>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              />
            </div>
          </div>

          {/* Performance metrics */}
          {!hasCustomPDP || !pdp.stats ? (
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto text-center">
              {[
                { value: 72, suffix: "h", label: "Moisture lock tested" },
                { value: 94, suffix: "%", label: "Felt more hydrated" },
                { value: 3, suffix: "wk", label: "Visible barrier improvement" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="text-[#0E39A9]" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 600 }}>
                    <AnimatedCounter end={m.value} suffix={m.suffix} />
                  </div>
                  <p className="text-[12px] text-[#4B5563] mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          ) : null}

          {/* Founder Cut */}
          {hasCustomPDP && pdp.founderCut && (
            <ScrollReveal delay={0.3}>
              <div className="max-w-2xl mx-auto mt-16 bg-gradient-to-r from-[#0E39A9]/5 to-transparent rounded-2xl p-8 border-l-2 border-[#0E39A9]">
                <p className="text-[11px] tracking-[0.1em] uppercase text-[#0E39A9] mb-3" style={{ fontWeight: 600 }}>
                  Founder's Cut
                </p>
                <p className="text-[#4B5563] italic" style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}>
                  "{pdp.founderCut}"
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ═══ CHAPTER 6: REVIEWS ═══ */}
      <section id="reviews-section" className="py-20 md:py-28 bg-[#F7F7F7]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
                Fig. 06 — Reviews
              </p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em" }}>What Customers Say</h2>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="fill-[#0E39A9] text-[#0E39A9]" />
                  ))}
                </div>
                <span className="text-[13px] text-[#4B5563]">4.9 average</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Customer Video Thumbnails — viewport-entry auto-play */}
          <ScrollReveal delay={0.15}>
            <div className="flex gap-4 max-w-3xl mx-auto mb-10 overflow-x-auto pb-2 scrollbar-hide">
              {[
                { label: "My Routine", duration: "0:45" },
                { label: "First Impressions", duration: "1:12" },
                { label: "30-Day Results", duration: "2:03" },
              ].map((vid) => (
                <VideoThumb key={vid.label} label={vid.label} duration={vid.duration} />
              ))}
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {(hasCustomPDP ? pdp.reviews : [
              { name: "Customer", text: "This product exceeded my expectations. Highly recommended!", rating: 5 },
            ]).map((review, i) => (
              <ScrollReveal key={review.name} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 border border-[#f0f0f0]">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} size={14} className="fill-[#0E39A9] text-[#0E39A9]" />
                    ))}
                  </div>
                  <p className="text-[14px] text-[#4B5563] leading-relaxed mb-6">"{review.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0E39A9] to-[#5C73E6] flex items-center justify-center text-white text-[12px]" style={{ fontWeight: 600 }}>
                      {review.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-[13px] text-[#111827]" style={{ fontWeight: 600 }}>{review.name}</p>
                      <p className="text-[11px] text-[#9CA3AF]">Verified Buyer</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CHAPTER 7: FAQ ═══ */}
      <section id="faq-section" className="py-20 md:py-28 bg-white">
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
                Fig. 07 — FAQ
              </p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em" }}>
                Frequently Asked Questions
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-0">
            {(hasCustomPDP ? pdp.faqs : [
              { q: "How long does the product last?", a: "With daily use, the product typically lasts 4-6 weeks." },
              { q: "Is it suitable for all skin types?", a: "Yes, our products are formulated and tested for all Indian skin types." },
              { q: "What is the return policy?", a: "We offer a 30-day return policy for all products." },
            ]).map((faq, i) => (
              <ScrollReveal key={faq.q} delay={i * 0.05}>
                <div className="border-b border-[#f0f0f0]">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === `faq-${i}` ? null : `faq-${i}`)}
                    className="w-full flex items-center justify-between py-5 text-left"
                  >
                    <span className="text-[14px] text-[#111827] pr-4" style={{ fontWeight: 600 }}>{faq.q}</span>
                    <ChevronDown size={16} className={`shrink-0 text-[#9CA3AF] transition-transform duration-200 ${openAccordion === `faq-${i}` ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openAccordion === `faq-${i}` && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-[13px] text-[#4B5563] leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPLETE THE ROUTINE WITH AM/PM TOGGLE ═══ */}
      <section className="py-20 md:py-28 bg-[#F7F7F7]">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-8">
              <p className="text-[12px] tracking-[0.2em] uppercase text-[#0E39A9] mb-4" style={{ fontWeight: 600 }}>
                Complete the Routine
              </p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em" }}>
                Pair With Your {routineToggle} Routine
              </h2>
            </div>
          </ScrollReveal>

          {/* AM/PM Toggle */}
          <div className="flex justify-center mb-10">
            <div className="bg-white rounded-full p-1 flex border border-[#f0f0f0]">
              {(["AM", "PM"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setRoutineToggle(t)}
                  className={`relative flex items-center gap-1.5 px-6 py-2.5 rounded-full text-[13px] transition-all duration-300 ${
                    routineToggle === t ? "text-white" : "text-[#4B5563]"
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  {routineToggle === t && (
                    <motion.div
                      layoutId="routineTogglePDP"
                      className={`absolute inset-0 rounded-full ${t === "AM" ? "bg-[#0E39A9]" : "bg-[#111827]"}`}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {t === "AM" ? <Sun size={14} /> : <Moon size={14} />} {t}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              .filter((p) => p.id !== product.id)
              .filter((p) => {
                if (routineToggle === "AM") return p.concern.some(c => ["Hydration", "Brightening", "Pigmentation", "Deep cleansing"].includes(c));
                return p.concern.some(c => ["Anti-aging", "Firming", "Barrier repair", "Fine lines"].includes(c));
              })
              .slice(0, 3)
              .map((p) => (
                <InlineProductCard key={p.id} product={p} />
              ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/routines"
              className="group inline-flex items-center gap-2 text-[13px] text-[#0E39A9] hover:gap-3 transition-all"
              style={{ fontWeight: 500 }}
            >
              View Full Routine Protocol <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ingredient Explorer Bottom Sheet */}
      <IngredientExplorer
        isOpen={ingredientExplorerOpen}
        onClose={() => setIngredientExplorerOpen(false)}
        productId={product.id}
      />

      {/* ══ STICKY BOTTOM BAR — safe area for mobile ═══ */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-[#f0f0f0] z-40 md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        <div className="px-4 py-3 flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-[13px] text-[#111827] truncate" style={{ fontWeight: 600 }}>{product.name}</p>
            <p className="text-[14px] text-[#111827]" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>₹{product.price.toLocaleString()}</p>
          </div>
          <button className="flex items-center gap-2 bg-[#0E39A9] text-white px-4 py-2.5 rounded-full text-[12px] shrink-0 hover:shadow-[0_0_20px_rgba(14,57,169,0.3)] transition-all" style={{ fontWeight: 500 }}>
            <ShoppingBag size={13} /> Add
          </button>
          <button className="flex items-center gap-2 bg-[#111827] text-white px-4 py-2.5 rounded-full text-[12px] shrink-0" style={{ fontWeight: 500 }}>
            Buy Now
          </button>
        </div>
      </div>
      {/* Bottom spacer for sticky bar */}
      <div className="h-20 md:hidden" />
    </div>
  );
}