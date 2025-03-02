import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingSection } from "@/components/pricing-section"

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <HeroSection />
      <FeaturesSection />
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Identifying your dog's breed has never been easier with our AI-powered technology
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                1
              </div>
              <h3 className="text-xl font-bold">Upload a Photo</h3>
              <p className="text-muted-foreground">Take a clear photo of your dog and upload it to our platform</p>
            </div>
            <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                2
              </div>
              <h3 className="text-xl font-bold">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our advanced AI analyzes the image to identify the breed with high accuracy
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                3
              </div>
              <h3 className="text-xl font-bold">Get Results</h3>
              <p className="text-muted-foreground">
                Receive detailed information about your dog's breed, traits, and care tips
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <Button asChild size="lg" className="mt-6">
              <Link href="/classify">Try It Now</Link>
            </Button>
          </div>
        </div>
      </section>
      <TestimonialsSection />
      <PricingSection />
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Discover Your Dog's Breed?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of dog lovers who have already used Dogify to learn more about their furry friends
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/classify">Try Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing">View Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

