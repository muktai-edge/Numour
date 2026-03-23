/**
 * Subtle studio-light bloom gradient overlay.
 * white → faint blue bloom → white (max 6-8% intensity)
 */
export function BlueBoom({ className = "", position = "center" }: { className?: string; position?: "center" | "top-right" | "bottom-left" }) {
  const positionStyles: Record<string, string> = {
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "top-right": "top-0 right-0 translate-x-1/4 -translate-y-1/4",
    "bottom-left": "bottom-0 left-0 -translate-x-1/4 translate-y-1/4",
  };

  return (
    <div
      className={`absolute w-[800px] h-[800px] rounded-full pointer-events-none ${positionStyles[position]} ${className}`}
      style={{
        background: "radial-gradient(circle, rgba(14,57,169,0.06) 0%, rgba(14,57,169,0.02) 40%, transparent 70%)",
        filter: "blur(80px)",
      }}
    />
  );
}
