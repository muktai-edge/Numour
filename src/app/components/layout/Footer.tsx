import { Link } from "react-router";
import { Instagram, Twitter, Youtube, Linkedin, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#0a0f1a] text-white relative overflow-hidden">
      {/* Subtle gradient orb */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.03] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #0E39A9, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-4 md:px-8 py-20 md:py-28">
        {/* Top section: big CTA */}
        <div className="mb-20 pb-16 border-b border-white/10">
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <div>
              <span
                className="tracking-[-0.04em] text-white"
                style={{ fontSize: "2rem", fontWeight: 600 }}
              >
                NUMOUR
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#0E39A9] ml-1 mb-1" />
              <p className="mt-4 text-[#6B7280] max-w-sm" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
                India's performance-first skincare technology brand. If it doesn't go in, it
                doesn't work.
              </p>
            </div>
            <div>
              <p className="text-[12px] tracking-[0.1em] uppercase text-[#6B7280] mb-4" style={{ fontWeight: 600 }}>
                Stay Updated
              </p>
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-l-full px-5 py-3 text-[14px] text-white placeholder:text-[#4B5563] focus:outline-none focus:border-[#0E39A9] transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#0E39A9] hover:bg-[#1245c7] text-white px-6 py-3 rounded-r-full text-[13px] transition-all duration-300 flex items-center gap-2 hover:shadow-[0_0_30px_rgba(14,57,169,0.4)]"
                  style={{ fontWeight: 500 }}
                >
                  {subscribed ? "Subscribed!" : <><span className="hidden sm:inline">Subscribe</span><ArrowRight size={16} /></>}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-8">
          {/* Products */}
          <div>
            <h4
              className="text-[12px] tracking-[0.12em] uppercase text-[#4B5563] mb-5"
              style={{ fontWeight: 600 }}
            >
              Products
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Smart Jar Series", path: "/collection/smart-jar-series" },
                { label: "Smart Devices", path: "/collection/smart-devices" },
                { label: "Smart Skincare", path: "/collection/smart-skincare" },
                { label: "Damn Dewy", path: "/product/damn-dewy" },
                { label: "G.O.A.T GuaSha", path: "/product/goat-guasha" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-[14px] text-[#6B7280] hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support & Policies */}
          <div>
            <h4
              className="text-[12px] tracking-[0.12em] uppercase text-[#4B5563] mb-5"
              style={{ fontWeight: 600 }}
            >
              Support
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Shipping & Delivery", path: "/support" },
                { label: "Cancellation Policy", path: "/support" },
                { label: "Refund Policy", path: "/support" },
                { label: "Warranty Registration", path: "/warranty" },
                { label: "Contact Us", path: "/support" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-[14px] text-[#6B7280] hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4
              className="text-[12px] tracking-[0.12em] uppercase text-[#4B5563] mb-5"
              style={{ fontWeight: 600 }}
            >
              Company
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "About Us", path: "/about" },
                { label: "Science & Technology", path: "/science" },
                { label: "Routines", path: "/routines" },
                { label: "Numour Nook", path: "/numour-nook" },
                { label: "Terms & Conditions", path: "/support" },
                { label: "Privacy Policy", path: "/support" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-[14px] text-[#6B7280] hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-[12px] tracking-[0.12em] uppercase text-[#4B5563] mb-5"
              style={{ fontWeight: 600 }}
            >
              Connect
            </h4>
            <div className="flex items-center gap-3 mb-6">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Youtube, label: "YouTube" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#6B7280] hover:text-white hover:border-[#0E39A9] hover:bg-[#0E39A9]/20 transition-all duration-300"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
            <p className="text-[13px] text-[#4B5563]">support@numour.com</p>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[#4B5563]">&copy; 2026 Numour. All rights reserved.</p>
          <p className="text-[12px] text-[#4B5563]">Precision Skincare Technology</p>
        </div>
      </div>
    </footer>
  );
}