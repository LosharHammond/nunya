"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    title: "AI-Powered Practice",
    desc: "Test yourself with smart WAEC-style questions that adapt to your level.",
    icon: "/icons/ai-brain.svg",
  },
  {
    title: "Teacher Insights",
    desc: "Teachers get deep analytics on student performance and engagement.",
    icon: "/icons/teacher.svg",
  },
  {
    title: "Interactive Learning",
    desc: "Engage in futuristic lessons with animations, quizzes, and real-time feedback.",
    icon: "/icons/book.svg",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-background text-foreground">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Futuristic Learning Features
      </h2>
      <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-muted/40 border border-border p-8 rounded-2xl shadow-lg backdrop-blur-md"
          >
            <div className="flex justify-center mb-6">
              <Image src={f.icon} alt={f.title} width={64} height={64} />
            </div>
            <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
            <p className="text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
