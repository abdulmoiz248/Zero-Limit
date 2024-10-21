
// import { getCart, validateQuantity } from '@/helper/cart.js';
// import { useRouter } from 'next/navigation';


// export default function LuxuryCartPage() {
//   const router = useRouter();
//   const [products, setProducts] = useState<CartItem[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isCustomer, setIsCustomer] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 1000);

//     const customerCookie = !!Cookies.get('customer');
//     setIsCustomer(customerCookie);

//     const cart = getCart();
//     const cartItems = Object.values(cart).map(item => item as CartItem);
//     setProducts(cartItems);

//     return () => clearTimeout(timer);
//   }, []);

//   const updateQuantity = (id: string, change: number) => {
//     if (!validateQuantity(id, Math.abs(change))) {
//       console.error('Insufficient stock to update quantity.');
//       alert("Not enough stock to update quantity")
//       return;
//     }
  
//     setProducts(prevProducts => {
//       const updatedProducts = prevProducts
//         .map(product =>
//           product.product._id === id
//             ? { ...product, quantity: product.quantity + change }
//             : product
//         )
//         .filter(product => product.quantity > 0);
  
//       const cartObject = updatedProducts.reduce((acc, { product, quantity }) => {
//         acc[product._id as string] = { product, quantity };
//         return acc;
//       }, {} as { [key: string]: CartItem });
  
//       localStorage.setItem('cart', JSON.stringify(cartObject));
//       return updatedProducts;
//     });
//   };
  

//   const removeProduct = (id: string) => {
//     setProducts(prevProducts => {
//       const updatedProducts = prevProducts.filter(product => product.product._id !== id);

//       const cartObject = updatedProducts.reduce((acc, { product, quantity }) => {
//         acc[product._id  as string] = { product, quantity };
//         return acc;
//       }, {} as { [key: string]: CartItem });

//       localStorage.setItem('cart', JSON.stringify(cartObject));
//       return updatedProducts;
//     });
//   };

//   const calculateDiscountedPrice = (price: number, discountPercent: number | undefined) => {
//     return discountPercent ? price * (1 - discountPercent / 100) : price;
//   };

//   const total = products.reduce(
//     (sum, { product, quantity }) =>
//       sum + calculateDiscountedPrice(product.price, product.discountPercent) * quantity,
//     0
//   );

//   const handleCheckout = () => {
//     if (isCustomer) {
//       router.push('/Checkout');
//     } else {
//       router.push('/Login?redirect=Checkout');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white py-12">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-4xl mx-auto bg-white shadow-2xl mt-10 rounded-2xl overflow-hidden"
//       >
//         <div className="px-6 py-8 sm:px-8 ">
//           <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Fearless Cart</h1>
//           <AnimatePresence>
//             {isLoading ? (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="flex justify-center items-center h-64"
//               >
//                 <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
//               </motion.div>
//             ) : products.length === 0 ? (
//               <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 50 }}
//                 className="text-center py-16"
//               >
//                 <ShoppingBag className="mx-auto h-24 w-24 text-gray-400" />
//                 <h3 className="mt-4 text-xl font-medium text-gray-900">Your cart is empty</h3>
//                 <p className="mt-2 text-gray-500">
//                   Discover our exclusive collection and start adding luxurious items to your cart!
//                 </p>
//                 <Button className="mt-6" onClick={() => router.push('/')}>
//                   Explore Collection
//                 </Button>
//               </motion.div>
//             ) : (
//               <ul role="list" className="divide-y divide-gray-200">
//                 {products.map(({ product, quantity }) => (
//                   <motion.li
//                     key={product._id  as string}
//                     layout
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -50 }}
//                     transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//                     className="flex py-6 sm:py-10"
//                   >
//                     <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
//                       <motion.img
//                         src={product.link[0]}
//                         alt={product.name}
//                         className="h-full w-full object-cover object-center"
//                         whileHover={{ scale: 1.05 }}
//                         transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//                       />
//                     </div>
//                     <div className="ml-6 flex flex-1 flex-col">
//                       <div className="flex justify-between text-base font-medium text-gray-900">
//                         <h3 className="text-lg">{product.name}</h3>
//                         <div className="text-right">
//                           {product.discountPercent ? (
//                             <>
//                               <p className="text-lg line-through text-gray-500">
//                                 ${product.price.toFixed(2)}
//                               </p>
//                               <p className="text-lg text-red-600">
//                                 ${calculateDiscountedPrice(product.price, product.discountPercent).toFixed(2)}
//                               </p>
//                             </>
//                           ) : (
//                             <p className="text-lg">${product.price.toFixed(2)}</p>
//                           )}
//                         </div>
//                       </div>
//                       <p className="mt-1 text-sm text-gray-500">Luxury Edition</p>
//                       {product.discountPercent && (
//                         <p className="mt-1 text-sm text-red-600">Save {product.discountPercent}%</p>
//                       )}
//                       <div className="flex flex-1 items-end justify-between text-sm">
//                         <div className="flex items-center mt-4">
//                           <Button
//                             variant="outline"
//                             size="icon"
//                             onClick={() => updateQuantity(product._id  as string, -1)}
//                             className="h-8 w-8 rounded-full"
//                           >
//                             <Minus className="h-4 w-4" />
//                           </Button>
//                           <span className="mx-3 text-gray-700 text-lg font-medium">{quantity}</span>
//                           <Button
//                             variant="outline"
//                             size="icon"
//                             onClick={() => updateQuantity(product._id  as string, 1)}
//                             className="h-8 w-8 rounded-full"
//                           >
//                             <Plus className="h-4 w-4" />
//                           </Button>
//                         </div>
//                         <Button
//                           variant="ghost"
//                           onClick={() => removeProduct(product._id  as string)}
//                           className="text-red-500 hover:text-red-600 mt-4"
//                         >
//                           <X className="h-5 w-5 mr-1" />
//                           Remove
//                         </Button>
//                       </div>
//                     </div>
//                   </motion.li>
//                 ))}
//               </ul>
//             )}
//           </AnimatePresence>
//         </div>
//         {products.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="border-t border-gray-200 px-6 py-6 sm:px-8"
//           >
//             <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
//               <p className="text-xl">Subtotal</p>
//               <p className="text-xl">${total.toFixed(2)}</p>
//             </div>
//             <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
//               <div className="flex items-center">
//                 <Truck className="h-5 w-5 mr-2" />
//                 <p>Free shipping on orders over $500</p>
//               </div>
//               <div className="flex items-center">
//                 <CreditCard className="h-5 w-5 mr-2" />
//                 <p>Secure payment</p>
//               </div>
//             </div>
//             <div className="mt-6">
//               <Button onClick={handleCheckout} className="w-full text-lg py-6">
//                 {isCustomer ? 'Proceed to Checkout' : 'Login to Checkout'}
//               </Button>
//             </div>
//             <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
//               <p>
//                 or{' '}
//                 <button
//                   onClick={() => router.push('/')}
//                   type="button"
//                   className="font-medium text-primary hover:text-primary/80"
//                 >
//                   Continue Shopping<span aria-hidden="true"> &rarr;</span>
//                 </button>
//               </p>
//             </div>
//           </motion.div>
//         )}
//       </motion.div>
//     </div>
//   );
// }

