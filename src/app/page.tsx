'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

// Lazy load components dynamically
const CatCarousel = dynamic(() => import('@/components/CategoriesCarousel'));
const LimitZeroManifesto = dynamic(() => import('@/components/AboutUs'));
const ContinuousCarousel = dynamic(() => import('@/components/Featured'));
const JoinUs = dynamic(() => import('@/components/JoinUs'));
const MarqueeDemo = dynamic(() => import('@/components/Reviews'));
import BelowHeader from '@/components/BelowHeader';

export default function Home() {
  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const { ref: catRef, inView: isCatInView } = useInView({ triggerOnce: true });
  const { ref: manifestoRef, inView: isManifestoInView } = useInView({ triggerOnce: true });
  const { ref: featuredRef, inView: isFeaturedInView } = useInView({ triggerOnce: true });
  const { ref: joinUsRef, inView: isJoinUsInView } = useInView({ triggerOnce: true });
  const { ref: reviewsRef, inView: isReviewsInView } = useInView({ triggerOnce: true });

  return (
    <>
      <BelowHeader />

      <motion.div
        ref={catRef}
        variants={animationVariants}
        initial="hidden"
        animate={isCatInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.5 }}
        className="overflow-hidden"
      >
        <CatCarousel />
      </motion.div>

      <motion.div
        ref={manifestoRef}
        variants={animationVariants}
        initial="hidden"
        animate={isManifestoInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.5 }}
        className="overflow-hidden"
      >
        <LimitZeroManifesto />
      </motion.div>

      <motion.div
        ref={featuredRef}
        variants={animationVariants}
        initial="hidden"
        animate={isFeaturedInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.5 }}
        className="overflow-hidden"
      >
        <ContinuousCarousel />
      </motion.div>

      <motion.div
        ref={joinUsRef}
        variants={animationVariants}
        initial="hidden"
        animate={isJoinUsInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.5 }}
        className="overflow-hidden"
      >
        <JoinUs />
      </motion.div>

      <motion.div
        ref={reviewsRef}
        variants={animationVariants}
        initial="hidden"
        animate={isReviewsInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.5 }}
        className="overflow-hidden"
      >
        <MarqueeDemo />
      </motion.div>
    </>
  );
}
