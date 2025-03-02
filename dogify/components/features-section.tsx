import { CheckCircle, Search, Zap, Database, Share2, Award } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Dogify offers a comprehensive set of features to help you learn more about your dog
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Accurate Breed Identification</h3>
            <p className="text-muted-foreground">
              Our AI model is trained on thousands of dog images to provide highly accurate breed identification
            </p>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Database className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Comprehensive Breed Database</h3>
            <p className="text-muted-foreground">
              Access detailed information about over 200 dog breeds, including temperament, care needs, and history
            </p>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Fast Results</h3>
            <p className="text-muted-foreground">Get instant breed identification results without long waiting times</p>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Similar Breed Suggestions</h3>
            <p className="text-muted-foreground">
              Discover similar dog breeds that match your dog's appearance and characteristics
            </p>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Share2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Easy Sharing</h3>
            <p className="text-muted-foreground">
              Share your dog's breed results with friends and family on social media
            </p>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Premium Features</h3>
            <p className="text-muted-foreground">
              Unlock advanced features with our premium subscription, including detailed care guides
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

