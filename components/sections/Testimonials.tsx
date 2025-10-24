"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ama, Student",
    quote: "Nunya helped me study smarter for WAEC. It’s like chatting with a teacher!",
  },
  {
    name: "Mr. Mensah, Teacher",
    quote: "The analytics tools give me deep insight into my students’ learning habits.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-muted to-background text-center">
      <h2 className="text-3xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        What Our Users Say
      </h2>
      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="p-8 bg-muted/40 border border-border rounded-2xl shadow-xl"
          >
            <p className="italic text-lg mb-4">“{t.quote}”</p>
            <h4 className="font-semibold text-cyan-400">{t.name}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
