'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Categories } from '@/Models/Categories';
import { Product } from '@/Models/Product';
import ProductCard from '@/components/ProductCard'; 
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import LionLoader from '@/components/LionLoader';

export default function CategoryPage({ params }: { params: { id: string } }) {
  const [category, setCategory] = useState<Categories | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

  if (loading) return <LionLoader></LionLoader>;
  if (error) return <div>{error}</div>;
  if (!category) return <div>Category not found.</div>;

  return (

    <div className="min-h-screen bg-gray-100 pt-10">
      <div className="container mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#3498db]"
        >
          {category.name}
        </motion.h1>
        {products.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>No products available in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {
             
            products.map((product:Product) => (
              <ProductCard key={product._id as any} product={product} /> // Use ProductCard component
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
