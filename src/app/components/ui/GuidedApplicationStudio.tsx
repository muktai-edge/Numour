import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Pause,
  X,
  Clock,
  Hand,
  ShieldCheck,
  AlertTriangle,
  ArrowUp,
  Droplets,
  Sun,
  Zap,
  Snowflake,
  Flame,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

/* ═══════════════════════════════════════════════════════
   TYPES & DATA
   ═══════════════════════════════════════════════════════ */

type StudioVariant = "full-face" | "eye-zone" | "jawline-neck";

interface Zone {
  id: string;
  label: string;
  instruction: string;
  time: string;
  seconds: number;
  pressure: 1 | 2 | 3;
  pressureLabel: string;
  direction: string;
  directionAngle: number; // degrees for arrow rotation
  // Position as % of face container
  top: number;
  left: number;
  width: number;
  height: number;
}

interface Mode {
  id: string;
  label: string;
  desc: string;
  icon: typeof Zap;
}

interface TechniqueCard {
  step: number;
  title: string;
  instruction: string;
  timeChip?: string;
  icon: typeof Droplets;
}

interface VariantConfig {
  zones: Zone[];
  modes?: Mode[];
  timePresets: number[]; // seconds
  defaultTime: number;
  techniques: TechniqueCard[];
}

const FACE_PHOTO =
  "https://images.unsplash.com/photo-1630255733038-0eaa251036c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGZhY2UlMjBwb3J0cmFpdCUyMHN0dWRpbyUyMHNraW5jYXJlJTIwY2xlYW4lMjBiZWF1dHl8ZW58MXx8fHwxNzczMjE5MzkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const variantConfigs: Record<StudioVariant, VariantConfig> = {
  "full-face": {
    zones: [
      { id: "forehead", label: "Forehead", instruction: "Upward strokes from brow to hairline", time: "0:30", seconds: 30, pressure: 1, pressureLabel: "Gentle", direction: "up", directionAngle: 0, top: 12, left: 50, width: 56, height: 16 },
      { id: "cheeks", label: "Cheeks", instruction: "Outward sweeps from nose to temples", time: "0:30", seconds: 30, pressure: 2, pressureLabel: "Medium", direction: "out", directionAngle: 45, top: 42, left: 50, width: 72, height: 16 },
      { id: "under-eye", label: "Under-eye", instruction: "Feather-light taps along orbital bone", time: "0:20", seconds: 20, pressure: 1, pressureLabel: "Gentle", direction: "out", directionAngle: 30, top: 34, left: 50, width: 54, height: 10 },
      { id: "jawline", label: "Jawline", instruction: "Upward lifts from chin to ear", time: "0:25", seconds: 25, pressure: 2, pressureLabel: "Medium", direction: "up-out", directionAngle: -45, top: 66, left: 50, width: 62, height: 12 },
      { id: "neck", label: "Neck", instruction: "Upward strokes from collarbone", time: "0:15", seconds: 15, pressure: 1, pressureLabel: "Gentle", direction: "up", directionAngle: 0, top: 82, left: 50, width: 50, height: 14 },
    ],
    timePresets: [60, 90, 120],
    defaultTime: 120,
    techniques: [
      { step: 1, title: "Apply", instruction: "Dot product on 5 points: forehead, cheeks, nose, chin", icon: Droplets },
      { step: 2, title: "Glide", instruction: "Follow zone arrows with upward, outward strokes", timeChip: "2 min", icon: ArrowUp },
      { step: 3, title: "Finish", instruction: "Pat remaining product in. Follow with SPF (AM)", icon: Sun },
    ],
  },
  "eye-zone": {
    zones: [
      { id: "under-eye", label: "Under-eye", instruction: "Feather-light taps along orbital bone", time: "1:00", seconds: 60, pressure: 1, pressureLabel: "Gentle", direction: "out", directionAngle: 30, top: 38, left: 50, width: 60, height: 14 },
      { id: "crows-feet", label: "Crow's feet", instruction: "Tiny circles at outer corners", time: "1:00", seconds: 60, pressure: 1, pressureLabel: "Gentle", direction: "circle", directionAngle: 0, top: 40, left: 50, width: 72, height: 10 },
      { id: "brow-bone", label: "Brow bone", instruction: "Gentle press along brow arch", time: "1:00", seconds: 60, pressure: 1, pressureLabel: "Gentle", direction: "out", directionAngle: -15, top: 22, left: 50, width: 58, height: 10 },
    ],
    modes: [
      { id: "led", label: "LED Therapy", desc: "72 Red LEDs for collagen boost", icon: Zap },
      { id: "massage", label: "Massage", desc: "Multi-frequency sonic pulses", icon: Hand },
      { id: "combo", label: "Combo", desc: "LED + sonic for maximum results", icon: Zap },
    ],
    timePresets: [120, 180],
    defaultTime: 180,
    techniques: [
      { step: 1, title: "Apply", instruction: "Dab eye cream on orbital bone with ring finger", icon: Droplets },
      { step: 2, title: "Glide", instruction: "Place mask over eye area. Run 3 min session", timeChip: "3 min", icon: ArrowUp },
      { step: 3, title: "Finish", instruction: "Remove mask. Pat excess product gently", icon: Sun },
    ],
  },
  "jawline-neck": {
    zones: [
      { id: "jawline", label: "Jawline", instruction: "Lift from chin to ear with firm strokes", time: "1:00", seconds: 60, pressure: 2, pressureLabel: "Medium", direction: "up-out", directionAngle: -45, top: 64, left: 50, width: 64, height: 14 },
      { id: "cheeks", label: "Cheeks", instruction: "Sweep upward from jaw to cheekbone", time: "1:00", seconds: 60, pressure: 2, pressureLabel: "Medium", direction: "up", directionAngle: -30, top: 42, left: 50, width: 70, height: 16 },
      { id: "neck", label: "Neck", instruction: "Upward strokes from collarbone to chin", time: "1:00", seconds: 60, pressure: 1, pressureLabel: "Gentle", direction: "up", directionAngle: 0, top: 82, left: 50, width: 48, height: 14 },
    ],
    modes: [
      { id: "warm", label: "Lift (Warm)", desc: "42 C thermal for sculpting", icon: Flame },
      { id: "cold", label: "Depuff (Cold)", desc: "12 C cryo for tightening", icon: Snowflake },
      { id: "led", label: "Clear (LED)", desc: "Blue LED for calming", icon: Zap },
    ],
    timePresets: [120, 180],
    defaultTime: 180,
    techniques: [
      { step: 1, title: "Apply", instruction: "Apply serum or gel for glide. Never use on dry skin", icon: Droplets },
      { step: 2, title: "Glide", instruction: "Follow jawline arrows. Use 45 angle, firm pressure", timeChip: "3 min", icon: ArrowUp },
      { step: 3, title: "Finish", instruction: "Wipe device. Apply moisturiser + SPF (AM)", icon: Sun },
    ],
  },
};

