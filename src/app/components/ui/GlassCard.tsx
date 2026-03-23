import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className = "", dark = false, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl backdrop-blur-[20px] border transition-all duration-500 ${
        dark
          ? "bg-white/[0.08] border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
          : "bg-white/[0.65] border-white/[0.5] shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
      } ${onClick ? "cursor-pointer hover:scale-[1.02]" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
