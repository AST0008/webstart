"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useSupabase } from "@/components/supabase-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, ExternalLink } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  const { supabase, user } = useSupabase()
  const router = useRouter()
  const { toast } = useToast()
  const [classifications, setClassifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [subscription, setSubscription] = useState<any>(null)

  useEffect(() => {
    // Redirect if not logged in
    if (user === null) {
      router.push("/login")
      return
    }

    // Fetch user's classifications
    const fetchClassifications = async () => {
      try {
        const { data, error } = await supabase
          .from("classifications")
          .select("*")
          .eq("user_id", user?.id)
          .order("created_at", { ascending: false })

        if (error) throw error

        setClassifications(data || [])
      } catch (error) {
        console.error("Error fetching classifications:", error)
        toast({
          title: "Error loading data",
          description: "There was a problem loading your classifications.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    // Fetch user's subscription
    const fetchSubscription = async () => {
      try {
        const { data, error } = await supabase.from("subscriptions").select("*").eq("user_id", user?.id).single()

        if (error && error.code !== "PGRST116") throw error

        setSubscription(data || { plan: "free" })
      } catch (error) {
        console.error("Error fetching subscription:", error)
      }
    }

    fetchClassifications()
    fetchSubscription()
  }, [user, supabase, router, toast])

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("classifications").delete().eq("id", id)

      if (error) throw error

      // Update local state
      setClassifications(classifications.filter((item) => item.id !== id))

      toast({
        title: "Classification deleted",
        description: "The classification has been removed from your history.",
      })
    } catch (error) {
      console.error("Error deleting classification:", error)
      toast({
        title: "Error deleting classification",
        description: "There was a problem deleting the classification.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-48 w-full rounded-md" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <div className="flex items-center gap-4">
          <Badge variant={subscription?.plan === "premium" ? "default" : "outline"}>
            {subscription?.plan === "premium" ? "Premium Plan" : "Free Plan"}
          </Badge>
          {subscription?.plan !== "premium" && (
            <Button asChild size="sm">
              <a href="/pricing">Upgrade to Premium</a>
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="history">
        <TabsList className="mb-6">
          <TabsTrigger value="history">Classification History</TabsTrigger>
          <TabsTrigger value="account">Account Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          {classifications.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground mb-4">You haven't classified any dogs yet.</p>
                <Button asChild>
                  <a href="/classify">Classify a Dog</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classifications.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="pb-2">
                    <CardTitle>{item.breed}</CardTitle>
                    <CardDescription>Confidence: {item.confidence}%</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {item.image_url && (
                      <div className="relative aspect-square w-full overflow-hidden rounded-md mb-4">
                        <Image
                          src={item.image_url || "/placeholder.svg"}
                          alt={item.breed}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {item.result_data?.traits?.slice(0, 3).map((trait: string) => (
                        <Badge key={trait} variant="secondary">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild size="sm">
                      <a href={`/classify/${item.id}`}>
                        View Details
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete classification</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this classification? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(item.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Manage your account details and subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Email</h3>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Subscription Plan</h3>
                <p className="text-muted-foreground capitalize">{subscription?.plan || "Free"}</p>
              </div>
              {subscription?.plan === "premium" && (
                <div>
                  <h3 className="font-medium mb-1">Next Billing Date</h3>
                  <p className="text-muted-foreground">
                    {new Date(subscription?.current_period_end).toLocaleDateString()}
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <Button variant="outline" asChild>
                <a href="/account/edit">Edit Profile</a>
              </Button>
              {subscription?.plan === "premium" ? (
                <Button variant="outline" className="text-destructive">
                  Cancel Subscription
                </Button>
              ) : (
                <Button asChild>
                  <a href="/pricing">Upgrade to Premium</a>
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

