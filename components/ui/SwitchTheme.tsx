"use client";

import { useEffect } from "react";
import { Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function SwitchTheme() {
  // 🔒 Always enable dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  return (
    <motion.button
      disabled // 🚫 prevents toggling
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center justify-center w-10 h-10 rounded-full border
      border-cyan-400/60 bg-[#101020] text-yellow-300 cursor-not-allowed opacity-70
      shadow-[0_0_10px_rgba(59,245,255,0.3)] animate-[breath_4s_cubic-bezier(0.4,0,0.2,1)_infinite]"
      aria-label="Dark mode locked"
    >
      <Sun className="w-5 h-5 drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
    </motion.button>
  );
}
