"use client"

import { useEffect, useState } from "react"
//import Image from "next/image"
import { useRouter } from "next/navigation"
//import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"/
//import { Star } from "lucide-react"
//import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Product } from "@/Models/Product"

import  FeaturedProductCard from "../ProductCard"
// function FeaturedProductCard({ product }: { product: Product }) {
//   const discountedPrice = product.discount
//     ? product.price * (1 - product.discountPercent / 100)
//     : product.price

//   return (
//     <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
//       <CardHeader className="relative p-0">
//         <div className="relative w-full h-48 sm:h-56">
//           <Image
//             src={product.link[0] || "/placeholder.jpg"}
//             alt={product.name}
//             fill
//             className="rounded-t-lg object-cover"
//           />
//           {product.discount && (
//             <Badge className="absolute top-2 right-2 bg-red-500">
//               {product.discountPercent}% OFF
//             </Badge>
//           )}
//         </div>
//       </CardHeader>
//       <CardContent className="flex-grow flex flex-col p-4">
//         <CardTitle className="text-lg sm:text-xl line-clamp-2 h-12 mb-2">
//           {product.name}
//         </CardTitle>
//         <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
//           {product.description}
//         </p>
//         <div className="flex items-center justify-between mt-auto">
//           <div>
//             <p className="text-lg sm:text-xl font-semibold text-primary">
//               ${discountedPrice.toFixed(2)}
//             </p>
//             {product.discount && (
//               <p className="text-sm text-muted-foreground line-through">
//                 ${product.price.toFixed(2)}
//               </p>
//             )}
//           </div>
//           <div className="flex items-center">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 className={`w-4 h-4 sm:w-5 sm:h-5 ${
//                   i < Math.round(product.ratings)
//                     ? "text-yellow-500 fill-yellow-500"
//                     : "text-gray-300"
//                 }`}
//               />
//             ))}
//             <span className="ml-2 text-sm text-muted-foreground">
//               ({product.numReviews})
//             </span>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

export default function StableCarousel({
  featuredProducts,
}: {
  featuredProducts: Product[]
}) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        (prevIndex + 1) % featuredProducts.length
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [featuredProducts.length])

  const handleProductClick = (product: Product) => {
    localStorage.setItem("product", JSON.stringify(product))
    router.push(`Product/${product._id}`)
  }

  if (featuredProducts.length === 0) {
    return (
      <section className="w-full py-24 bg-gradient-to-r from-secondary to-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-primary mb-10">
            Featured Products
          </h1>
          <p className="text-xl text-muted-foreground">
            No featured products available at the moment.
          </p>
        </div>
      </section>
    )
  }

  const displayedProducts = featuredProducts.slice(0, 3)

  return (
    <section className="w-full py-12 sm:py-16 md:py-24 bg-gradient-to-r from-secondary to-secondary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-8 sm:mb-12 md:mb-16">
          Featured Products
        </h1>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-4 md:space-x-8">
          {displayedProducts.map((product, index) => (
            <div
              key={product._id as string}
              className={`transition-all duration-500 transform ${
                index === currentIndex
                  ? "scale-105 opacity-100"
                  : "scale-95 opacity-60 hidden sm:block"
              } w-full sm:w-[280px] md:w-[320px]`}
            >
              <FeaturedProductCard product={product} />
              <Button
                type="button"
                className="mt-4 w-full"
                onClick={() => handleProductClick(product)}
              >
                View Product
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {displayedProducts.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-primary" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
