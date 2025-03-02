// import Image from "next/image"
// import { Star } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import type { Product } from "@/lib/product-data"

// export default function ProductCard({ product }: { product: Product }) {
//   return (
//     <div className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
//       <div className="relative aspect-square overflow-hidden bg-gray-100">
//         <Image
//           src={product.image || "/placeholder.svg"}
//           alt={product.name}
//           fill
//           className="object-cover group-hover:scale-105 transition-transform duration-300"
//         />
//         {product.discount > 0 && (
//           <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
//             {product.discount}% OFF
//           </div>
//         )}
//       </div>

//       <div className="p-4">
//         <h3 className="font-medium line-clamp-2 mb-1">{product.name}</h3>

//         <div className="flex items-center mb-2">
//           <div className="flex">
//             {Array(5)
//               .fill(0)
//               .map((_, i) => (
//                 <Star
//                   key={i}
//                   size={14}
//                   className={`${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//                 />
//               ))}
//           </div>
//           <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
//         </div>

//         <div className="flex items-center gap-2 mb-3">
//           <span className="font-bold">${product.price.toFixed(2)}</span>
//           {product.originalPrice > product.price && (
//             <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
//           )}
//         </div>

//         <Button size="sm" className="w-full">
//           Add to Cart
//         </Button>
//       </div>
//     </div>
//   )
// }

import Image from "next/image"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/product-data"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group border border-muted/20 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-muted/10">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-medium line-clamp-2 mb-1">{product.name}</h3>

        <div className="flex items-center mb-2">
          <div className="flex">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold">${product.price.toFixed(2)}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

