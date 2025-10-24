"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AITypingIndicator from "../../motion/AITypingIndicator";
import LoginModal from "../auth/LoginModal";
import AIResponseModal from "../../app/AIResponseModal";

export default function FreePage() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    {
      sender: "ai",
      text: "👋 Hi, I’m Nunya — your WAEC learning companion. Ask me anything!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [showModal, setShowModal] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const saved = Number(localStorage.getItem("freeUsageCount")) || 0;
    setUsageCount(saved);
    if (saved >= 3) setLimitReached(true);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || limitReached) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // ✅ Send request to your API route
      const res = await fetch("/app/api/waecroute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
        setAiResponse(data.reply);
        setShowModal(true);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "⚠️ Something went wrong. Please try again later.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Network error — please check your connection.",
        },
      ]);
    } finally {
      setIsTyping(false);

      const newCount = usageCount + 1;
      setUsageCount(newCount);
      localStorage.setItem("freeUsageCount", String(newCount));
      if (newCount >= 3) setLimitReached(true);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#020611] via-[#060B1C] to-[#0A0E1F] text-foreground">
      <div className="absolute inset-0 bg-[url('/images/pattern-glow.svg')] opacity-10 pointer-events-none" />

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-20 text-center text-4xl md:text-5xl font-bold text-[#3BF5FF]"
      >
        Nunya Free Mode
      </motion.h1>

      <p className="text-center text-gray-400 mb-6">
        {3 - usageCount > 0
          ? `You have ${3 - usageCount} / 3 free interactions remaining`
          : "Free limit reached. Please log in to continue."}
      </p>

      {/* Chat Section */}
      <section className="relative flex flex-col flex-1 w-full max-w-2xl px-4 pb-24 overflow-y-auto">
        <div className="flex flex-col gap-3">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`p-3 rounded-2xl max-w-[80%] ${
                msg.sender === "user"
                  ? "self-end bg-[#3BF5FF]/10 border border-[#3BF5FF]/40 text-[#3BF5FF]"
                  : "self-start bg-white/5 border border-white/10 text-gray-200"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="ml-2 mt-1"
            >
              <AITypingIndicator />
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>
      </section>

      {/* Input Section */}
      <div className="fixed bottom-0 w-full max-w-2xl px-4 py-6 bg-gradient-to-t from-black/60 via-black/40 to-transparent backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask Nunya anything..."
            className="flex-1 bg-white/10 border border-white/10 rounded-full px-5 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3BF5FF]/50 disabled:opacity-50"
            disabled={limitReached}
          />
          <button
            onClick={handleSend}
            disabled={limitReached}
            className="bg-[#3BF5FF]/20 border border-[#3BF5FF]/40 text-[#3BF5FF] px-6 py-3 rounded-full font-semibold hover:bg-[#3BF5FF]/30 transition-all hover:scale-105 active:scale-95 shadow-[0_0_10px_#3BF5FF40] disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </div>

      {/* Modals */}
      <LoginModal open={limitReached} onClose={() => setLimitReached(false)} />
      <AIResponseModal
        open={showModal}
        onClose={() => setShowModal(false)}
        text={aiResponse}
      />
    </main>
  );
}
