import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ShopFilters } from "@/components/shop-filters"

// Mock product data
const products = [
  {
    id: 1,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your furry friend",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "food",
    rating: 4.8,
    bestSeller: true,
  },
  {
    id: 2,
    name: "Orthopedic Dog Bed",
    description: "Comfortable bed for better sleep and joint health",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "beds",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Interactive Dog Toy",
    description: "Keep your dog entertained and mentally stimulated",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "toys",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Adjustable Dog Collar",
    description: "Durable and comfortable collar for daily use",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "accessories",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Dog Training Treats",
    description: "Delicious treats perfect for training sessions",
    price: 14.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "food",
    rating: 4.9,
    bestSeller: true,
  },
  {
    id: 6,
    name: "Dog Grooming Kit",
    description: "Complete set for keeping your dog clean and healthy",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "grooming",
    rating: 4.4,
  },
  {
    id: 7,
    name: "Dog Harness",
    description: "No-pull harness for comfortable walks",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "accessories",
    rating: 4.7,
  },
  {
    id: 8,
    name: "Dog Dental Chews",
    description: "Maintain your dog's dental health with these tasty chews",
    price: 17.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "food",
    rating: 4.6,
  },
  {
    id: 9,
    name: "Plush Dog Toy Set",
    description: "Set of 3 plush toys for hours of fun",
    price: 22.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "toys",
    rating: 4.5,
  },
]

export default function ShopPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Dog Shop</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4">
          <ShopFilters />
        </div>

        <div className="md:w-3/4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  {product.bestSeller && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md">
                      Best Seller
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>${product.price.toFixed(2)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                  <div className="flex items-center mt-2">
                    <div className="flex text-yellow-400">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        ))}
                    </div>
                    <span className="ml-2 text-xs text-muted-foreground">({product.rating})</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

