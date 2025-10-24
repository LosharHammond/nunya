"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-32 py-10 text-center border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm text-muted-foreground">
          <Link href="/privacy" className="hover:text-cyan-400">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-cyan-400">Terms of Service</Link>
          <Link href="/contact" className="hover:text-cyan-400">Contact</Link>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Nunya. All rights reserved.  
          <span className="block text-xs text-cyan-500 mt-2">
            Learn. Evolve. Explore Knowledge.
          </span>
        </p>
      </div>
    </footer>
  );
}
