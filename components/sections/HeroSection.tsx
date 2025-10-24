"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-32 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"
      >
        Welcome to Nunya
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl"
      >
        Your futuristic learning companion for WAEC and beyond.  
        Learn, explore, and test your knowledge with AI-powered tools.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-10"
      >
        <Link
          href="/free"
          className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 
          text-white text-lg font-semibold hover:scale-105 active:scale-95 
          transition-transform shadow-lg shadow-cyan-500/30"
        >
          Try Free Version
        </Link>
      </motion.div>
    </section>
  );
}
