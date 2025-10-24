"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import {
  auth,
} from "../../firebase/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useRouter } from "next/navigation";

// Extend Window interface for recaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier?: any;
  }
}

/**
 * Reusable AuthPortal component
 * Works for Student, Teacher, or any role
 */
export default function AuthPortal({
  role = "student",
  accent = "#3BF5FF",
  dashboardPath = "/",
}: {
  role?: "student" | "teacher";
  accent?: string;
  dashboardPath?: string;
}) {
  const [tab, setTab] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const router = useRouter();

  // set accent CSS vars dynamically
  useEffect(() => {
    document.documentElement.style.setProperty("--auth-accent", accent);
  }, [accent]);

  // setup recaptcha only once
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
    }
    return window.recaptchaVerifier;
  };

  // handle email login/signup
  const handleEmailAuth = async (type: "login" | "signup") => {
    setLoading(true);
    setMessage("");
    try {
      if (type === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setMessage("✅ Authentication successful!");
      setTimeout(() => router.push(dashboardPath), 1000);
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // send OTP
  const handleSendOTP = async () => {
    setLoading(true);
    setMessage("");
    try {
      const verifier = setupRecaptcha();
      const result = await signInWithPhoneNumber(auth, phone, verifier);
      setConfirmationResult(result);
      setMessage("📱 OTP sent! Check your phone.");
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // verify OTP
  const handleVerifyOTP = async () => {
    setLoading(true);
    setMessage("");
    try {
      await confirmationResult.confirm(otp);
      setMessage("✅ Phone verified successfully!");
      setTimeout(() => router.push(dashboardPath), 1000);
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

 return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#030814] text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-[#0A1022] p-8 rounded-2xl border border-[color:var(--auth-accent,#7DF9FF)]/30 shadow-[0_0_30px_var(--auth-accent,#7DF9FF)]/20"
        style={{ "--auth-accent": accent } as React.CSSProperties}
      >
        {/* ✖️ Close Button */}
        <button
          onClick={() => router.push("/free")}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-[color:var(--auth-accent)] hover:bg-white/5 hover:shadow-[0_0_10px_var(--auth-accent)] transition-all"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold mb-2"
            style={{ color: "var(--auth-accent)" }}
          >
            {role === "teacher" ? "Teacher Login" : "Student Login"}
          </motion.h1>
          <DynamicWaveform color={accent} />
        </div>

        {/* Tabs */}
        <div className="flex mb-6 border-b border-white/10">
          {["email", "phone"].map((type) => (
            <button
              key={type}
              onClick={() => setTab(type as "email" | "phone")}
              className={`flex-1 py-2 text-center font-semibold transition-all ${
                tab === type
                  ? "text-[color:var(--auth-accent)] border-b-2 border-[color:var(--auth-accent)]"
                  : "text-gray-400 hover:text-[color:var(--auth-accent)]"
              }`}
            >
              {type === "email" ? "Email Login" : "Phone Login"}
            </button>
          ))}
        </div>

        {/* Email Auth */}
        {tab === "email" && (
          <motion.div
            key="email"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-[color:var(--auth-accent)]/50 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-[color:var(--auth-accent)]/50 focus:outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleEmailAuth("login")}
                disabled={loading}
                className="flex-1 bg-[color:var(--auth-accent)]/20 border border-[color:var(--auth-accent)]/30 rounded-lg py-3 font-semibold text-[color:var(--auth-accent)] hover:bg-[color:var(--auth-accent)]/30 transition-all hover:scale-105"
              >
                {loading ? <Loader2 className="animate-spin mx-auto" /> : "Login"}
              </button>
              <button
                onClick={() => handleEmailAuth("signup")}
                disabled={loading}
                className="flex-1 bg-[color:var(--auth-accent)]/10 border border-[color:var(--auth-accent)]/20 rounded-lg py-3 font-semibold text-[color:var(--auth-accent)] hover:bg-[color:var(--auth-accent)]/20 transition-all hover:scale-105"
              >
                Sign Up
              </button>
            </div>
          </motion.div>
        )}

        {/* Phone Auth */}
        {tab === "phone" && (
          <motion.div
            key="phone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <input
              type="tel"
              placeholder="+233 55 123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-[color:var(--auth-accent)]/50 focus:outline-none"
            />

            {confirmationResult ? (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-[color:var(--auth-accent)]/50 focus:outline-none"
                />
                <button
                  onClick={handleVerifyOTP}
                  disabled={loading}
                  className="w-full bg-[color:var(--auth-accent)]/20 border border-[color:var(--auth-accent)]/30 rounded-lg py-3 font-semibold text-[color:var(--auth-accent)] hover:bg-[color:var(--auth-accent)]/30 transition-all hover:scale-105"
                >
                  {loading ? <Loader2 className="animate-spin mx-auto" /> : "Verify OTP"}
                </button>
              </>
            ) : (
              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full bg-[color:var(--auth-accent)]/20 border border-[color:var(--auth-accent)]/30 rounded-lg py-3 font-semibold text-[color:var(--auth-accent)] hover:bg-[color:var(--auth-accent)]/30 transition-all hover:scale-105"
              >
                {loading ? <Loader2 className="animate-spin mx-auto" /> : "Send OTP"}
              </button>
            )}
            <div id="recaptcha-container"></div>
          </motion.div>
        )}

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-gray-400 text-sm">{message}</p>
        )}
      </motion.div>
    </main>
  );
}

/**
 * DynamicWaveform — pulsing breathing lines to mimic AI energy
 */
function DynamicWaveform({ color }: { color: string }) {
  const bars = Array.from({ length: 12 });
  return (
    <div className="flex justify-center items-end gap-1 h-8 mb-4">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            height: [8, 24, 8],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      ))}
    </div>
  );
}
