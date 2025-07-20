"use client"

import { useState, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { useDropzone } from "react-dropzone"
import { Upload, X, Check, AlertCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useCategories } from "@/hooks/useCategories"
import { usePhotoMutations } from "@/hooks/usePhotos"

interface UploadFile extends File {
  id: string
  preview: string
  progress: number
  status: "pending" | "uploading" | "success" | "error"
  error?: string
}

interface PhotoMetadata {
  title: string
  description: string
  altText: string
  categoryId: string
  isFeatured: boolean
  isHomeFeatured: boolean
  homeDisplaySection: string
}

export function PhotoUpload() {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [metadata, setMetadata] = useState<PhotoMetadata>({
    title: "",
    description: "",
    altText: "",
    categoryId: "",
    isFeatured: false,
    isHomeFeatured: false,
    homeDisplaySection: "top",
  })

  const { data: categories } = useCategories()
  const { createPhoto } = usePhotoMutations()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => {
      // Ensure file is a valid File object before creating object URL
      if (!(file instanceof File)) {
        console.error('Invalid file object:', file)
        return null
      }

      // Additional validation for image files
      if (!file.type.startsWith('image/')) {
        console.error('File is not an image:', file.type)
        return null
      }

      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        console.error('File too large:', file.size)
        return null
      }
      
      try {
        return {
          ...file,
          id: Math.random().toString(36).substr(2, 9),
          preview: URL.createObjectURL(file),
          progress: 0,
          status: "pending" as const,
        }
      } catch (error) {
        console.error('Error creating object URL:', error)
        return null
      }
    }).filter(Boolean) as UploadFile[]

    setFiles((prev) => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: true,
    maxFiles: 10,
    onError: (error) => {
      console.error('Dropzone error:', error)
    },
    onDropRejected: (fileRejections) => {
      console.error('Files rejected:', fileRejections)
    },
  })

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview)
        }
      })
    }
  }, [files])

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id)
      if (file) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter((f) => f.id !== id)
    })
  }

  const uploadFile = async (file: UploadFile) => {
    try {
      // Update status to uploading
      setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, status: "uploading" as const } : f)))

      // Simulate upload progress for better UX
      for (let progress = 0; progress <= 100; progress += 25) {
        setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, progress } : f)))
        await new Promise(resolve => setTimeout(resolve, 100))
      }

      // Create a blob URL for the file (this will persist until the page is refreshed)
      let imageUrl: string
      try {
        // Validate file before creating object URL
        if (!(file instanceof File)) {
          throw new Error('Invalid file object')
        }
        imageUrl = URL.createObjectURL(file)
      } catch (error) {
        console.error('Error creating object URL for upload:', error)
        // Fallback to a placeholder or handle error
        throw new Error('Failed to process image file')
      }

      // For a production app, you would upload to a cloud service like Cloudinary, 
      // AWS S3, or save to a local server. For this demo, we'll use the blob URL.
      
      // Create photo record with all required fields
      await createPhoto.mutateAsync({
        category_id: metadata.categoryId,
        title: metadata.title || file.name,
        description: metadata.description,
        url: imageUrl, // Using blob URL - in production use proper file storage
        alt_text: metadata.altText || metadata.title || file.name,
        display_order: 0,
        is_featured: metadata.isFeatured,
        is_home_featured: metadata.isHomeFeatured,
        home_display_section: metadata.isHomeFeatured ? metadata.homeDisplaySection : null,
        view_count: 0,
      })

      // Update status to success
      setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, status: "success" as const, progress: 100 } : f)))
    } catch (error) {
      console.error("Upload failed:", error)
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id
            ? {
                ...f,
                status: "error" as const,
                error: error instanceof Error ? error.message : "Upload failed",
              }
            : f,
        ),
      )
    }
  }

  const uploadAllFiles = async () => {
    if (!metadata.categoryId) {
      alert("Please select a category")
      return
    }

    const pendingFiles = files.filter((f) => f.status === "pending")

    for (const file of pendingFiles) {
      await uploadFile(file)
    }
  }

  const clearCompleted = () => {
    setFiles((prev) => {
      const toRemove = prev.filter((f) => f.status === "success")
      toRemove.forEach((f) => URL.revokeObjectURL(f.preview))
      return prev.filter((f) => f.status !== "success")
    })
  }

  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Upload up to 10 photos per category. Photos will be displayed on the website once uploaded and activated.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Upload Photos</CardTitle>
          <CardDescription>
            Add new photos to your portfolio. Select a category and provide metadata for better organization.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Metadata Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={metadata.categoryId}
                onValueChange={(value) => setMetadata((prev) => ({ ...prev, categoryId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Default Title</Label>
              <Input
                id="title"
                value={metadata.title}
                onChange={(e) => setMetadata((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Photo title (optional)"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Default Description</Label>
              <Textarea
                id="description"
                value={metadata.description}
                onChange={(e) => setMetadata((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Photo description (optional)"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="altText">Default Alt Text</Label>
              <Input
                id="altText"
                value={metadata.altText}
                onChange={(e) => setMetadata((prev) => ({ ...prev, altText: e.target.value }))}
                placeholder="Alt text for accessibility"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={metadata.isFeatured}
                  onCheckedChange={(checked) => setMetadata((prev) => ({ ...prev, isFeatured: checked as boolean }))}
                />
                <Label htmlFor="featured">Mark as featured</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="homeFeatured"
                  checked={metadata.isHomeFeatured}
                  onCheckedChange={(checked) =>
                    setMetadata((prev) => ({ ...prev, isHomeFeatured: checked as boolean }))
                  }
                />
                <Label htmlFor="homeFeatured">Show on homepage</Label>
              </div>

              {metadata.isHomeFeatured && (
                <div className="space-y-2">
                  <Label>Homepage Section</Label>
                  <Select
                    value={metadata.homeDisplaySection}
                    onValueChange={(value) => setMetadata((prev) => ({ ...prev, homeDisplaySection: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hero">Hero Section</SelectItem>
                      <SelectItem value="top">Top Gallery</SelectItem>
                      <SelectItem value="bottom">Bottom Gallery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          {/* Upload Area */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-purple-500 bg-purple-50" : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            {isDragActive ? (
              <p className="text-purple-600 font-medium">Drop the files here...</p>
            ) : (
              <div>
                <p className="text-gray-600 font-medium mb-2">Drag & drop photos here, or click to select</p>
                <p className="text-sm text-gray-500">Supports: JPEG, PNG, WebP (Max 10MB each, 10 files max)</p>
              </div>
            )}
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Files to Upload ({files.length})</h3>
                <div className="flex gap-2">
                  <Button
                    onClick={clearCompleted}
                    variant="outline"
                    size="sm"
                    disabled={!files.some((f) => f.status === "success")}
                  >
                    Clear Completed
                  </Button>
                  <Button
                    onClick={uploadAllFiles}
                    disabled={!metadata.categoryId || files.every((f) => f.status !== "pending")}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Upload All
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {files.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative bg-white border rounded-lg p-3"
                  >
                    <div className="aspect-square relative mb-3 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={file.preview || "/placeholder.svg"}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />

                      {/* Status overlay */}
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        {file.status === "pending" && (
                          <div className="text-white text-center">
                            <Upload className="w-6 h-6 mx-auto mb-1" />
                            <span className="text-xs">Ready</span>
                          </div>
                        )}
                        {file.status === "uploading" && (
                          <div className="text-white text-center">
                            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-1" />
                            <span className="text-xs">{Math.round(file.progress)}%</span>
                          </div>
                        )}
                        {file.status === "success" && (
                          <div className="text-green-400 text-center">
                            <Check className="w-6 h-6 mx-auto mb-1" />
                            <span className="text-xs">Done</span>
                          </div>
                        )}
                        {file.status === "error" && (
                          <div className="text-red-400 text-center">
                            <AlertCircle className="w-6 h-6 mx-auto mb-1" />
                            <span className="text-xs">Error</span>
                          </div>
                        )}
                      </div>

                      {/* Remove button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1 w-6 h-6 bg-black/50 hover:bg-black/70 text-white"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(1)} MB</p>

                      {file.status === "uploading" && <Progress value={file.progress} className="h-1" />}

                      {file.status === "error" && file.error && <p className="text-xs text-red-500">{file.error}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
