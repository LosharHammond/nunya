"use client";

import { motion } from "framer-motion";

export default function AITypingIndicator({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const height =
    size === "sm" ? "h-[10px]" : size === "lg" ? "h-[20px]" : "h-[16px]";
  const width =
    size === "sm" ? "w-[3px]" : size === "lg" ? "w-[5px]" : "w-[4px]";

  return (
    <div className="flex items-center justify-center gap-1 py-2">
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          initial={{ scaleY: 0.4, opacity: 0.4 }}
          animate={{
            scaleY: [0.4, 1, 0.4],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
          className={`${width} ${height} rounded-full bg-gradient-to-b from-cyan-400 via-violet-500 to-fuchsia-600 shadow-[0_0_8px_rgba(100,100,255,0.4)]`}
        />
      ))}
    </div>
  );
}
