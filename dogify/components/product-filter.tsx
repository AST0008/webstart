"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Star, X, FilterIcon } from "lucide-react"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/product-data"

export default function ProductFilter() {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const breeds = Array.from(new Set(products.map((product) => product.breed)))

  useEffect(() => {
    const newFilteredProducts = products.filter((product) => {
      // Price filter
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      // Rating filter
      const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(Math.floor(product.rating))

      // Breed filter
      const matchesBreed = selectedBreeds.length === 0 || selectedBreeds.includes(product.breed)

      return matchesPrice && matchesRating && matchesBreed
    })

    setFilteredProducts(newFilteredProducts)
  }, [priceRange, selectedRatings, selectedBreeds])

  const handleRatingToggle = (rating: number) => {
    setSelectedRatings((prev) => (prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]))
  }

  const handleBreedToggle = (breed: string) => {
    setSelectedBreeds((prev) => (prev.includes(breed) ? prev.filter((b) => b !== breed) : [...prev, breed]))
  }

  const resetFilters = () => {
    setPriceRange([0, 1000])
    setSelectedRatings([])
    setSelectedBreeds([])
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Mobile filter button */}
      <div className="lg:hidden flex justify-between items-center mb-4">
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
          <FilterIcon size={16} />
          Filters
        </Button>
        <span className="text-sm text-muted-foreground">{filteredProducts.length} products</span>
      </div>

      {/* Filter sidebar */}
      <div
  className={`
    lg:w-64 shrink-0 space-y-6 
    ${showFilters ? "block" : "hidden"} 
    lg:block
    bg-background 
    lg:relative fixed top-[64px] left-0 right-0 
    z-40 p-4 lg:p-0
    lg:max-h-screen h-screen
    overflow-y-auto lg:overflow-visible
    lg:border-0 border-r
  `}
>



        <div className="flex justify-between items-center lg:hidden">
          <h2 className="font-semibold text-lg">Filters</h2>
          <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
            <X size={18} />
          </Button>
        </div>

        <div className="hidden lg:flex justify-between items-center">
          <h2 className="font-semibold text-lg">Filters</h2>
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Reset
          </Button>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-4">
          <h3 className="font-medium">Price Range</h3>
          <Slider
            defaultValue={[0, 1000]}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
            className="my-6"
          />
          <div className="flex justify-between">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {/* Rating Filter */}
        <Accordion type="single" collapsible defaultValue="rating">
          <AccordionItem value="rating">
            <AccordionTrigger>Customer Rating</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={selectedRatings.includes(rating)}
                      onCheckedChange={() => handleRatingToggle(rating)}
                    />
                    <label htmlFor={`rating-${rating}`} className="flex items-center text-sm cursor-pointer">
                      {Array(rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      {Array(5 - rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} size={16} className="text-gray-300" />
                        ))}
                      <span className="ml-1">& Up</span>
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Breed Filter */}
        <Accordion type="single" collapsible defaultValue="breed">
          <AccordionItem value="breed">
            <AccordionTrigger>Breed</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {breeds.map((breed) => (
                  <div key={breed} className="flex items-center space-x-2">
                    <Checkbox
                      id={`breed-${breed}`}
                      checked={selectedBreeds.includes(breed)}
                      onCheckedChange={() => handleBreedToggle(breed)}
                    />
                    <label htmlFor={`breed-${breed}`} className="text-sm cursor-pointer">
                      {breed}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button onClick={resetFilters} variant="outline" className="w-full lg:hidden mt-4">
          Reset Filters
        </Button>
      </div>

      {/* Product grid */}
      <div className="flex-1">
        <div className="hidden lg:flex justify-between items-center mb-6">
          <h2 className="font-medium">{filteredProducts.length} Products</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select className="text-sm border rounded-md px-2 py-1">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Customer Rating</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-lg font-medium mb-2">No products match your filters</p>
            <p className="text-muted-foreground mb-4">Try adjusting your filter criteria</p>
            <Button onClick={resetFilters} variant="outline">
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Overlay for mobile */}
      {showFilters && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setShowFilters(false)} />
      )}
    </div>
  )
}

