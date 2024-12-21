'use client';
// import { NextSeo } from 'next-seo';
import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/Models/Product';
import ProductCard from '@/components/ProductCard';
import LionLoader from '@/components/LionLoader';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SortAsc, SortDesc, Star, Percent } from 'lucide-react';
import axios from 'axios';
import DiscountSection from '@/components/DiscountSection';

async function fetchAllProducts() {
  const res = await axios.get('/api/fetch-products');
  if (!res.data.success) {
    throw new Error('Failed to fetch products');
  }
  return res.data.products;
}

export default function ProductCatalog() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchAllProducts();
      //  products = products.filter((product: Product) => product.quantity !== 0);
        setAllProducts(products);
        setDisplayedProducts(products); // Show all products initially
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
       
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    loadProducts();
  }, []);

  // Handle client-side sorting
  const handleSort = useCallback((sortOption: string) => {
    const sortedProducts = [...allProducts];
    switch (sortOption) {
      case 'price_asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating_desc':
        sortedProducts.sort((a, b) => b.ratings - a.ratings);
        break;
      case 'discount_desc':
        sortedProducts.sort((a, b) => b.discountPercent - a.discountPercent);
        break;
      default:
        setDisplayedProducts(allProducts);
        return;
    }
    setDisplayedProducts(sortedProducts);
  }, [allProducts]);

  // Handle search input
  const handleSearch = useCallback((searchTerm: string) => {
    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedProducts(filteredProducts);
  }, [allProducts]);

  return (

    <div className="container mx-auto px-4 py-8 pt-20">
      {/* <NextSeo
        title="All Products - Zero Limit"
        description="Explore our complete collection of bold and fearless apparel. Find the perfect styles to match your fearless personality."
        canonical="https://www.zerolimitapparel.com/all-products"
        openGraph={{
          url: 'https://www.zerolimitapparel.com/all-products',
          title: 'All Products - Zero Limit',
          description:
            'Explore our complete collection of bold and fearless apparel. Find the perfect styles to match your fearless personality.',
          images: [
            {
              url: 'https://www.zerolimitapparel.com/images/cover.jpeg', // Replace with a relevant banner image URL
              width: 1200,
              height: 630,
              alt: 'Zero Limit All Products',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      /> */}
      <DiscountSection/>
      <h1 className="text-4xl font-bold mb-8 text-center text-[#1b03a3]">Fearless Collection Vol 1</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch(e.target.value);
            }}
            className="mr-2 bg-gray-100 border border-[#1b03a3] focus:ring-2 focus:ring-[#1b03a3] transition-all"
            aria-label="Search products"
          />
          <Button type="button" className="bg-[#1b03a3] text-white hover:bg-[#1b03a3]/90 transition-colors">
            <Search className="w-4 h-4 mr-2" />
            <span className="sr-only">Search</span>
            Search
          </Button>
        </div>

        <Select value={sort} onValueChange={(value) => {
          setSort(value);
          handleSort(value);
        }}>
          <SelectTrigger className="w-full md:w-[250px] bg-white border border-[#1b03a3]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="price_asc">
              <SortAsc className="w-4 h-4 mr-2 inline-block" />
              Price: Low to High
            </SelectItem>
            <SelectItem value="price_desc">
              <SortDesc className="w-4 h-4 mr-2 inline-block" />
              Price: High to Low
            </SelectItem>
            <SelectItem value="rating_desc">
              <Star className="w-4 h-4 mr-2 inline-block" />
              Customer Ratings: High to Low
            </SelectItem>
            <SelectItem value="discount_desc">
              <Percent className="w-4 h-4 mr-2 inline-block" />
              Discount Percentage: High to Low
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center mt-8">
          <LionLoader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product._id as string} product={product} />
          ))}
        </div>
      )}

      {!loading && displayedProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No products found.</p>
      )}
    </div>
  );
}
