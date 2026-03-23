import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ShoppingBag, Search, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavItem {
  label: string;
  path: string;
  children?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "Shop All", path: "/shop" },
  {
    label: "Smart Jar Series",
    path: "/collection/smart-jar-series",
    children: [
      { label: "Damn Dewy", path: "/product/damn-dewy" },
      { label: "Collagen Bombshell", path: "/product/collagen-bombshell" },
    ],
  },
  {
    label: "Smart Devices",
    path: "/collection/smart-devices",
    children: [
      { label: "G.O.A.T Smart GuaSha", path: "/product/goat-guasha" },
      { label: "i-CONIC LED Eye Mask", path: "/product/iconic-led" },
      { label: "B.O.S.S Sonic Scrubber", path: "/product/boss-sonic-scrubber" },
      { label: "ARIA", path: "/product/aria" },
      { label: "SPARK", path: "/product/spark" },
    ],
  },
  {
    label: "Smart Skincare",
    path: "/collection/smart-skincare",
    children: [
      { label: "Brightening Dual Serum", path: "/product/brightening-dual-serum" },
      { label: "Anti Aging Dual Serum", path: "/product/anti-aging-dual-serum" },
      { label: "Anti Acne Dual Serum", path: "/product/anti-acne-dual-serum" },
      { label: "Collagen Bombshell", path: "/product/collagen-bombshell-skincare" },
      { label: "Damn Dewy", path: "/product/damn-dewy-skincare" },
    ],
  },
  { label: "Warranty Registration", path: "/warranty" },
  { label: "Numour Nook", path: "/numour-nook" },
  { label: "Support", path: "/support" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const isDark = isHomePage && !scrolled;

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-2xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <ScrollProgress />

        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1 group">
              <span
                className={`tracking-[-0.04em] transition-colors duration-300 ${
                  isDark ? "text-white" : "text-[#111827]"
                }`}
                style={{ fontSize: "1.5rem", fontWeight: 600 }}
              >
                NUMOUR
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E39A9] group-hover:scale-150 transition-transform duration-300" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  item.children?.some((c) => location.pathname === c.path);
                const hasChildren = item.children && item.children.length > 0;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => hasChildren && handleDropdownEnter(item.label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      to={item.path}
                      className={`relative flex items-center gap-1 px-3 py-2 text-[12px] tracking-[0.04em] uppercase transition-colors duration-200 ${
                        isActive
                          ? isDark
                            ? "text-white"
                            : "text-[#0E39A9]"
                          : isDark
                          ? "text-white/70 hover:text-white"
                          : "text-[#4B5563] hover:text-[#111827]"
                      }`}
                      style={{ fontWeight: 500 }}
                    >
                      {item.label}
                      {hasChildren && (
                        <ChevronDown
                          size={12}
                          className={`transition-transform duration-200 ${
                            openDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      )}
                      {isActive && !hasChildren && (
                        <motion.div
                          layoutId="navIndicator"
                          className="absolute -bottom-1 left-3 right-3 h-[2px] bg-[#0E39A9] rounded-full"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                        />
                      )}
                    </Link>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {hasChildren && openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 pt-2 z-50"
                        >
                          <div className="bg-white rounded-xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] border border-[#f0f0f0] py-2 min-w-[220px]">
                            <div className="px-4 py-2 border-b border-[#f0f0f0] mb-1">
                              <Link
                                to={item.path}
                                className="text-[11px] tracking-[0.08em] uppercase text-[#0E39A9] hover:text-[#0c2f8a]"
                                style={{ fontWeight: 600 }}
                              >
                                View All {item.label}
                              </Link>
                            </div>
                            {item.children!.map((child) => (
                              <Link
                                key={child.path}
                                to={child.path}
                                className={`block px-4 py-2.5 text-[13px] transition-colors duration-150 ${
                                  location.pathname === child.path
                                    ? "text-[#0E39A9] bg-[#0E39A9]/5"
                                    : "text-[#4B5563] hover:text-[#111827] hover:bg-[#F7F7F7]"
                                }`}
                                style={{ fontWeight: 500 }}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-2">
              <button
                className={`p-2.5 rounded-full transition-all duration-300 ${
                  isDark
                    ? "text-white/70 hover:text-white hover:bg-white/10"
                    : "text-[#4B5563] hover:text-[#111827] hover:bg-[#F7F7F7]"
                }`}
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
              <button
                className={`relative p-2.5 rounded-full transition-all duration-300 ${
                  isDark
                    ? "text-white/70 hover:text-white hover:bg-white/10"
                    : "text-[#111827] hover:bg-[#F7F7F7]"
                }`}
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                <span
                  className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#0E39A9] text-white rounded-full flex items-center justify-center"
                  style={{ fontSize: "9px", fontWeight: 700 }}
                >
                  0
                </span>
              </button>
              <button
                className={`lg:hidden p-2.5 rounded-full transition-all duration-300 ${
                  isDark ? "text-white" : "text-[#111827]"
                }`}
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40"
          >
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto"
            >
              <div className="pt-20 px-6 pb-8">
                <nav className="flex flex-col">
                  {navItems.map((item, i) => {
                    const hasChildren = item.children && item.children.length > 0;
                    const isExpanded = expandedMobile === item.label;

                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <div className="border-b border-[#f0f0f0]">
                          <div className="flex items-center">
                            <Link
                              to={item.path}
                              className={`flex-1 py-3.5 text-[15px] transition-colors min-h-[44px] flex items-center ${
                                location.pathname === item.path
                                  ? "text-[#0E39A9]"
                                  : "text-[#111827] hover:text-[#0E39A9]"
                              }`}
                              style={{ fontWeight: 500 }}
                            >
                              {item.label}
                            </Link>
                            {hasChildren && (
                              <button
                                onClick={() =>
                                  setExpandedMobile(isExpanded ? null : item.label)
                                }
                                className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#9CA3AF]"
                              >
                                <ChevronDown
                                  size={16}
                                  className={`transition-transform duration-200 ${
                                    isExpanded ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                            )}
                          </div>

                          {/* Expandable children */}
                          <AnimatePresence>
                            {hasChildren && isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pb-3 pl-4">
                                  {item.children!.map((child) => (
                                    <Link
                                      key={child.path}
                                      to={child.path}
                                      className={`flex items-center gap-2 py-2.5 min-h-[44px] text-[14px] transition-colors ${
                                        location.pathname === child.path
                                          ? "text-[#0E39A9]"
                                          : "text-[#4B5563] hover:text-[#0E39A9]"
                                      }`}
                                      style={{ fontWeight: 450 }}
                                    >
                                      <ChevronRight size={12} className="text-[#d1d5db]" />
                                      {child.label}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent">
      <motion.div
        className="h-full bg-[#0E39A9]"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}