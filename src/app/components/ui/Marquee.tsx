import { useRef, useEffect, useState } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({ children, speed = 30, pauseOnHover = true, className = "" }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const firstChild = containerRef.current.firstElementChild as HTMLElement;
      if (firstChild) setContentWidth(firstChild.scrollWidth);
    }
  }, [children]);

  const duration = contentWidth / speed;

  return (
    <div
      className={`overflow-hidden ${pauseOnHover ? "[&:hover_div]:![animation-play-state:paused]" : ""} ${className}`}
    >
      <div
        ref={containerRef}
        className="flex w-max"
        style={{
          animation: `marquee ${duration}s linear infinite`,
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>{children}</div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
