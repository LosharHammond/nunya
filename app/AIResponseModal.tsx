"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AIResponseModalProps {
  open: boolean;
  onClose: () => void;
  text: string;
}

export default function AIResponseModal({ open, onClose, text }: AIResponseModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0A0E1F] border border-[#3BF5FF]/40 shadow-[0_0_30px_#3BF5FF40] text-gray-100 rounded-2xl max-w-2xl w-full p-6 overflow-y-auto"
          >
            <h2 className="text-xl font-semibold text-[#3BF5FF] mb-4">
              🤖 Nunya AI
            </h2>
            <div className="whitespace-pre-wrap leading-relaxed text-gray-300 font-light">
              {text}
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full py-3 rounded-xl bg-[#3BF5FF]/10 border border-[#3BF5FF]/40 text-[#3BF5FF] hover:bg-[#3BF5FF]/20 transition-all hover:scale-105"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
