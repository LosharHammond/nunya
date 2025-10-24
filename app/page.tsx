"use client";

import HeroSection from "../components/sections/HeroSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import Testimonials from "../components/sections/Testimonials";
import CallToAction from "../components/sections/cta";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted text-foreground overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/images/pattern-glow.svg')] opacity-10 pointer-events-none"></div>
      <Navbar/>
      <HeroSection />
      <FeaturesSection />
      <Testimonials />
      <CallToAction />
    </main>
  );
}
