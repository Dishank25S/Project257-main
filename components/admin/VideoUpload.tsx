"use client"

import React from "react"

import { useState } from "react"
import { Play, Youtube } from "lucide-react"
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

const videoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  youtube_url: z.string().url("Please enter a valid YouTube URL"),
  category_id: z.string().min(1, "Category is required"),
  is_featured: z.boolean().default(false),
  is_home_featured: z.boolean().default(false),
  home_display_section: z.enum(["hero", "top", "bottom"]).optional(),
})

type VideoForm = z.infer<typeof videoSchema>

export function VideoUpload() {
  const [previewUrl, setPreviewUrl] = useState("")
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
  })

  const watchedUrl = watch("youtube_url")
  const watchedHomeSection = watch("is_home_featured")

  const extractYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  // Update preview when URL changes
  React.useEffect(() => {
    if (watchedUrl) {
      const videoId = extractYouTubeId(watchedUrl)
      if (videoId) {
        setPreviewUrl(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`)
      }
    }
  }, [watchedUrl])

  const onSubmit = async (data: VideoForm) => {
    try {
      const youtubeId = extractYouTubeId(data.youtube_url)
      if (!youtubeId) {
        throw new Error("Invalid YouTube URL")
      }

      await createVideo.mutateAsync({
        ...data,
        youtube_id: youtubeId,
        display_order: 0,
        view_count: 0,
        custom_thumbnail_url: null,
        duration: null,
      })

      reset()
      setPreviewUrl("")
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="youtube_url">YouTube URL *</Label>
              <Input
                id="youtube_url"
                {...register("youtube_url")}
                placeholder="https://www.youtube.com/watch?v=..."
                className={errors.youtube_url ? "border-red-500" : ""}
              />
              {errors.youtube_url && <p className="text-sm text-red-500">{errors.youtube_url.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select onValueChange={(value) => setValue("category_id", value)}>
                <SelectTrigger className={errors.category_id ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select category" />
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

          {/* Preview */}
          {previewUrl && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="relative aspect-video max-w-md rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Play className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          )}

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
            disabled={isSubmitting || createVideo.isPending}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {isSubmitting || createVideo.isPending ? "Adding Video..." : "Add Video"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
