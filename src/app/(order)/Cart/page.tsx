'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, CreditCard, Truck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { getCart } from '@/helper/cart';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { CartItem } from '@/interfaces/interfaces';

export default function LuxuryCartPage() {
  const router = useRouter();
  const [products, setProducts] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCustomer, setIsCustomer] = useState(false);

  useEffect(() => {
    const customerCookie = Cookies.get('customer');
    console.log(customerCookie);
    setIsCustomer(!!customerCookie);

    const cart = getCart();
    const cartItems = Object.values(cart).map(item => item as CartItem);

    setProducts(cartItems);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const updateQuantity = (id: string, change: number) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts
        .map(product =>
          product.product._id === id
            ? { ...product, quantity: Math.max(0, product.quantity + change) }
            : product
        )
        .filter(product => product.quantity > 0);

      const cartObject = updatedProducts.reduce((acc, { product, quantity }) => {
        acc[product._id as any] = { product, quantity };
        return acc;
      }, {} as { [key: string]: CartItem });

      localStorage.setItem('cart', JSON.stringify(cartObject));
      return updatedProducts;
    });
  };

  const removeProduct = (id: string) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter(product => product.product._id !== id);

      const cartObject = updatedProducts.reduce((acc, { product, quantity }) => {
        acc[product._id as any] = { product, quantity };
        return acc;
      }, {} as { [key: string]: CartItem });

      localStorage.setItem('cart', JSON.stringify(cartObject));
      return updatedProducts;
    });
  };

  const calculateDiscountedPrice = (price: number, discountPercent: number | undefined) => {
    if (discountPercent) {
      return price * (1 - discountPercent / 100);
    }
    return price;
  };

  const total = products.reduce((sum, { product, quantity }) => 
    sum + calculateDiscountedPrice(product.price, product.discountPercent) * quantity, 0);

  const handleCheckout = () => {
    if (isCustomer) {
      router.push('/Checkout');
    } else {
      router.push('/Login?redirect=Checkout');
    }
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white shadow-2xl mt-10 rounded-2xl overflow-hidden"
      >
        <div className="px-6 py-8 sm:px-8 ">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Fearless Cart</h1>
          <AnimatePresence>
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center h-64"
              >
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </motion.div>
            ) : products.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="text-center py-16"
              >
                <ShoppingBag className="mx-auto h-24 w-24 text-gray-400" />
                <h3 className="mt-4 text-xl font-medium text-gray-900">Your cart is empty</h3>
                <p className="mt-2 text-gray-500">Discover our exclusive collection and start adding luxurious items to your cart!</p>
                <Button className="mt-6" onClick={() => router.push('/')}>
                  Explore Collection
                </Button>
              </motion.div>
            ) : (
              <ul role="list" className="divide-y divide-gray-200">
                {products.map(({ product, quantity }) => (
                  <motion.li
                    key={product._id as any}
                    layout
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="flex py-6 sm:py-10"
                  >
                    <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <motion.img
                        src={product.link[0]}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    </div>
                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3 className="text-lg">{product.name}</h3>
                        <div className="text-right">
                          {product.discountPercent ? (
                            <>
                              <p className="text-lg line-through text-gray-500">${product.price.toFixed(2)}</p>
                              <p className="text-lg text-red-600">
                                ${calculateDiscountedPrice(product.price, product.discountPercent).toFixed(2)}
                              </p>
                            </>
                          ) : (
                            <p className="text-lg">${product.price.toFixed(2)}</p>
                          )}
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">Luxury Edition</p>
                      {product.discountPercent && (
                        <p className="mt-1 text-sm text-red-600">Save {product.discountPercent}%</p>
                      )}
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center mt-4">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(product._id as any, -1)}
                            className="h-8 w-8 rounded-full"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="mx-3 text-gray-700 text-lg font-medium">{quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(product._id as any, 1)}
                            className="h-8 w-8 rounded-full"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          onClick={() => removeProduct(product._id as any)}
                          className="text-red-500 hover:text-red-600 mt-4"
                        >
                          <X className="h-5 w-5 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </AnimatePresence>
        </div>
        {products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-gray-200 px-6 py-6 sm:px-8"
          >
            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
              <p className="text-xl">Subtotal</p>
              <p className="text-xl">${total.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
              <div className="flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                <p>Free shipping on orders over $500</p>
              </div>
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                <p>Secure payment</p>
              </div>
            </div>
            <div className="mt-6">
              <Button
                onClick={handleCheckout}
                className="w-full text-lg py-6"
              >
                {isCustomer ? 'Proceed to Checkout' : 'Login to Checkout'}
              </Button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{' '}
                <button 
                onClick={() => router.push('/')}
                type="button" className="font-medium text-primary hover:text-primary/80">
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}