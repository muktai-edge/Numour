import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { FloatingOrbs } from "../components/ui/FloatingOrbs";

export function NotFound() {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      <FloatingOrbs color="#0E39A9" count={3} className="opacity-30" />
      <div className="relative text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p
            className="bg-gradient-to-b from-[#0E39A9] to-[#0E39A9]/20 bg-clip-text text-transparent mb-6"
            style={{
              fontSize: "8rem",
              fontWeight: 700,
              fontVariantNumeric: "tabular-nums",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            404
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-[#111827] mb-3" style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            Page not found
          </h1>
          <p className="text-[#4B5563] mb-8 max-w-sm mx-auto" style={{ fontSize: "0.9375rem" }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 bg-[#0E39A9] text-white px-8 py-3.5 rounded-full text-[14px] hover:bg-[#0c2f8a] hover:shadow-[0_0_30px_rgba(14,57,169,0.3)] transition-all duration-300"
            style={{ fontWeight: 500 }}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
            to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