"use client"

import { useState,useEffect } from "react"
import { Minus, Plus, Trash2, ShoppingBag, Sparkles, AlertCircle, Router } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "@/hooks/use-toast"
import { CartItem } from "@/interfaces/interfaces"
import  Cookies  from "js-cookie"
import { getCart } from "@/helper/cart"
import { useRouter } from "next/navigation"

export default function Component() {
  let router=useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCustomer, setIsCustomer] = useState(false);

  if(!isCustomer){
    router.push('/Login');
    return null;
  }
    useEffect(() => {
   
    const customerCookie = !!Cookies.get('customer');
    setIsCustomer(customerCookie);

    const cart = getCart();
    const cartItems = Object.values(cart).map(item => item as CartItem);
    setCartItems(cartItems);

  }, []);


  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.product.id === id) {
          if (newQuantity > item.product.quantity) {
            toast({
              title: "Quantity Limit Reached",
              description: `Only ${item.product.quantity} ${item.product.name}(s) available.`,
              variant: "destructive",
            })
            return item
          }
          return { ...item, quantity: Math.max(0, newQuantity) }
        }
        return item
      })
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.product.id !== id))
  }

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold mb-12 text-center">Your Cart</h1>
        <AnimatePresence mode="wait">
          {cartItems.length > 0 ? (
            <motion.div
              key="full-cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-12"
            >
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 p-6 bg-gray-50 rounded-lg shadow-sm"
                >
                  <img src={item.product.link[0]} alt={item.product.name} className="w-40 h-40 object-cover rounded-md" />
                  <div className="flex-grow space-y-2">
                    <h2 className="text-2xl font-bold">{item.product.name}</h2>
                    <p className="text-xl font-semibold">${item.product.price.toFixed(2)}</p>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="rounded-full"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        min="0"
                        max={item.product.quantity}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                        className="w-16 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="rounded-full"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {item.quantity === item.product.quantity && (
                      <p className="text-sm text-yellow-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Max quantity reached! You cannot add more Products
                      </p>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.product.id)} className="self-start md:self-center">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 text-right"
              >
                <p className="text-2xl font-bold mb-4">Total: ${total.toFixed(2)}</p>
                <Button onClick={()=>{
                  localStorage.setItem('cart', JSON.stringify(cartItems));

                  router.push('/Checkout')
                }}
                className="bg-black text-white hover:bg-gray-800 transition-colors duration-300 text-lg font-bold py-6 px-12 rounded-full">
                  Proceed to Checkout
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="empty-cart"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-16"
            >
              <div className="relative inline-block">
                <ShoppingBag className="w-32 h-32 text-gray-300" />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute top-0 right-0"
                >
                  <Sparkles className="w-12 h-12 text-yellow-400" />
                </motion.div>
              </div>
              <h2 className="text-3xl font-bold mt-8 mb-4">Your cart is empty</h2>
              <p className="text-xl text-gray-600 mb-8">But it doesn't have to be. Let's add some fearless style to your life!</p>
              <Button onClick={()=>{
            router.push('/')
          }}
              className="bg-black text-white hover:bg-gray-800 transition-colors duration-300 text-lg font-bold py-6 px-12 rounded-full">
                Start Shopping
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button onClick={()=>{
            router.push('/')
          }}
          variant="link" className="text-black hover:text-gray-600 transition-colors duration-300">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Continue Shopping
          </Button>
        </motion.div>
      </div>
    </div>
  )
}