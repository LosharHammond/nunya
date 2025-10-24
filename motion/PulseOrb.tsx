"use client";
import { motion } from "framer-motion";

export default function PulseOrb() {
  return (
    <motion.div
      className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-violet-600 shadow-[0_0_15px_rgba(120,80,255,0.7)]"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
