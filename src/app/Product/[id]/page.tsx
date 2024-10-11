'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductReviews from '@/components/ProductReviews';
import { Product } from '@/Models/Product';
import axios from 'axios';
import LionLoader from '@/components/LionLoader';
import { Review } from '@/Models/Review';
import { addToCart, removeFromCart, getCart } from '@/helper/cart'; // Make sure to import the removeFromCart function

export default function ProductPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [showReviews, setShowReviews] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false); 
  const [reviews, setReviews] = useState<Review[]>([]); 
  const [isInCart, setIsInCart] = useState(false); // New state to track if product is in cart

  // Fetch product data
  useEffect(() => {
    const fetchedProduct = async () => {
      try {
        let res = await axios.get(`/api/getProduct/${params.id}`)
        if (res.data.success) {
          setProduct(res.data.product);
          localStorage.setItem('product', JSON.stringify(res.data.product));
        }
      } catch (error) {
        console.error("Error fetching product from localStorage", error);
      }
    };

    const storedProduct = localStorage.getItem('product');

    if (storedProduct) {
      try {
        const parsedProduct: Product = JSON.parse(storedProduct);
        if (parsedProduct._id !== params.id) {
          fetchedProduct();
          return;
        }
        setProduct(parsedProduct);
      } catch (error) {
        console.error("Error parsing product from localStorage", error);
      }
    } else {
      fetchedProduct();
    }
  }, [params.id]);

  
  useEffect(() => {
    const cart = getCart();
    if (cart[params.id]) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [product]);

  const nextImage = () => {
    if (product && product.link) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.link.length);
    }
  };

  const prevImage = () => {
    if (product && product.link) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.link.length) % product.link.length);
    }
  };

  if (!product) {
    return <LionLoader />;
  }

  const handleShowReviews = async () => {
    setLoadingReviews(true);
    try {
      let res = await axios.get(`/api/reviews/${params.id}`);
      if (res.data.success) {
        setShowReviews(true);
        setReviews(res.data.reviews); 
      }
    } catch (error) {
      console.error("Error fetching reviews", error);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleCartToggle = () => {
    if (isInCart) {
      removeFromCart(product!._id); // Ensure to use non-null assertion
    } else {
      addToCart(product!, 1);
    }
    setIsInCart(!isInCart); // Toggle the inCart status
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8">
          <div className="lg:flex">
            <div className="lg:w-1/2 relative">
              <div className="sticky top-0 lg:h-[calc(100vh-2rem)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-96 lg:h-full"
                  >
                    <Image
                      src={product.link[currentImageIndex]}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-between p-4">
                      <button
                        onClick={prevImage}
                        className="bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 transition-colors duration-200"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-800" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 transition-colors duration-200"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-800" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl sm:text-3xl font-extrabold text-gray-900 lg:text-4xl"
                >
                  {product.name}
                </motion.h2>
                <p className="mt-2 text-2xl sm:text-3xl font-bold text-[#3498db]">${product.price}</p>
                <div className="mt-4 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.ratings) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                    />
                  ))}
                  <span className="ml-2 text-sm sm:text-base text-gray-600">{product.ratings} out of 5 stars</span>
                </div>
                <motion.div
                  initial={{ height: 'auto' }}
                  animate={{ height: isDescriptionExpanded ? 'auto' : '4.5em' }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 text-sm sm:text-base text-gray-700 overflow-hidden relative"
                >
                  <p>{product.description}</p>
                  {!isDescriptionExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
                  )}
                </motion.div>
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="mt-2 text-[#3498db] hover:underline focus:outline-none font-semibold text-sm sm:text-base"
                >
                  {isDescriptionExpanded ? 'Read less' : 'Read more'}
                </button>
              </div>
              <div className="mt-8">
                <motion.button
                  onClick={handleCartToggle} // Attach toggle handler
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full ${isInCart ? 'bg-red-600' : 'bg-[#3498db]'} text-white px-6 py-3 rounded-md font-semibold text-base sm:text-lg flex items-center justify-center`}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" /> 
                  {isInCart ? 'Remove from Cart' : 'Add to Cart'} {/* Toggle text */}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Customer Reviews</h2>
          {!showReviews && (
            <button
              onClick={handleShowReviews}
              className="text-[#3498db] hover:underline text-sm sm:text-base"
            >
              View Reviews
            </button>
          )}
          {loadingReviews && <LionLoader />}
          {showReviews && !loadingReviews && <ProductReviews reviews={reviews} />}
        </div>
      </div>
    </div>
  );
}