/* ═══════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════ */

function PressureDots({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span className="inline-flex gap-1">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i <= level ? "bg-[#0E39A9]" : "bg-[#E5E7EB]"
          }`}
        />
      ))}
    </span>
  );
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */

interface Props {
  variant: StudioVariant;
  productName?: string;
}

export function GuidedApplicationStudio({ variant, productName }: Props) {
  const config = variantConfigs[variant];
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Session state
  const [sessionActive, setSessionActive] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [remaining, setRemaining] = useState(config.defaultTime);
  const [selectedPreset, setSelectedPreset] = useState(config.defaultTime);
  const [activeMode, setActiveMode] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalTime = selectedPreset;
  const progress = ((totalTime - remaining) / totalTime) * 100;

  // Timer logic
  useEffect(() => {
    if (timerRunning && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerRunning, remaining]);

  const handleZoneTap = useCallback(
    (zone: Zone) => {
      setSelectedZone(zone);
      setSheetOpen(true);
    },
    []
  );

  const handleStartSession = useCallback(() => {
    setSheetOpen(false);
    setStep(2);
    setSessionActive(true);
    setRemaining(selectedPreset);
    setTimerRunning(true);
  }, [selectedPreset]);

  const handleToggleTimer = useCallback(() => {
    if (remaining <= 0) {
      setRemaining(selectedPreset);
      setTimerRunning(true);
    } else {
      setTimerRunning((prev) => !prev);
    }
  }, [remaining, selectedPreset]);

  const handleReset = useCallback(() => {
    setStep(1);
    setSessionActive(false);
    setTimerRunning(false);
    setRemaining(config.defaultTime);
    setSelectedZone(null);
    setSheetOpen(false);
  }, [config.defaultTime]);

  const handlePresetChange = useCallback((preset: number) => {
    setSelectedPreset(preset);
    setRemaining(preset);
    setTimerRunning(false);
  }, []);

  /* ─── RING GEOMETRY ─── */
  const ringR = 42;
  const ringC = 2 * Math.PI * ringR;

  return (
    <div className="bg-white rounded-3xl border border-[#f0f0f0] overflow-hidden shadow-[0_20px_60px_-12px_rgba(0,0,0,0.06)]">
      {/* ═══ HEADER ═══ */}
      <div className="p-4 md:p-6 border-b border-[#f0f0f0]">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p
              className="text-[11px] tracking-[0.12em] uppercase text-[#0E39A9]"
              style={{ fontWeight: 600 }}
            >
              Application Studio
            </p>
            <p className="text-[13px] md:text-[14px] text-[#111827] mt-0.5" style={{ fontWeight: 600 }}>
              Guided session
            </p>
            <p className="text-[11px] text-[#6B7280] mt-0.5 hidden sm:block">
              Tap a zone. Follow the protocol. Start timer.
            </p>
          </div>
          {/* Step Indicator */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => step === 2 ? handleReset() : undefined}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] transition-all ${
                step === 1
                  ? "bg-[#0E39A9] text-white"
                  : "bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]"
              }`}
              style={{ fontWeight: 600 }}
            >
              <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[9px]">1</span>
              <span className="hidden sm:inline">Select</span>
            </button>
            <div className="w-4 h-px bg-[#D1D5DB]" />
            <span
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] ${
                step === 2
                  ? "bg-[#0E39A9] text-white"
                  : "bg-[#F3F4F6] text-[#9CA3AF]"
              }`}
              style={{ fontWeight: 600 }}
            >
              <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[9px]">2</span>
              <span className="hidden sm:inline">Session</span>
            </span>
          </div>
        </div>
      </div>

      {/* ═══ STEP 1: ZONE SELECTION (face photo + zones) ═══ */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22 }}
          >
            <div className="grid md:grid-cols-2">
              {/* Face Photo with Zones */}
              <div className="relative aspect-[3/4] md:aspect-auto bg-gradient-to-b from-[#f5f5f8] to-[#eaecf3] overflow-hidden">
                {/* Real face photo */}
                <ImageWithFallback
                  src={FACE_PHOTO}
                  alt="Face treatment zones"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                {/* Light overlay for zone readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-white/20" />

                {/* Zone buttons */}
                {config.zones.map((zone, idx) => (
                  <button
                    key={zone.id}
                    onClick={() => handleZoneTap(zone)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group"
                    style={{
                      top: `${zone.top}%`,
                      left: `${zone.left}%`,
                      width: `${zone.width}%`,
                      height: `${zone.height}%`,
                      minHeight: 44,
                      minWidth: 44,
                    }}
                  >
                    {/* Visible zone outline on hover / when selected */}
                    <motion.div
                      className={`absolute inset-0 rounded-[50%] border transition-all duration-160 ${
                        selectedZone?.id === zone.id
                          ? "border-[#0E39A9]/60 bg-[#0E39A9]/8"
                          : "border-transparent group-hover:border-[#0E39A9]/30 group-hover:bg-[#0E39A9]/5"
                      }`}
                    />
                    {/* Numbered marker */}
                    {selectedZone?.id === zone.id && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.16 }}
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#0E39A9] text-white flex items-center justify-center text-[9px] z-10 shadow-md"
                        style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </motion.div>
                    )}
                    {/* Direction arrow when selected */}
                    {selectedZone?.id === zone.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      >
                        <ArrowUp
                          size={18}
                          className="text-[#0E39A9]"
                          style={{ transform: `rotate(${zone.directionAngle}deg)` }}
                        />
                      </motion.div>
                    )}
                  </button>
                ))}

                {/* Figure caption */}
                <div className="absolute bottom-3 left-3">
                  <span
                    className="text-[10px] tracking-[0.12em] uppercase text-white/70 bg-black/30 backdrop-blur-sm rounded-md px-2 py-1"
                    style={{ fontWeight: 500 }}
                  >
                    Fig. A &mdash; Treatment zones
                  </span>
                </div>
              </div>

              {/* Zone Info Panel (desktop) + prompt */}
              <div className="hidden md:flex flex-col justify-center p-6 lg:p-8 min-h-[320px]">
                <AnimatePresence mode="wait">
                  {selectedZone ? (
                    <motion.div
                      key={selectedZone.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.16 }}
                    >
                      <p
                        className="text-[11px] tracking-[0.1em] uppercase text-[#0E39A9] mb-2"
                        style={{ fontWeight: 600 }}
                      >
                        {selectedZone.label}
                      </p>
                      <p
                        className="text-[#111827] mb-4"
                        style={{ fontSize: "1.125rem", fontWeight: 600, letterSpacing: "-0.01em" }}
                      >
                        {selectedZone.instruction}
                      </p>
                      <div className="flex flex-wrap gap-4 text-[12px] text-[#4B5563] mb-6">
                        <span className="flex items-center gap-1.5">
                          <Clock size={13} className="text-[#0E39A9]" />
                          <span style={{ fontVariantNumeric: "tabular-nums" }}>{selectedZone.time}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <PressureDots level={selectedZone.pressure} />
                          <span>{selectedZone.pressureLabel}</span>
                        </span>
                      </div>
                      <button
                        onClick={handleStartSession}
                        className="inline-flex items-center gap-2 bg-[#0E39A9] text-white text-[13px] px-5 py-2.5 rounded-full hover:bg-[#0B2E8A] transition-colors"
                        style={{ fontWeight: 600 }}
                      >
                        <Play size={14} className="ml-0.5" />
                        Start session
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="prompt"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-[#0E39A9]/5 flex items-center justify-center mx-auto mb-4">
                        <Hand size={22} className="text-[#0E39A9]" />
                      </div>
                      <p className="text-[15px] text-[#111827] mb-1" style={{ fontWeight: 600 }}>
                        Tap a zone
                      </p>
                      <p className="text-[12px] text-[#6B7280]">
                        to see technique, pressure &amp; timing
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ STEP 2: SESSION PLAYER ═══ */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="p-4 md:p-6 space-y-5"
          >
            {/* Session Player Card */}
            <div className="bg-gradient-to-br from-[#f8f9fc] to-[#f0f2f8] rounded-2xl p-5 md:p-6 border border-[#e8eaf2]">
              <p
                className="text-[10px] tracking-[0.14em] uppercase text-[#6B7280] mb-4"
                style={{ fontWeight: 500 }}
              >
                Fig. B &mdash; Session protocol
              </p>

              <div className="flex items-center gap-5 md:gap-8">
                {/* Timer Ring */}
                <div className="relative shrink-0">
                  <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-28 md:h-28 -rotate-90">
                    <circle cx="50" cy="50" r={ringR} fill="none" stroke="#E5E7EB" strokeWidth="3" />
                    <circle
                      cx="50"
                      cy="50"
                      r={ringR}
                      fill="none"
                      stroke="#0E39A9"
                      strokeWidth="3"
                      strokeDasharray={ringC}
                      strokeDashoffset={ringC * (1 - progress / 100)}
                      strokeLinecap="round"
                      style={{ transition: "stroke-dashoffset 0.3s ease" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                      className="text-[20px] md:text-[22px] text-[#111827]"
                      style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}
                    >
                      {formatTime(remaining)}
                    </span>
                    {selectedZone && (
                      <span className="text-[9px] text-[#6B7280] mt-0.5" style={{ fontWeight: 500 }}>
                        {selectedZone.label}
                      </span>
                    )}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex-1 min-w-0 space-y-3">
                  {/* Play / Pause */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleToggleTimer}
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                        timerRunning
                          ? "bg-[#111827] text-white"
                          : "bg-[#0E39A9] text-white"
                      }`}
                    >
                      {timerRunning ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                    </button>
                    <span className="text-[12px] text-[#6B7280]" style={{ fontWeight: 500 }}>
                      {remaining <= 0
                        ? "Complete"
                        : timerRunning
                        ? "Running"
                        : "Paused"}
                    </span>
                  </div>

                  {/* Time Presets */}
                  <div className="flex items-center gap-2">
                    {config.timePresets.map((p) => (
                      <button
                        key={p}
                        onClick={() => handlePresetChange(p)}
                        className={`px-3 py-1 rounded-full text-[11px] transition-colors ${
                          selectedPreset === p
                            ? "bg-[#0E39A9] text-white"
                            : "bg-white text-[#4B5563] border border-[#E5E7EB] hover:border-[#0E39A9]/30"
                        }`}
                        style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}
                      >
                        {formatTime(p)}
                      </button>
                    ))}
                  </div>

                  {/* Haptic cue */}
                  {selectedZone && (
                    <div className="flex items-center gap-1.5 text-[11px] text-[#6B7280]">
                      <PressureDots level={selectedZone.pressure} />
                      <span>{selectedZone.pressureLabel} pressure</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Mode Switcher (devices only) */}
              {config.modes && (
                <div className="mt-5 pt-4 border-t border-[#E5E7EB]/60">
                  <p className="text-[10px] tracking-[0.1em] uppercase text-[#6B7280] mb-2.5" style={{ fontWeight: 500 }}>
                    Mode
                  </p>
                  <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                    {config.modes.map((mode, i) => {
                      const Icon = mode.icon;
                      return (
                        <button
                          key={mode.id}
                          onClick={() => setActiveMode(i)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] whitespace-nowrap shrink-0 transition-all ${
                            activeMode === i
                              ? "bg-[#0E39A9] text-white shadow-sm"
                              : "bg-white text-[#4B5563] border border-[#E5E7EB] hover:border-[#0E39A9]/20"
                          }`}
                          style={{ fontWeight: 600 }}
                        >
                          <Icon size={13} />
                          {mode.label}
                        </button>
                      );
                    })}
                  </div>
                  {config.modes[activeMode] && (
                    <p className="text-[11px] text-[#6B7280] mt-2">
                      {config.modes[activeMode].desc}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* ─── TECHNIQUE CARDS ─── */}
            <div>
              <p
                className="text-[11px] tracking-[0.12em] uppercase text-[#6B7280] mb-3"
                style={{ fontWeight: 500 }}
              >
                Technique
              </p>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {config.techniques.map((tc) => {
                  const Icon = tc.icon;
                  return (
                    <div
                      key={tc.step}
                      className="bg-[#FAFAFA] rounded-xl border border-[#f0f0f0] p-3 md:p-4 flex flex-col items-center text-center"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#0E39A9]/5 flex items-center justify-center mb-2">
                        <Icon size={15} className="text-[#0E39A9]" />
                      </div>
                      <p className="text-[12px] text-[#111827] mb-1" style={{ fontWeight: 600 }}>
                        {tc.title}
                      </p>
                      <p className="text-[10px] text-[#6B7280] leading-snug">
                        {tc.instruction}
                      </p>
                      {tc.timeChip && (
                        <span
                          className="mt-2 inline-flex px-2 py-0.5 rounded-full bg-[#0E39A9]/8 text-[#0E39A9] text-[9px]"
                          style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}
                        >
                          {tc.timeChip}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ─── SAFE ZONE / AVOID MICROGUIDE ─── */}
            <div className="flex gap-2 md:gap-3">
              <div className="flex-1 bg-[#F0FDF4] rounded-xl border border-[#BBF7D0]/60 p-3 flex items-start gap-2.5">
                <ShieldCheck size={15} className="text-[#16A34A] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] text-[#166534] mb-0.5" style={{ fontWeight: 600 }}>Safe</p>
                  <p className="text-[10px] text-[#4D7C0F] leading-snug">
                    Gentle pressure, upward strokes, clean device
                  </p>
                </div>
              </div>
              <div className="flex-1 bg-[#FEF2F2] rounded-xl border border-[#FECACA]/60 p-3 flex items-start gap-2.5">
                <AlertTriangle size={15} className="text-[#DC2626] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] text-[#991B1B] mb-0.5" style={{ fontWeight: 600 }}>Avoid</p>
                  <p className="text-[10px] text-[#B91C1C] leading-snug">
                    Broken skin, pressing hard, eyelid contact
                  </p>
                </div>
              </div>
            </div>

            {/* Back button */}
            <button
              onClick={handleReset}
              className="text-[12px] text-[#6B7280] hover:text-[#0E39A9] transition-colors flex items-center gap-1"
              style={{ fontWeight: 500 }}
            >
              <ArrowUp size={12} className="rotate-[270deg]" />
              Back to zones
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ MOBILE BOTTOM SHEET ═══ */}
      <AnimatePresence>
        {sheetOpen && selectedZone && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="md:hidden fixed inset-0 bg-black/30 z-50"
              onClick={() => setSheetOpen(false)}
            />
            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              className="md:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.12)]"
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-[#D1D5DB]" />
              </div>
              <div className="p-5 pb-8 space-y-4">
                {/* Zone title */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Hand size={16} className="text-[#0E39A9]" />
                    <span
                      className="text-[13px] text-[#111827]"
                      style={{ fontWeight: 600 }}
                    >
                      {selectedZone.label}
                    </span>
                  </div>
                  <button
                    onClick={() => setSheetOpen(false)}
                    className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center"
                  >
                    <X size={14} className="text-[#6B7280]" />
                  </button>
                </div>

                {/* Instruction */}
                <p className="text-[15px] text-[#111827]" style={{ fontWeight: 600 }}>
                  {selectedZone.instruction}
                </p>

                {/* Meta row */}
                <div className="flex items-center gap-5 text-[12px] text-[#4B5563]">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-[#0E39A9]" />
                    <span style={{ fontVariantNumeric: "tabular-nums" }}>
                      {selectedZone.time}
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <PressureDots level={selectedZone.pressure} />
                    <span>{selectedZone.pressureLabel}</span>
                  </span>
                </div>

                {/* Mini direction diagram */}
                <div className="flex items-center gap-2 px-3 py-2.5 bg-[#FAFAFA] rounded-xl border border-[#f0f0f0]">
                  <ArrowUp
                    size={16}
                    className="text-[#0E39A9]"
                    style={{ transform: `rotate(${selectedZone.directionAngle}deg)` }}
                  />
                  <span className="text-[11px] text-[#4B5563]" style={{ fontWeight: 500 }}>
                    Stroke direction: {selectedZone.direction}
                  </span>
                </div>

                {/* CTA */}
                <button
                  onClick={handleStartSession}
                  className="w-full flex items-center justify-center gap-2 bg-[#0E39A9] text-white text-[14px] py-3 rounded-full hover:bg-[#0B2E8A] transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  <Play size={15} />
                  Start session
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
