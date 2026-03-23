import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronUp } from "lucide-react";

export interface Chapter {
  id: string;
  label: string;
  number: string;
}

interface ChapterProgressProps {
  chapters: Chapter[];
}

export function ChapterProgress({ chapters }: ChapterProgressProps) {
  const [activeChapter, setActiveChapter] = useState(0);
  const [showTOC, setShowTOC] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    // Show after scrolling past hero (400px)
    setVisible(scrollY > 400);

    // Find the current chapter
    for (let i = chapters.length - 1; i >= 0; i--) {
      const el = document.getElementById(chapters[i].id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) {
          setActiveChapter(i);
          break;
        }
      }
    }
  }, [chapters]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setShowTOC(false);
    }
  };

  if (!visible) return null;

  return (
    <>
      {/* Fixed indicator */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3"
      >
        {/* Progress dots */}
        <div className="flex flex-col items-center gap-2">
          {chapters.map((ch, i) => (
            <button
              key={ch.id}
              onClick={() => jumpTo(ch.id)}
              className="group relative flex items-center"
              title={ch.label}
            >
              <motion.div
                className="w-1.5 rounded-full transition-colors"
                animate={{
                  height: i === activeChapter ? 24 : 8,
                  backgroundColor: i === activeChapter ? "#0E39A9" : i < activeChapter ? "#0E39A9" : "#d1d5db",
                  opacity: i <= activeChapter ? 1 : 0.4,
                }}
                transition={{ duration: 0.3 }}
              />
              {/* Hover label */}
              <span className="absolute left-5 whitespace-nowrap text-[10px] text-[#4B5563] bg-white/90 backdrop-blur-sm border border-[#f0f0f0] px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-sm" style={{ fontWeight: 500 }}>
                {ch.number} {ch.label}
              </span>
            </button>
          ))}
        </div>

        {/* Current label */}
        <button
          onClick={() => setShowTOC(true)}
          className="mt-2 writing-vertical-lr rotate-180 text-[10px] tracking-[0.08em] uppercase text-[#9CA3AF] hover:text-[#0E39A9] transition-colors cursor-pointer"
          style={{ fontWeight: 500, writingMode: "vertical-lr" }}
        >
          {chapters[activeChapter]?.number} — {chapters[activeChapter]?.label}
        </button>
      </motion.div>

      {/* Mobile indicator */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setShowTOC(true)}
        className="fixed bottom-6 left-6 z-40 lg:hidden flex items-center gap-2 bg-white/90 backdrop-blur-xl border border-[#f0f0f0] shadow-lg px-3 py-2 rounded-full"
      >
        <div className="w-5 h-5 rounded-full bg-[#0E39A9] text-white flex items-center justify-center text-[9px]" style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
          {chapters[activeChapter]?.number}
        </div>
        <span className="text-[11px] text-[#4B5563]" style={{ fontWeight: 500 }}>
          {chapters[activeChapter]?.label}
        </span>
        <ChevronUp size={12} className="text-[#9CA3AF]" />
      </motion.button>

      {/* Table of Contents sheet */}
      <AnimatePresence>
        {showTOC && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
            onClick={() => setShowTOC(false)}
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              className="relative bg-white rounded-t-2xl md:rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1 md:hidden">
                <div className="w-10 h-1 bg-[#d1d5db] rounded-full" />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-[10px] tracking-[0.1em] uppercase text-[#0E39A9]" style={{ fontWeight: 600 }}>
                      Table of Contents
                    </p>
                    <p className="text-[12px] text-[#9CA3AF] mt-0.5" style={{ fontWeight: 400 }}>
                      Jump to any section
                    </p>
                  </div>
                  <button
                    onClick={() => setShowTOC(false)}
                    className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#4B5563] hover:bg-[#e5e7eb] transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="space-y-1">
                  {chapters.map((ch, i) => {
                    const isCurrent = i === activeChapter;
                    const isPast = i < activeChapter;
                    return (
                      <button
                        key={ch.id}
                        onClick={() => jumpTo(ch.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                          isCurrent
                            ? "bg-[#0E39A9]/[0.04] border border-[#0E39A9]/10"
                            : "hover:bg-[#FAFAFA] border border-transparent"
                        }`}
                      >
                        <span
                          className={`text-[12px] w-6 text-center shrink-0 ${
                            isCurrent ? "text-[#0E39A9]" : isPast ? "text-[#0E39A9]/50" : "text-[#d1d5db]"
                          }`}
                          style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}
                        >
                          {ch.number}
                        </span>
                        <div className="flex-1 min-w-0">
                          <span
                            className={`text-[13px] ${
                              isCurrent ? "text-[#0E39A9]" : isPast ? "text-[#111827]" : "text-[#6B7280]"
                            }`}
                            style={{ fontWeight: isCurrent ? 600 : 500 }}
                          >
                            {ch.label}
                          </span>
                        </div>
                        {isCurrent && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0E39A9] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
