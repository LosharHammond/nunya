"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PageTransition from "./PageTransition";
import { ReactNode } from "react";

export default function ConditionalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Hide layout ONLY on auth and free routes — show on landing
  const hideLayout =
    pathname.startsWith("/auth") ||
    pathname.startsWith("/free");

  return (
    <>
      {!hideLayout && <Navbar />}
      <PageTransition>{children}</PageTransition>
      {!hideLayout && <Footer />}
    </>
  );
}
