import Image from "next/image"

export function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't just take our word for it. Here's what dog owners think about Dogify.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
          <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex text-yellow-400">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
              </div>
              <p className="text-muted-foreground">
                "Dogify accurately identified my mixed breed dog as a Labrador-Shepherd mix. The detailed information
                about both breeds helped me understand his behavior so much better!"
              </p>
            </div>
            <div className="mt-6 flex items-center">
              <Image
                src="/placeholder.svg?height=40&width=40"
                width="40"
                height="40"
                alt="User"
                className="rounded-full"
              />
              <div className="ml-4">
                <p className="text-sm font-medium">Sarah Johnson</p>
                <p className="text-xs text-muted-foreground">Dog owner for 3 years</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex text-yellow-400">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
              </div>
              <p className="text-muted-foreground">
                "As a veterinarian, I'm impressed with the accuracy of Dogify. I've recommended it to many of my clients
                who are curious about their rescue dogs' breeds."
              </p>
            </div>
            <div className="mt-6 flex items-center">
              <Image
                src="/placeholder.svg?height=40&width=40"
                width="40"
                height="40"
                alt="User"
                className="rounded-full"
              />
              <div className="ml-4">
                <p className="text-sm font-medium">Dr. Michael Chen</p>
                <p className="text-xs text-muted-foreground">Veterinarian</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex text-yellow-400">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={i < 4 ? "currentColor" : "none"}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
              </div>
              <p className="text-muted-foreground">
                "The premium subscription is worth every penny. The detailed care guides and breed-specific training
                tips have been invaluable for raising my Husky puppy."
              </p>
            </div>
            <div className="mt-6 flex items-center">
              <Image
                src="/placeholder.svg?height=40&width=40"
                width="40"
                height="40"
                alt="User"
                className="rounded-full"
              />
              <div className="ml-4">
                <p className="text-sm font-medium">Alex Rodriguez</p>
                <p className="text-xs text-muted-foreground">Premium user</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

