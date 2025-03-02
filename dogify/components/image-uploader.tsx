"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Upload } from "lucide-react"

interface ImageUploaderProps {
  onImageSelected: (file: File) => void
}

export function ImageUploader({ onImageSelected }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please select an image file')
      return
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB')
      return
    }
    
    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
    
    // Compress image before uploading (in a real app)
    // For this prototype, we'll just pass the file directly
    onImageSelected(file)
  }

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  const handleRemove = () => {
    setPreview(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <div className="w-full">
      {!preview ? (
        <div
          className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg ${
            dragActive ? "border-primary bg-primary/5" : "border-border"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
          />
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Click or drag & drop</span> to upload an image
            </p>
            <p className="text-xs text-muted-foreground">PNG, JPG, or JPEG (max 5MB)</p>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg border-border">
          <img
            src={preview}
            alt="Preview"
            className="object-cover w-full h-full rounded-lg"
          />
          <button
            className="absolute top-2 right-2 p-1 bg-white rounded-full text-gray-500"
            onClick={handleRemove}
          >
            ✕
          </button>
        </div>
      )}
      <button
        className="mt-4 w-full py-2 bg-primary text-white rounded-lg"
        onClick={handleButtonClick}
      >
        Choose Image
      </button>
    </div>
  )
}
