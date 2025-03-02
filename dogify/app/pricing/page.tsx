"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useSupabase } from "@/components/supabase-provider"
import { useToast } from "@/components/ui/use-toast"

export default function PricingPage() {
  const { supabase, user } = useSupabase()
  const router = useRouter()
  const { toast } = useToast()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const handleSubscribe = async (plan: string) => {
    if (!user) {
      // Redirect to login if not logged in
      router.push("/login?redirect=/pricing")
      return
    }

    // In a real app, this would redirect to a payment processor
    try {
      toast({
        title: "Processing subscription",
        description: "Please wait while we process your subscription.",
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock subscription creation
      const { error } = await supabase.from("subscriptions").upsert({
        user_id: user.id,
        plan: plan,
        billing_cycle: billingCycle,
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: "active",
      })

      if (error) throw error

      toast({
        title: "Subscription successful!",
        description: `You are now subscribed to the ${plan} plan.`,
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Error creating subscription:", error)
      toast({
        title: "Subscription failed",
        description: "There was an error processing your subscription. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-muted-foreground mb-8">
          Select the perfect plan for your needs. Upgrade or downgrade at any time.
        </p>

        <div className="flex items-center justify-center mb-8">
          <span className={`mr-2 ${billingCycle === "monthly" ? "font-medium" : "text-muted-foreground"}`}>
            Monthly
          </span>
          <Switch
            checked={billingCycle === "yearly"}
            onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
          />
          <span className={`ml-2 ${billingCycle === "yearly" ? "font-medium" : "text-muted-foreground"}`}>
            Yearly
            <span className="ml-1 text-xs text-primary">Save 20%</span>
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Free Plan</CardTitle>
              <CardDescription>Basic features for casual users</CardDescription>
              <div className="mt-4 text-3xl font-bold">$0</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-left">
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
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => handleSubscribe("free")}>
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="border-primary">
            <CardHeader>
              <div className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full w-fit mb-2">
                RECOMMENDED
              </div>
              <CardTitle>Premium Plan</CardTitle>
              <CardDescription>Advanced features for dog enthusiasts</CardDescription>
              <div className="mt-4 text-3xl font-bold">
                ${billingCycle === "monthly" ? "9.99" : "7.99"}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  /{billingCycle === "monthly" ? "month" : "month, billed annually"}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-left">
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
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleSubscribe("premium")}>
                {user ? "Subscribe Now" : "Sign Up & Subscribe"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          All plans include a 14-day money-back guarantee. No questions asked.
        </div>
      </div>
    </div>
  )
}

