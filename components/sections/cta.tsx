"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="py-32 text-center bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-transparent">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold mb-6"
      >
        Ready to Experience Nunya?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground text-lg mb-10"
      >
        Start learning for free — or sign up to unlock full teacher and student features.
      </motion.p>

      <motion.div whileHover={{ scale: 1.05 }}>
        <Link
          href="/free"
          className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full 
          shadow-lg hover:shadow-cyan-500/40 transition-all font-semibold"
        >
          Get Started Now 🚀
        </Link>
      </motion.div>
    </section>
  );
}
