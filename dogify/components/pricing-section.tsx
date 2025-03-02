import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PricingSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that's right for you
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
          <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Free</h3>
              <p className="text-muted-foreground">Basic features for casual users</p>
            </div>
            <div className="mt-4 text-4xl font-bold">$0</div>
            <p className="mt-1 text-sm text-muted-foreground">Forever free</p>
            <ul className="mt-6 space-y-2">
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                <span>Up to 10 breed identifications per month</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                <span>Basic breed information</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                <span>Standard processing speed</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                <span>Community support</span>
              </li>
            </ul>
            <Button asChild className="mt-8" variant="outline">
              <Link href="/classify">Get Started</Link>
            </Button>
          </div>
          <div className="flex flex-col rounded-lg border border-primary bg-background p-6 shadow-sm">
            <div className="space-y-2">
              <div className="inline-block rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
                RECOMMENDED
              </div>
              <h3 className="text-2xl font-bold">Premium</h3>
              <p className="text-muted-foreground">Advanced features for dog enthusiasts</p>
            </div>
            <div className="mt-4 text-4xl font-bold">$9.99</div>
            <p className="mt-1 text-sm text-muted-foreground">per month</p>
            <ul className="mt-6 space-y-2">
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                <span>Unlimited breed identifications</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                <span>Detailed breed characteristics and history</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                <span>Priority processing speed</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                <span>Breed-specific care recommendations</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                <span>Export and share results</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                <span>Priority customer support</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                <span>10% discount on shop items</span>
              </li>
            </ul>
            <Button asChild className="mt-8">
              <Link href="/pricing">Subscribe Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

