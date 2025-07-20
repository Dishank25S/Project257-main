"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Play, Youtube, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useCategories } from "@/hooks/useCategories"
import { useVideoMutations } from "@/hooks/useVideos"
import Image from "next/image"

const videoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  youtube_url: z.string().url("Please enter a valid YouTube URL"),
  category_id: z.string().min(1, "Category is required"),
  is_featured: z.boolean(),
  is_home_featured: z.boolean(),
  home_display_section: z.enum(["hero", "top", "bottom"]).optional(),
})

type VideoForm = z.infer<typeof videoSchema>

export function VideoUpload() {
  const [previewData, setPreviewData] = useState<{
    thumbnailUrl: string
    videoId: string
    isValid: boolean
  } | null>(null)
  
  const { data: categories } = useCategories()
  const { createVideo } = useVideoMutations()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<VideoForm>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      is_featured: false,
      is_home_featured: false,
      title: "",
      category_id: "",
      youtube_url: "",
      description: "",
    },
  })

  const watchedUrl = watch("youtube_url")
  const watchedHomeSection = watch("is_home_featured")

  const extractYouTubeId = (url: string): string | null => {
    if (!url) return null
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  // Real-time preview when URL changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (watchedUrl && watchedUrl.trim()) {
        const videoId = extractYouTubeId(watchedUrl.trim())
        if (videoId) {
          setPreviewData({
            thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            videoId,
            isValid: true,
          })
        } else {
          setPreviewData(null)
        }
      } else {
        setPreviewData(null)
      }
    }, 500) // 500ms debounce for better UX

    return () => clearTimeout(debounceTimer)
  }, [watchedUrl])

  const onSubmit = async (data: VideoForm) => {
    try {
      const youtubeId = extractYouTubeId(data.youtube_url)
      if (!youtubeId) {
        throw new Error("Invalid YouTube URL")
      }

      await createVideo.mutateAsync({
        ...data,
        description: data.description || null,
        home_display_section: data.home_display_section || null,
        youtube_id: youtubeId,
        display_order: 0,
        view_count: 0,
        custom_thumbnail_url: null,
        duration: null,
      })

      reset()
      setPreviewData(null)
    } catch (error) {
      console.error("Failed to add video:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Youtube className="w-5 h-5 text-red-500" />
          Add YouTube Video
        </CardTitle>
        <CardDescription>Add YouTube videos to your portfolio by pasting the video URL</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* URL Input with real-time preview */}
          <div className="space-y-2">
            <Label htmlFor="youtube_url">YouTube URL *</Label>
            <Input
              id="youtube_url"
              {...register("youtube_url")}
              placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
              className={errors.youtube_url ? "border-red-500" : ""}
            />
            {errors.youtube_url && <p className="text-sm text-red-500">{errors.youtube_url.message}</p>}
            {!previewData && watchedUrl && watchedUrl.length > 10 && (
              <p className="text-sm text-amber-600">⚠️ Invalid YouTube URL format</p>
            )}
          </div>

          {/* Real-time Thumbnail Preview */}
          {previewData && (
            <div className="space-y-3">
              <Label>Video Preview</Label>
              <div className="relative aspect-video max-w-md mx-auto bg-black rounded-lg overflow-hidden group border">
                <Image
                  src={previewData.thumbnailUrl}
                  alt="YouTube video thumbnail"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                  <div className="bg-red-600 rounded-full p-3 shadow-lg">
                    <Play className="w-6 h-6 text-white fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${previewData.videoId}`, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Watch
                  </Button>
                </div>
              </div>
              <p className="text-sm text-green-600 text-center font-medium">✓ Valid YouTube URL detected - Video ID: {previewData.videoId}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select onValueChange={(value) => setValue("category_id", value)}>
              <SelectTrigger className={errors.category_id ? "border-red-500" : ""}>
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
            {errors.category_id && <p className="text-sm text-red-500">{errors.category_id.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Video Title *</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Enter video title"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} placeholder="Video description..." rows={3} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Switch {...register("is_featured")} />
              <Label>Featured Video</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                {...register("is_home_featured")}
                onCheckedChange={(checked) => {
                  setValue("is_home_featured", checked)
                  if (!checked) {
                    setValue("home_display_section", undefined)
                  }
                }}
              />
              <Label>Show on Home</Label>
            </div>

            {watchedHomeSection && (
              <div className="space-y-2">
                <Label>Home Section</Label>
                <Select onValueChange={(value) => setValue("home_display_section", value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hero">Hero</SelectItem>
                    <SelectItem value="top">Top Gallery</SelectItem>
                    <SelectItem value="bottom">Bottom Gallery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || createVideo.isPending || !previewData}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
          >
            {isSubmitting || createVideo.isPending ? "Adding Video..." : "Add Video to Portfolio"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
