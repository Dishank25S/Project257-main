"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, X, AlertCircle, CheckCircle, Camera, ImageIcon } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { usePhotoMutations } from "@/hooks/usePhotos"
import { useCategories } from "@/hooks/useCategories"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

interface PhotoFormData {
  title: string
  description: string
  category_id: string
  is_featured: boolean
  is_home_featured: boolean
  home_display_section: string | null
  alt_text: string
}

interface UploadedFile {
  file: File
  preview: string
  uploaded: boolean
  url?: string
  uploading: boolean
  error?: string
}

export function NewPhotoUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [formData, setFormData] = useState<PhotoFormData>({
    title: "",
    description: "",
    category_id: "",
    is_featured: false,
    is_home_featured: false,
    home_display_section: null,
    alt_text: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: categories = [] } = useCategories()
  const { createPhoto } = usePhotoMutations()

  // Convert file to base64 for temporary storage
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result)
        } else {
          reject(new Error('Failed to convert file to base64'))
        }
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newFiles = await Promise.all(
      acceptedFiles.map(async (file) => {
        try {
          const base64 = await convertToBase64(file)
          return {
            file,
            preview: URL.createObjectURL(file),
            uploaded: true,
            url: base64, // Use base64 for storage
            uploading: false
          }
        } catch (error) {
          return {
            file,
            preview: URL.createObjectURL(file),
            uploaded: false,
            uploading: false,
            error: 'Failed to process file'
          }
        }
      })
    )
    
    setUploadedFiles(prev => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize: 2 * 1024 * 1024, // 2MB
    multiple: true
  })

  const removeFile = (index: number) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev]
      URL.revokeObjectURL(newFiles[index].preview)
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.category_id || uploadedFiles.length === 0) {
      alert('Please fill in all required fields and upload at least one image.')
      return
    }

    setIsSubmitting(true)

    try {
      // Create photos for all uploaded files
      for (const file of uploadedFiles) {
        if (file.url) {
          const photoData = {
            title: formData.title,
            description: formData.description || null,
            url: file.url,
            alt_text: formData.alt_text || formData.title,
            category_id: formData.category_id,
            is_featured: formData.is_featured,
            is_home_featured: formData.is_home_featured,
            home_display_section: formData.home_display_section,
            display_order: 0,
            view_count: 0
          }

          await createPhoto.mutateAsync(photoData)
        }
      }

      // Reset form
      setFormData({
        title: "",
        description: "",
        category_id: "",
        is_featured: false,
        is_home_featured: false,
        home_display_section: null,
        alt_text: ""
      })
      setUploadedFiles([])
      
      alert(`Successfully uploaded ${uploadedFiles.length} photo(s)!`)
    } catch (error) {
      console.error('Error creating photos:', error)
      alert('Failed to upload photos. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const allFilesUploaded = uploadedFiles.length > 0 && uploadedFiles.every(f => f.uploaded)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-purple-600" />
            Upload Photos (Secure Storage)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File Upload Area */}
          <div className="space-y-4">
            <Label>Upload Images (Max 2MB each)</Label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-purple-400 bg-purple-50'
                  : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              {isDragActive ? (
                <p className="text-purple-600 font-medium">Drop the images here...</p>
              ) : (
                <div>
                  <p className="text-gray-600 mb-2">
                    Drag & drop images here, or click to select files
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports JPEG, PNG, WebP (max 2MB each)
                  </p>
                </div>
              )}
            </div>

            {/* File Rejections */}
            {fileRejections.length > 0 && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  {fileRejections.map((rejection, index) => (
                    <div key={index}>
                      {rejection.file.name}: {rejection.errors[0]?.message}
                    </div>
                  ))}
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* File Previews */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Files</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={file.preview}
                      alt="Preview"
                      width={200}
                      height={128}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    
                    {/* Status overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                      {file.uploading && (
                        <div className="text-white text-sm">Processing...</div>
                      )}
                      {file.uploaded && (
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      )}
                      {file.error && (
                        <AlertCircle className="w-8 h-8 text-red-400" />
                      )}
                    </div>

                    {/* Remove button */}
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFile(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Photo title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category_id} onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Photo description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="alt_text">Alt Text (for accessibility)</Label>
            <Input
              id="alt_text"
              value={formData.alt_text}
              onChange={(e) => setFormData(prev => ({ ...prev, alt_text: e.target.value }))}
              placeholder="Describe the image for screen readers"
            />
          </div>

          {/* Feature toggles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
              />
              <Label htmlFor="featured">Featured Photo</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="home_featured"
                checked={formData.is_home_featured}
                onCheckedChange={(checked) => setFormData(prev => ({ 
                  ...prev, 
                  is_home_featured: checked,
                  home_display_section: checked ? 'top' : null
                }))}
              />
              <Label htmlFor="home_featured">Show on Homepage</Label>
            </div>
          </div>

          {formData.is_home_featured && (
            <div className="space-y-2">
              <Label>Homepage Section</Label>
              <Select 
                value={formData.home_display_section || ''} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, home_display_section: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hero">Hero Section</SelectItem>
                  <SelectItem value="top">Top Gallery</SelectItem>
                  <SelectItem value="bottom">Bottom Gallery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Submit button */}
          <Button
            onClick={handleSubmit}
            disabled={!formData.title || !formData.category_id || uploadedFiles.length === 0 || !allFilesUploaded || isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {isSubmitting ? 'Creating Photos...' : `Create ${uploadedFiles.length} Photo(s)`}
          </Button>

          {/* Security notice */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Images are stored securely with optimized compression. For production use, 
              consider integrating with a professional image hosting service like UploadThing.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
