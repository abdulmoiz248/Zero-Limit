import { Categories } from '@/Models/Categories';
import { Product } from '@/Models/Product';
import { MetadataRoute } from 'next'

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetch-products`);
  if (!res.ok) return []
  const data = await res.json()
  return data.success ? data.products : []
}

async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAllCategories`)
  if (!res.ok) return []
  const data = await res.json()
  return data.success ? data.category : []
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()
  const categories = await getCategories()


  const productUrls = products.map((product:Product) => ({
    url: `${process.env.NEXT_PUBLIC_API_URL}/Product/${product._id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  const categoryUrls = categories.map((category: Categories) => ({
  url: `${process.env.NEXT_PUBLIC_API_URL}/Categories/${category._id}`,
  lastModified: new Date(),
  changeFrequency: 'weekly' as const,
  priority: 0.9,
}));


  return [
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...productUrls,
    ...categoryUrls,
     {
      url: `${process.env.NEXT_PUBLIC_API_URL}/all-products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}/Cart`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]
}

