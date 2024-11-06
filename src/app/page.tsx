'use client'
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import BelowHeader from '@/components/landing page/BelowHeader';
import LionLoader from '@/components/LionLoader';
import axios from 'axios';
import { Product } from '@/Models/Product';
import { Toaster } from 'react-hot-toast';

const CatCarousel = dynamic(() => import('@/components/landing page/CategoriesCarousel'), {
  ssr: false,
  loading: () => <LionLoader/>,
});

const LimitZeroManifesto = dynamic(() => import('@/components/landing page/AboutUs'), {
  ssr: false,
  loading: () => <LionLoader/>,
});

const StableCarousel = dynamic(() => import('@/components/landing page/Featured'), {
  ssr: false,
  loading: () => <LionLoader/>,
});

const JoinUs = dynamic(() => import('@/components/landing page/JoinUs'), {
  ssr: false,
  loading: () => <LionLoader/>
});



const animationVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

function useLazyInView() {
  const [inView, setInView] = useState(false);
  const { ref } = useInView({
    triggerOnce: true,
    onChange: (visible) => visible && setInView(true),
  });
  return { ref, inView };
}

export default function Home() {
  const { ref: catRef, inView: isCatInView } = useLazyInView();
  const { ref: manifestoRef, inView: isManifestoInView } = useLazyInView();
  const { ref: featuredRef, inView: isFeaturedInView } = useLazyInView();
  const { ref: joinUsRef, inView: isJoinUsInView } = useLazyInView();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/fetchAll');
        if (res.data.success) {
          setLoading(false);
          setProducts(res.data.products);
          setCategories(res.data.categories);
          
          // Scroll to the top once the loading is done
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } catch (error) {
        console.log(error);
        window.location.reload();
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <LionLoader />
      ) : (
        <>
        <Toaster/>
          <BelowHeader />

          <motion.div
            ref={catRef}
            variants={animationVariants}
            initial="hidden"
            animate={isCatInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <CatCarousel categories={categories} />
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
            <StableCarousel featuredProducts={products} />
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

         
        </>
      )}
    </>
  );
}
