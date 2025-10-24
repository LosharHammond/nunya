"use client";

import { motion, AnimatePresence } from "framer-motion";
import GlowingLine from "../../motion/GlowingLine";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0B0F24] border border-[#3BF5FF]/30 rounded-2xl p-8 max-w-md text-center shadow-[0_0_30px_#3BF5FF20]"
          >
            <h2 className="text-2xl font-bold text-[#3BF5FF] mb-3">
              Free Limit Reached
            </h2>
            <p className="text-gray-400 mb-6">
              You’ve reached your 3 free questions.  
              Create an account to continue your smart learning journey.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="/auth/studentauth"
                className="bg-[#3BF5FF]/20 border border-[#3BF5FF]/40 text-[#3BF5FF] px-6 py-3 rounded-full font-semibold hover:bg-[#3BF5FF]/30 transition-all hover:scale-105"
              >
                Login as Student
              </a>
              <a
                href="/auth/teacherauth"
                className="bg-[#3BF5FF]/10 border border-[#3BF5FF]/30 text-[#3BF5FF] px-6 py-3 rounded-full font-semibold hover:bg-[#3BF5FF]/20 transition-all hover:scale-105"
              >
                Login as Teacher
              </a>
            </div>

            <div className="mt-6">
              <GlowingLine duration={3} />
            </div>

            <button
              onClick={onClose}
              className="mt-6 text-sm text-gray-400 hover:text-[#3BF5FF]"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
