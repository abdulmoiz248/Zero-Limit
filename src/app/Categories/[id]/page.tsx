'use client'
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Categories } from '@/Models/Categories';
import { Product } from '@/Models/Product';
import { useRouter } from 'next/navigation';

export default function CategoryPage({ params }: { params: { id: string } }) {
  const [category, setCategory] = useState<Categories | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/getCategories/${params.id}`);
        if (response.data.success) {
          setCategory(response.data.category);
          setProducts(response.data.products);
        } else {
          setError("Failed to load category data.");
        }
      } catch (error) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);
   let router=useRouter();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!category) return <div>Category not found.</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#3498db]"
        >
          {category.name}
        </motion.h1>

        {/* Check if there are no products available */}
        {products.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>No products available in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          
          >
            {products.map((product) => {
              // Calculate discounted price if applicable
              const discountAmount = (product.price * product.discountPercent) / 100;
              const discountedPrice = product.price - discountAmount;
              const productId = product._id ? String(product._id) : '123'; 
              return (
                <motion.div
                onClick={()=>{
                  router.push(`/Product/${product._id}`)
             }}
             
                  key={productId }
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
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
                    <button className="w-full bg-[#3498db] hover:bg-[#2980b9] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
