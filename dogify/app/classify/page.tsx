"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUploader } from "@/components/image-uploader"
import { useSupabase } from "@/components/supabase-provider"
import { Loader2, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BreedResult } from "@/components/breed-result"
import { UpgradePrompt } from "@/components/upgrade-prompt"

export default function ClassifyPage() {
  const { supabase, user } = useSupabase()
  const router = useRouter()
  const { toast } = useToast()
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false)

  // Mock function to classify dog breed
  const classifyDogBreed = async (imageFile: File) => {
    // In a real app, this would call an actual API
    setLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock result
    const mockBreeds = [
      "Labrador Retriever",
      "German Shepherd",
      "Golden Retriever",
      "Bulldog",
      "Beagle",
      "Poodle",
      "Rottweiler",
      "Yorkshire Terrier",
      "Boxer",
      "Dachshund",
      "Siberian Husky",
      "Great Dane",
    ]

    const randomBreed = mockBreeds[Math.floor(Math.random() * mockBreeds.length)]
    const confidence = Math.floor(Math.random() * 30) + 70 // 70-99% confidence

    const result = {
      breed: randomBreed,
      confidence: confidence,
      traits: ["Friendly", "Energetic", "Loyal", "Good with children", "Intelligent"],
      similarBreeds: [
        mockBreeds[Math.floor(Math.random() * mockBreeds.length)],
        mockBreeds[Math.floor(Math.random() * mockBreeds.length)],
      ],
    }

    // If user is logged in, save the result to the database
    if (user) {
      try {
        const imagePath = `dog-images/${Date.now()}-${imageFile.name}`

        // Upload image to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("images")
          .upload(imagePath, imageFile)

        if (uploadError) throw uploadError

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("images").getPublicUrl(imagePath)

        // Save result to database
        const { error: insertError } = await supabase.from("classifications").insert({
          user_id: user.id,
          image_url: publicUrl,
          breed: result.breed,
          confidence: result.confidence,
          result_data: result,
        })

        if (insertError) throw insertError
      } catch (error) {
        console.error("Error saving result:", error)
        toast({
          title: "Error saving result",
          description: "Your result couldn't be saved to your history.",
          variant: "destructive",
        })
      }
    } else {
      // If user is not logged in, show upgrade prompt after showing results
      setTimeout(() => {
        setShowUpgradePrompt(true)
      }, 3000)
    }

    setLoading(false)
    return result
  }

  const handleImageUpload = (file: File) => {
    setImage(file)
    setResult(null)
    setShowUpgradePrompt(false)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleClassify = async () => {
    if (!image) {
      toast({
        title: "No image selected",
        description: "Please upload an image of a dog to classify.",
        variant: "destructive",
      })
      return
    }

    try {
      const result = await classifyDogBreed(image)
      setResult(result)
    } catch (error) {
      console.error("Error classifying image:", error)
      toast({
        title: "Classification failed",
        description: "There was an error classifying your image. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSignIn = () => {
    router.push("/login")
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Dog Breed Classifier</h1>

      {!user && (
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Not signed in</AlertTitle>
          <AlertDescription>
            Sign in to save your classification results and access your history.
            <Button variant="link" onClick={handleSignIn} className="p-0 h-auto font-normal">
              Sign in now
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>Upload a clear photo of a dog to identify its breed</CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUploader onImageSelected={handleImageUpload} />

            {preview && (
              <div className="mt-4 relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-lg border">
                <Image src={preview || "/placeholder.svg"} alt="Dog preview" fill className="object-cover" />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleClassify} disabled={!image || loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Identify Breed"
              )}
            </Button>
          </CardFooter>
        </Card>

        <div>
          {result ? (
            <BreedResult result={result} />
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center p-6">
                <p className="text-muted-foreground">Upload an image and click "Identify Breed" to see results</p>
              </CardContent>
            </Card>
          )}

          {showUpgradePrompt && <UpgradePrompt />}
        </div>
      </div>
    </div>
  )
}

