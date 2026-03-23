/** Capture mode — append ?capture to the URL to disable all scroll-reveal animations for Figma export */
export const isCapture =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("capture");

/** Returns motion props that skip animation in capture mode */
export function captureProps(
  initial: Record<string, unknown>,
  whileInView: Record<string, unknown>,
  opts?: { viewport?: Record<string, unknown>; transition?: Record<string, unknown> }
) {
  if (isCapture) return {};
  return { initial, whileInView, viewport: opts?.viewport, transition: opts?.transition };
}
