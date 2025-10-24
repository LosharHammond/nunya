"use client";
import { motion } from "framer-motion";

export default function GlowingLine({
  duration = 2,
}: {
  duration?: number;
}) {
  return (
    <motion.div
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      }}
      className="h-[2px] bg-gradient-to-r from-cyan-400 via-violet-600 to-fuchsia-500 
      rounded-full shadow-[0_0_8px_rgba(150,100,255,0.6)]"
    />
  );
}
