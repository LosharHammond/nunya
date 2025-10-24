"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import LoginModal from "../../app/auth/LoginModal";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // 🔒 Force dark mode permanently
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const links = [
    { name: "Plans & Pricing", href: "/" },
    { name: "About", href: "/learn" },
    { name: "Features", href: "/teacher" },
  ];

  return (
    <>
      <nav className="fixed w-full top-0 z-50 backdrop-blur-md bg-[#020617]/90 border-b border-cyan-400/10 shadow-[0_0_15px_rgba(59,245,255,0.05)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 
                bg-[length:200%_auto] bg-clip-text text-transparent 
                animate-[gradientFlow_6s_linear_infinite] drop-shadow-[0_0_10px_rgba(59,245,255,0.3)]"
            >
              Nunya
            </motion.span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {links.map((link) => (
              <Link key={link.name} href={link.href}>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 12px rgba(59,245,255,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-4 py-2 rounded-lg text-sm font-semibold text-cyan-300
                    bg-[#0A1022]/60 border border-cyan-400/20 hover:bg-cyan-400/10
                    transition-all duration-300"
                >
                  {link.name}
                </motion.button>
              </Link>
            ))}

            {/* Login / Signup Button */}
            <motion.button
              whileHover={{
                scale: 1.07,
                boxShadow: "0 0 20px rgba(168,85,247,0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLogin(true)}
              className="relative px-5 py-2 rounded-lg text-sm font-semibold text-white
                bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-purple-500 hover:to-cyan-400
                shadow-[0_0_20px_rgba(59,245,255,0.3)] transition-all duration-300"
            >
              Login / Signup
            </motion.button>

            {/* Fake Theme Toggle (locked on dark) */}
            <div className="ml-4 flex items-center justify-center w-10 h-10 rounded-full border border-cyan-400/30 bg-[#0A1022]/60 shadow-inner">
              <Moon className="w-5 h-5 text-cyan-400" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg border border-cyan-400/20 hover:bg-cyan-400/10 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-[#020617]/95 border-t border-cyan-400/10 px-6 py-4 space-y-4"
            >
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                      backgroundColor: "rgba(59,245,255,0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full text-left px-4 py-2 rounded-lg text-sm font-semibold
                    text-cyan-300 bg-[#0A1022]/50 border border-cyan-400/20 hover:bg-cyan-400/10
                    transition-all duration-300"
                  >
                    {link.name}
                  </motion.button>
                </Link>
              ))}

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(168,85,247,0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setMenuOpen(false);
                  setShowLogin(true);
                }}
                className="w-full text-left px-4 py-2 rounded-lg text-sm font-semibold text-white
                bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-purple-500 hover:to-cyan-400
                shadow-[0_0_20px_rgba(59,245,255,0.3)] transition-all duration-300"
              >
                Login / Signup
              </motion.button>

              {/* Static dark icon */}
              <div className="pt-2 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border border-cyan-400/30 bg-[#0A1022]/60 shadow-inner flex items-center justify-center">
                  <Moon className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx>{`
          @keyframes gradientFlow {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>
      </nav>

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
