"use client";

import { motion } from "framer-motion";

type DynamicWaveformProps = {
  width?: number;
  height?: number;
  barCount?: number;
  accent?: string;
  speed?: number; // seconds for one loop
};

export default function DynamicWaveform({
  width = 140,
  height = 22,
  barCount = 6,
  accent = "#3BF5FF",
  speed = 1.6,
}: DynamicWaveformProps) {
  const bars = Array.from({ length: barCount }).map((_, i) => i);

  return (
    <div
      style={{ width, height }}
      className="flex items-end gap-1 justify-center"
      aria-hidden
    >
      {bars.map((i) => {
        const delay = (i / barCount) * (speed * 0.6);
        const minH = 4 + (i % 2) * 3;
        const maxH = height - 4 - (i % 3) * 2;
        return (
          <motion.span
            key={i}
            style={{
              width: Math.max(3, Math.round(width / (barCount * 3))),
              borderRadius: 999,
              background: accent,
              boxShadow: `${accent}55 0 0 8px`,
            }}
            animate={{
              height: [minH, maxH, minH],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              delay,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="inline-block"
          />
        );
      })}
    </div>
  );
}
