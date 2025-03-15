"use client";

import { useState } from "react";
import HeroSection from "@/components/hero";
import Component from "@/components/new-hero";
import { ArrowLeftRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [showNewHero, setShowNewHero] = useState(true);

  return (
    <main className="min-h-screen flex flex-col overflow-hidden">
      <button
        onClick={() => setShowNewHero(!showNewHero)}
        className="fixed top-4 right-4 z-50 bg-neutral-100 text-black px-3 py-3 sm:px-4 sm:py-2 rounded-full border border-neutral-200 flex items-center gap-2 hover:bg-neutral-200 transition-colors"
        aria-label="Toggle hero section"
      >
        <ArrowLeftRight className="h-4 w-4" />
        <span className="hidden sm:inline">
          {showNewHero ? "Show Classic" : "Show Modern"}
        </span>
      </button>

      <AnimatePresence mode="wait">
        {showNewHero ? (
          <motion.div
            key="new-hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <Component />
          </motion.div>
        ) : (
          <motion.div
            key="old-hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <HeroSection />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
