"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phrases = [
  "BREAK THE MOLD",
  "DEFY GRAVITY",
  "EMBRACE CHAOS",
  "REWRITE THE RULES",
  "IGNITE REVOLUTION",
];

export default function LimitZeroManifesto() {
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="text-white bg-black py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-6 md:px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-2 md:mb-4 text-white">
            THE FEARLESS WEAR LIMIT ZERO
          </h2>
          <p className="text-lg md:text-xl text-gray-300">
            Because limits are meant to be shattered
          </p>
        </motion.div>

        <div className="relative h-32 md:h-40 mb-8 md:mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhrase}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <h3 className="text-2xl md:text-4xl font-bold text-red-900">
                {phrases[currentPhrase]}
              </h3>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h4 className="text-xl md:text-2xl font-bold mb-4 text-white">
            Our Manifesto
          </h4>
          <p className="text-base md:text-lg text-white leading-relaxed">
            At Limit Zero, we don&apos;t just create clothing; we forge a revolution.
            We are the voice of the unbound, the anthem of the audacious. Our
            designs are not mere fabric and thread, but a battle cry against
            conformity. We believe in pushing beyond the edge of possibility, in
            shattering the chains of convention. Every stitch, every seam is a
            testament to our unwavering commitment to fearless self-expression.
            We don&apos;t follow trends; we obliterate them. We are for the dreamers,
            the rebels, the ones who refuse to be defined by society&apos;s narrow
            vision. Wear Limit Zero, and become the limitless version of
            yourself. Together, we&apos;ll rewrite the rules of fashion and leave an
            indelible mark on the world. Are you ready to break free?
          </p>
        </motion.div>
      </div>
    </section>
  );
}
