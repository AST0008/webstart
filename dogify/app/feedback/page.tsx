"use client"

import type React from "react"

import { useState } from "react"
import { useSupabase } from "@/components/supabase-provider"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, CheckCircle2 } from "lucide-react"

export default function FeedbackPage() {
  const { supabase, user } = useSupabase()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    satisfaction: "",
    usability: "",
    accuracy: "",
    comments: "",
    improvements: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from("feedback").insert({
        user_id: user?.id || null,
        name: formData.name,
        email: formData.email,
        satisfaction: formData.satisfaction,
        usability: formData.usability,
        accuracy: formData.accuracy,
        comments: formData.comments,
        improvements: formData.improvements,
      })

      if (error) throw error

      setSubmitted(true)
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback! We appreciate your input.",
      })
    } catch (error) {
      console.error("Error submitting feedback:", error)
      toast({
        title: "Submission failed",
        description: "There was an error submitting your feedback. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="container py-10">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-2">Thank You for Your Feedback!</h2>
            <p className="text-muted-foreground mb-6">
              Your input is valuable to us and helps improve our service for everyone.
            </p>
            <div className="flex gap-4">
              <Button asChild variant="outline">
                <a href="/">Return Home</a>
              </Button>
              <Button asChild>
                <a href="/classify">Try Another Classification</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">We Value Your Feedback</h1>
        <p className="text-muted-foreground mb-8">
          Help us improve Dogify by sharing your experience with our dog breed classifier.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Feedback Form</CardTitle>
            <CardDescription>Please take a moment to complete this short survey about your experience.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Overall satisfaction with Dogify</Label>
                <RadioGroup
                  onValueChange={(value) => handleRadioChange("satisfaction", value)}
                  className="flex space-x-4"
                  required
                >
                  {["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"].map(
                    (option, index) => (
                      <div key={index} className="flex flex-col items-center space-y-1">
                        <RadioGroupItem value={option} id={`satisfaction-${index}`} />
                        <Label htmlFor={`satisfaction-${index}`} className="text-xs">
                          {option}
                        </Label>
                      </div>
                    ),
                  )}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>How easy was it to use our dog breed classifier?</Label>
                <RadioGroup
                  onValueChange={(value) => handleRadioChange("usability", value)}
                  className="flex space-x-4"
                  required
                >
                  {["Very Difficult", "Difficult", "Neutral", "Easy", "Very Easy"].map((option, index) => (
                    <div key={index} className="flex flex-col items-center space-y-1">
                      <RadioGroupItem value={option} id={`usability-${index}`} />
                      <Label htmlFor={`usability-${index}`} className="text-xs">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>How accurate were the breed classifications?</Label>
                <RadioGroup
                  onValueChange={(value) => handleRadioChange("accuracy", value)}
                  className="flex space-x-4"
                  required
                >
                  {["Not Accurate", "Somewhat Accurate", "Neutral", "Accurate", "Very Accurate"].map(
                    (option, index) => (
                      <div key={index} className="flex flex-col items-center space-y-1">
                        <RadioGroupItem value={option} id={`accuracy-${index}`} />
                        <Label htmlFor={`accuracy-${index}`} className="text-xs">
                          {option}
                        </Label>
                      </div>
                    ),
                  )}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments">What did you like most about Dogify?</Label>
                <Textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Please share your thoughts..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="improvements">How can we improve Dogify?</Label>
                <Textarea
                  id="improvements"
                  name="improvements"
                  value={formData.improvements}
                  onChange={handleChange}
                  placeholder="Please share your suggestions..."
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

