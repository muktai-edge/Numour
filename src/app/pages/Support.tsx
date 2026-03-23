import { useState } from "react";
import { ChevronDown, Mail, Truck, RotateCcw, ShieldCheck, HelpCircle, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FloatingOrbs } from "../components/ui/FloatingOrbs";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { isCapture } from "../components/ui/captureMode";

const faqs = [
  { q: "How long does shipping take?", a: "Standard shipping takes 5-7 business days across India. Express shipping (2-3 days) is available for an additional fee. All orders are shipped with tracking." },
  { q: "What is your return policy?", a: "We accept returns within 15 days of delivery for unopened products. Opened products can be returned within 7 days if there's a quality issue. Devices have a 30-day return window." },
  { q: "Are your products tested on animals?", a: "Absolutely not. Numour is 100% cruelty-free. All our products are tested through in-vitro methods and human volunteer panels." },
  { q: "What is the warranty on devices?", a: "All Numour devices come with a 1-year manufacturer warranty covering defects in materials and workmanship. Register your device online within 30 days of purchase for extended warranty." },
  { q: "Are your products suitable for sensitive skin?", a: "Yes. All Numour products are dermatologically tested and formulated with a barrier-first approach. However, we always recommend a patch test before first use." },
  { q: "How do I know which routine is right for me?", a: "Visit our Routines page for curated AM/PM protocols. For personalized recommendations, email us at help@numour.com with your skin type and concerns." },
  { q: "Do you ship internationally?", a: "Currently, we ship within India only. International shipping is planned for Q3 2026. Join our newsletter for updates." },
  { q: "How should I store the Smart Jar products?", a: "Store in a cool, dry place away from direct sunlight. The Smart Jar technology maintains product integrity, but optimal storage extends shelf life." },
];

const supportCards = [
  { icon: Truck, title: "Shipping", desc: "Free shipping on orders above ₹999. Standard delivery in 5-7 business days. Express shipping available." },
  { icon: RotateCcw, title: "Returns", desc: "15-day return policy for unopened products. 7-day window for quality issues on opened items." },
  { icon: ShieldCheck, title: "Warranty", desc: "1-year warranty on all devices. Register within 30 days for extended coverage." },
  { icon: Mail, title: "Contact Us", desc: "Email: support@numour.com. We respond within 24 hours on business days." },
];

export function Support() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-20 md:pt-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#FAFAFA]">
          <FloatingOrbs color="#0E39A9" count={3} className="opacity-30" />
        </div>
        <div className="relative max-w-[1320px] mx-auto px-4 md:px-8 py-20 md:py-28 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#0E39A9]" />
              <span className="text-[12px] tracking-[0.3em] uppercase text-[#0E39A9]" style={{ fontWeight: 600 }}>Support</span>
              <div className="h-px w-12 bg-[#0E39A9]" />
            </div>
            <h1 className="mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
              How can we help?
            </h1>
            <p className="text-[#4B5563] max-w-md mx-auto" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
              Everything you need to know about shipping, returns, warranties, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Support Cards */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCards.map((card, i) => (
              <motion.div
                key={card.title}
                {...(isCapture ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: i * 0.08 } })}
                className="group bg-[#FAFAFA] rounded-2xl p-7 border border-[#f0f0f0] hover:border-[#0E39A9]/20 hover:shadow-[0_20px_60px_-12px_rgba(14,57,169,0.08)] transition-all duration-500"
              >
                <div className="w-11 h-11 rounded-xl bg-[#0E39A9]/5 flex items-center justify-center mb-5 group-hover:bg-[#0E39A9]/10 transition-colors">
                  <card.icon size={20} className="text-[#0E39A9]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[#111827] mb-2" style={{ fontSize: "1rem", fontWeight: 600 }}>{card.title}</h3>
                <p className="text-[12px] text-[#4B5563] leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 md:py-28 bg-[#FAFAFA]">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="w-12 h-12 rounded-xl bg-[#0E39A9]/5 flex items-center justify-center mx-auto mb-4">
              <HelpCircle size={22} className="text-[#0E39A9]" strokeWidth={1.5} />
            </div>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#f0f0f0] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left group"
                >
                  <span className="text-[#111827] pr-4 group-hover:text-[#0E39A9] transition-colors" style={{ fontSize: "0.9375rem", fontWeight: 500 }}>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#9CA3AF] shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 -mt-1">
                      <p className="text-[13px] text-[#4B5563] leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 md:py-28">
        <div className="max-w-xl mx-auto px-4 md:px-8 text-center">
          <h2 className="mb-3" style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em" }}>
            Still have questions?
          </h2>
          <p className="text-[#4B5563] mb-8" style={{ fontSize: "0.9375rem" }}>
            Our support team responds within 24 hours on business days.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:help@numour.com"
              className="group flex items-center gap-2 bg-[#0E39A9] text-white px-8 py-3.5 rounded-full text-[14px] hover:bg-[#0c2f8a] hover:shadow-[0_0_30px_rgba(14,57,169,0.3)] transition-all duration-300"
              style={{ fontWeight: 500 }}
            >
              <Mail size={16} /> help@numour.com
            </a>
            <a
              href="tel:+911234567890"
              className="group flex items-center gap-2 bg-white text-[#111827] px-8 py-3.5 rounded-full text-[14px] border border-[#e5e7eb] hover:border-[#0E39A9] hover:text-[#0E39A9] transition-all duration-300"
              style={{ fontWeight: 500 }}
            >
              <Phone size={16} /> Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}