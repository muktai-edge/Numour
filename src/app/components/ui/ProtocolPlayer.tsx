import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Play, Pause, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const modes = [
  { tab: "Jar", sessions: [
    { label: "Blue LED", time: 90, product: "Damn Dewy", link: "/product/damn-dewy" },
    { label: "Red LED", time: 120, product: "Collagen Bombshell", link: "/product/collagen-bombshell" },
  ]},
  { tab: "Device", sessions: [
    { label: "Thermal + Red", time: 180, product: "G.O.A.T GuaSha", link: "/product/goat-guasha" },
    { label: "LED + Sonic", time: 180, product: "i-CONIC Eye Mask", link: "/product/iconic-led" },
  ]},
];

export function ProtocolPlayer() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSession, setActiveSession] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const session = modes[activeTab].sessions[activeSession];
  const progress = (elapsed / session.time) * 100;
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const totalMin = Math.floor(session.time / 60);
  const totalSec = session.time % 60;

  useEffect(() => {
    setElapsed(0);
    setIsPlaying(false);
  }, [activeTab, activeSession]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => {
          if (prev >= session.time) {
            setIsPlaying(false);
            return session.time;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, session.time]);

  const formatTime = (m: number, s: number) => `${m}:${String(s).padStart(2, "0")}`;

  return (
    <div className="bg-white rounded-2xl border border-[#f0f0f0] overflow-hidden">
      <div className="p-5 border-b border-[#f0f0f0]">
        <div className="flex items-center justify-between">
          <p className="text-[11px] tracking-[0.1em] uppercase text-[#0E39A9]" style={{ fontWeight: 600 }}>
            Session Player
          </p>
          {/* Tab toggle */}
          <div className="flex bg-[#F3F4F6] rounded-full p-0.5 gap-0.5">
            {modes.map((m, i) => (
              <button
                key={m.tab}
                onClick={() => { setActiveTab(i); setActiveSession(0); }}
                className={`relative px-4 py-1 rounded-full text-[11px] transition-colors ${
                  activeTab === i ? "text-white" : "text-[#4B5563]"
                }`}
                style={{ fontWeight: activeTab === i ? 600 : 500 }}
              >
                {activeTab === i && (
                  <motion.div
                    layoutId="playerTab"
                    className="absolute inset-0 bg-[#0E39A9] rounded-full"
                    transition={{ type: "spring", bounce: 0.12, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{m.tab}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-5">
          {/* Progress ring */}
          <div className="relative w-20 h-20 shrink-0">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r="34" fill="none" stroke="#f0f0f0" strokeWidth="4" />
              <motion.circle
                cx="40" cy="40" r="34" fill="none"
                stroke="#0E39A9" strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 34}`}
                strokeDashoffset={`${2 * Math.PI * 34 * (1 - progress / 100)}`}
                strokeLinecap="round"
                transition={{ duration: 0.3 }}
              />
            </svg>
            <button
              onClick={() => {
                if (!isPlaying && elapsed >= session.time) setElapsed(0);
                setIsPlaying(!isPlaying);
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isPlaying ? "bg-[#111827] text-white" : "bg-[#0E39A9] text-white"
              }`}>
                {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
              </div>
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Session selector chips */}
            <div className="flex gap-1.5 mb-3">
              {modes[activeTab].sessions.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setActiveSession(i)}
                  className={`text-[10px] tracking-[0.02em] px-2.5 py-1 rounded-full transition-all ${
                    activeSession === i
                      ? "bg-[#0E39A9] text-white"
                      : "bg-[#F3F4F6] text-[#4B5563] hover:bg-[#e5e7eb]"
                  }`}
                  style={{ fontWeight: activeSession === i ? 600 : 500 }}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Time display */}
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-[#111827]" style={{ fontSize: "1.25rem", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                {formatTime(minutes, seconds)}
              </span>
              <span className="text-[12px] text-[#9CA3AF]" style={{ fontVariantNumeric: "tabular-nums" }}>
                / {formatTime(totalMin, totalSec)}
              </span>
            </div>

            {/* Product link */}
            <Link
              to={session.link}
              className="group inline-flex items-center gap-1 text-[11px] text-[#0E39A9] hover:gap-1.5 transition-all"
              style={{ fontWeight: 600 }}
            >
              View {session.product} protocol
              <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
