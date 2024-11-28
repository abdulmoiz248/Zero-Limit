'use client'
import Submitted from '@/components/Submitted';
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import axios from 'axios'
import { Product } from '@/Models/Product'
import NotFound from '@/app/not-found'
import LionLoader from '@/components/LionLoader';
import { useRouter } from 'next/navigation';

const preWrittenMessages = [
  "Absolutely love this product!",
  "Great quality for the price.",
  "Exceeded my expectations.",
  "Fits perfectly and looks amazing.",
  "Highly recommend to others."
]

export default function EnhancedCustomerReviewPage({ params }: { params: { id: string } }) {
  
  const { id } = params;
  const [username, setUsername] = useState('');
  const [overallRating, setOverallRating] = useState<number>(0);
  const [overallFeedback, setOverallFeedback] = useState<string>('');
  const [productRatings, setProductRatings] = useState<{ [key: string]: number }>({});
  const [productFeedback, setProductFeedback] = useState<{ [key: string]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[] | undefined>();
  const [submitted, setSubmitted] = useState(false);
  const [loading ,setloading]=useState(true);
  const router=useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/getOrderDetails/${id}`);
        if (res.data.success) {
          console.log(res.data.order);
          if (!res.data.order.rating) {
            setUsername(res.data.order.email);
            const productsRes = await axios.post(`/api/order-products`, { products: res.data.order.products });
            setProducts(productsRes.data.products);
          } else {
            setSubmitted(true);
          }
        }
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      }finally{
        setloading(false);
      }
    };
    
    if (id.length === 24) {
      fetchData();
    }else{
      setloading(false);
    }
  }, [id]);

  const handleOverallRating = (rating: number) => {
    setOverallRating(rating);
  };

  const handleProductRating = (productId: string, rating: number) => {
    setProductRatings((prev) => ({ ...prev, [productId]: rating }));
  };

  const getAutoReply = (rating: number) => {
    if (rating === 1) return "Oh no! We're sorry to hear that!";
    if (rating === 5) return "Wow! Thank you! We're thrilled you loved it!";
    return "";
  };
  const handleSubmit = async () => {
    // Check if all required fields are filled
    if (!overallRating || !overallFeedback.trim()) {
      alert("Please provide an overall rating and feedback.");
      return;
    }
  
    const incompleteProductRatings = products?.some(
      (product) =>
        !productRatings[product._id as string] ||
        !productFeedback[product._id as string]?.trim()
    );
  
    if (incompleteProductRatings) {
      alert("Please rate and provide feedback for each product.");
      return;
    }
  
    console.log('Submitting review:', { username, overallRating, overallFeedback, productRatings, productFeedback });
    try {
      const res = await axios.post(`/api/submitReview`, {
        orderId: id,
        overallRating,
        overallFeedback,
        productRatings,
        productFeedback,
        username,
      });
      if (res.data.success) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  

  const StarRating = ({ rating, onRate }: { rating: number; onRate: (rating: number) => void }) => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.div key={star} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          <Star
            className={`cursor-pointer ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            onClick={() => onRate(star)}
          />
        </motion.div>
      ))}
    </div>
  );

  if (submitted) {
    return <Submitted />;
  }

  if(loading){
   return <LionLoader/>
  }
  if (!products) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen pt-10 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#1b03a3] to-pink-500 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold text-center">
              Thank you for your order! We hope you love your new items!
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-4 rounded-lg shadow"
              >
                <h2 className="text-xl font-semibold mb-4 text-[#1b03a3]">Order Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products && products.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <Image src={item.link[0]} alt={item.name} width={80} height={80} className="rounded-md" />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-xl font-semibold mb-4 text-[#1b03a3]">Your Overall Experience</h2>
                <StarRating rating={overallRating} onRate={handleOverallRating} />
                <AnimatePresence>
                  {overallRating > 0 && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-lg font-medium text-pink-600 my-4"
                    >
                      {getAutoReply(overallRating)}
                    </motion.p>
                  )}
                </AnimatePresence>
                <Textarea
                  placeholder="We'd love to hear about your shopping experience! What did you think about our service?"
                  value={overallFeedback}
                  onChange={(e) => setOverallFeedback(e.target.value)}
                  className="w-full h-32 mt-4"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {preWrittenMessages.map((msg, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setOverallFeedback(msg)}
                      className="text-sm"
                    >
                      {msg}
                    </Button>
                  ))}
                </div>
              </motion.section>

              {products && products.map((item:Product) => (
                <motion.section
                  key={item._id as string}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="border-t pt-6"
                >
                  <h2 className="text-xl font-semibold mb-4 text-[#1b03a3]">Review for {item.name}</h2>
                  <StarRating
                    rating={productRatings[item._id as string] || 0}
                    onRate={(rating) => handleProductRating(item._id as string, rating)}
                  />
                  <Textarea
                    placeholder={`What did you love most about ${item.name}? How did this item fit into your life?`}
                    value={productFeedback[item._id as string] || ''}
                    onChange={(e) => setProductFeedback(prev => ({ ...prev, [item._id as string]: e.target.value }))}
                    className="w-full h-32 mt-4"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {preWrittenMessages.map((msg, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setProductFeedback(prev => ({ ...prev, [item._id as string]: msg }))}
                        className="text-sm"
                      >
                        {msg}
                      </Button>
                    ))}
                  </div>
                </motion.section>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-[#1b03a3] to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  Submit Your Review
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Thank You for Your Review!</DialogTitle>
            <DialogDescription>
              Your feedback is invaluable to us.Thank You for choosing us!
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Button
              onClick={() => 
               {
                setIsModalOpen(false)
                router.push('/');
               }
              }
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
