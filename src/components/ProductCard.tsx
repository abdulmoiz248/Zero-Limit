// components/ProductCard.tsx
'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/Models/Product';
import { addToCart, removeFromCart, getCart } from '@/helper/cart';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const cart = getCart();
    setIsInCart(!!cart[product._id as string]); 
  }, [product]);

  const handleCartToggle = () => {
    if (isInCart) {
      removeFromCart(product._id);
    } else {
      
      addToCart(product, 1);
    }
    setIsInCart(!isInCart);
  };


  const discountAmount = (product.price * product.discountPercent) / 100;
  const discountedPrice = product.price - discountAmount;

  return (
    <motion.div
      onClick={() => {
        localStorage.removeItem('product');
        localStorage.setItem('product', JSON.stringify(product));
        router.push(`/Product/${product._id}`);
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl cursor-pointer"
    >
      <div className="relative">
        <Image
          src={product.link[1]}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
        {product.discountPercent > 0 && (
          <div className="absolute top-0 left-0 bg-red-600 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
            -{product.discountPercent}%
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h2>

        {/* Render stars for product rating */}
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }, (_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${index < Math.round(product.ratings) ? 'text-yellow-500' : 'text-gray-400'}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 15.27L16.18 20l-1.64-7.03L20 8.24l-7.19-.61L10 2 7.19 7.63 0 8.24l5.46 4.73L3.82 20z" />
            </svg>
          ))}
        </div>

        {product.discountPercent > 0 && (
          <p className="text-gray-600 mb-2 text-sm line-through">
            ${product.price}
          </p>
        )}
        <p className="text-gray-600 mb-4 text-sm">
          Price: ${product.discountPercent > 0 ? Math.round(discountedPrice) : product.price}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the card click
            handleCartToggle(); // Attach toggle handler
          }}
          className={`w-full ${isInCart ? 'bg-red-600' : 'bg-[#3498db]'} hover:bg-[#2980b9] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center`}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          {isInCart ? 'Remove from Cart' : 'Add to Cart'} {/* Toggle text */}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
