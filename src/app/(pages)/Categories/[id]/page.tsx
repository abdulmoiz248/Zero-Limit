import { Metadata } from 'next'
import CategoryPageContent from './CategoryPageContent'
import { Categories } from '@/Models/Categories'
import { Product } from '@/Models/Product'

type Props = {
  params: { id: string }
}

async function getCategoryData(id: string): Promise<Categories> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getCategories/${id}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch category')
  const data = await res.json()
  return data.category
}

async function getCategoryProducts(id: string): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-cat-product/${id}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch products')
  const data = await res.json()
  return data.products
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategoryData(params.id)

  return {
    title: `${category.name} | Zero Limit`,
    description: `Explore our amazing ${category.name} products. Find the best deals and latest arrivals in our ${category.name} collection.`,
    openGraph: {
      title: `${category.name} - Zero Limit`,
      description: `Discover our ${category.name} collection. Quality products and great deals await!`,
      images: [category.link],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} | Zero Limit`,
      description: `Shop the best ${category.name} products. Unbeatable quality and prices!`,
      images: [category.link],
    },
    keywords: [`${category.name}`, 'products','zero limit','zero limit apparel' ,'shop', 'ecommerce', 'deals'],
  }
}

export default async function CategoryPage({ params }: Props) {
  try {
    const [category, products] = await Promise.all([
      getCategoryData(params.id),
      getCategoryProducts(params.id)
    ])
    return <CategoryPageContent category={category} products={products} />
  } catch (error) {
    console.error("Error fetching data:", error)
    return <div>Error loading category data. Please try again later.</div>
  }
}

