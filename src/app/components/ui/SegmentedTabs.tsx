import { motion } from "motion/react";

interface SegmentedTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  layoutId?: string;
  size?: "sm" | "md";
}

export function SegmentedTabs({
  tabs,
  activeTab,
  onTabChange,
  layoutId = "segTab",
  size = "md",
}: SegmentedTabsProps) {
  const px = size === "sm" ? "px-5 py-2" : "px-6 py-2.5";
  return (
    <div className="inline-flex bg-[#F3F4F6] rounded-full p-1 gap-0.5">
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`relative ${px} rounded-full text-[13px] tracking-[0.01em] transition-colors duration-200 whitespace-nowrap ${
              isActive ? "text-white" : "text-[#4B5563] hover:text-[#111827]"
            }`}
            style={{ fontWeight: isActive ? 600 : 500 }}
          >
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="absolute inset-0 bg-[#0E39A9] rounded-full"
                transition={{ type: "spring", bounce: 0.12, duration: 0.45 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        );
      })}
    </div>
  );
}
