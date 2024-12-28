import { Metadata } from 'next'
import ProductClient from './ProductClient'

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  // Fetch product data
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getProduct/${params.id}`)
  const data = await res.json()
  const product = data.product

  return {
    title: `${product.name} | Zero Limit`,
    description: product.description?.slice(0, 155),
    openGraph: {
      images: [product.link[0]],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getProduct/${params.id}`)
  const data = await res.json()
  const product = data.product

  return <ProductClient initialProduct={product} params={params} />
}

