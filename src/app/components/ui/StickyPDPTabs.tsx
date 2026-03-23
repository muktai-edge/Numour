import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";

interface Tab {
  id: string;
  label: string;
}

interface StickyPDPTabsProps {
  tabs: Tab[];
}

export function StickyPDPTabs({ tabs }: StickyPDPTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    // Show after scrolling past above-the-fold (~600px)
    setVisible(scrollY > 600);

    // Determine active section
    for (let i = tabs.length - 1; i >= 0; i--) {
      const el = document.getElementById(tabs[i].id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
          setActiveTab(tabs[i].id);
          break;
        }
      }
    }
  }, [tabs]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-[72px] left-0 right-0 z-30 bg-white/90 backdrop-blur-xl border-b border-[#f0f0f0]"
    >
      <div className="max-w-[1320px] mx-auto px-4 md:px-8">
        <div className="flex gap-1 overflow-x-auto py-1" style={{ scrollbarWidth: "none" }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => jumpTo(tab.id)}
                className={`relative px-4 py-2.5 text-[12px] whitespace-nowrap transition-colors ${
                  isActive ? "text-[#0E39A9]" : "text-[#6B7280] hover:text-[#111827]"
                }`}
                style={{ fontWeight: isActive ? 600 : 500 }}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="pdpTabIndicator"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#0E39A9] rounded-full"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
