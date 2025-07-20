"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Plus, Play, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { LoadingSpinner } from "@/components/common/LoadingSpinner"
import { EmptyState } from "@/components/common/EmptyState"
import { useVideos, useVideoMutations, type Video } from "@/hooks/useVideos"
import { useCategories } from "@/hooks/useCategories"

const videoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  youtube_url: z.string().url("Please enter a valid YouTube URL"),
  category_id: z.string().min(1, "Category is required"),
  custom_thumbnail_url: z.string().url().optional().or(z.literal("")),
  is_featured: z.boolean().default(false),
  is_home_featured: z.boolean().default(false),
  home_display_section: z.enum(["hero", "top", "bottom"]).optional(),
})

type VideoForm = z.infer<typeof videoSchema>

export function VideoManager() {
  const [editingVideo, setEditingVideo] = useState<Video | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const { data: videos, isLoading } = useVideos()
  const { data: categories } = useCategories()
  const { createVideo, updateVideo, deleteVideo } = useVideoMutations()

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

  const watchedHomeSection = watch("home_display_section")

  const onSubmit = async (data: VideoForm) => {
    try {
      if (editingVideo) {
        await updateVideo.mutateAsync({
          id: editingVideo.id,
          ...data,
        })
        setEditingVideo(null)
      } else {
        await createVideo.mutateAsync({
          ...data,
          youtube_id: extractYouTubeId(data.youtube_url) || "",
          display_order: 0,
          view_count: 0,
        })
        setIsCreateDialogOpen(false)
      }
      reset()
    } catch (error) {
      console.error("Failed to save video:", error)
    }
  }

  const handleEdit = (video: Video) => {
    setEditingVideo(video)
    setValue("title", video.title)
    setValue("description", video.description || "")
    setValue("youtube_url", video.youtube_url)
    setValue("category_id", video.category_id)
    setValue("custom_thumbnail_url", video.custom_thumbnail_url || "")
    setValue("is_featured", video.is_featured)
    setValue("is_home_featured", video.is_home_featured)
    setValue("home_display_section", video.home_display_section as any)
  }

  const handleDelete = async (videoId: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return

    try {
      await deleteVideo.mutateAsync(videoId)
    } catch (error) {
      console.error("Failed to delete video:", error)
    }
  }

  const handleCreateNew = () => {
    reset()
    setEditingVideo(null)
    setIsCreateDialogOpen(true)
  }

  const extractYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Video Management</h2>
          <p className="text-gray-600">Manage YouTube videos in your portfolio</p>
        </div>
        <Button onClick={handleCreateNew} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Video
        </Button>
      </div>

      {videos && videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative aspect-video">
                  <Image
                    src={
                      video.custom_thumbnail_url ||
                      `https://img.youtube.com/vi/${video.youtube_id || "/placeholder.svg"}/maxresdefault.jpg`
                    }
                    alt={video.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex gap-2">
                      <Button size="icon" variant="secondary" onClick={() => window.open(video.youtube_url, "_blank")}>
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="secondary" onClick={() => handleEdit(video)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="secondary" onClick={() => handleDelete(video.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex gap-1">
                    {video.is_featured && (
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">Featured</span>
                    )}
                    {video.is_home_featured && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Home</span>
                    )}
                  </div>

                  {video.duration && (
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </span>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-medium truncate">{video.title}</h3>
                    {video.description && <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{video.category_name}</span>
                      <span>{video.view_count} views</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No videos found"
          description="Add your first YouTube video to start building your video portfolio."
          actionLabel="Add Video"
          onAction={handleCreateNew}
          icon={<Play className="w-12 h-12 text-gray-400" />}
        />
      )}

      {/* Create/Edit Dialog */}
      <Dialog
        open={isCreateDialogOpen || !!editingVideo}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateDialogOpen(false)
            setEditingVideo(null)
            reset()
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingVideo ? "Edit Video" : "Add New Video"}</DialogTitle>
            <DialogDescription>
              {editingVideo ? "Update video information and settings" : "Add a YouTube video to your portfolio"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} placeholder="Video description..." rows={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom_thumbnail">Custom Thumbnail URL (optional)</Label>
              <Input
                id="custom_thumbnail"
                {...register("custom_thumbnail_url")}
                placeholder="https://example.com/thumbnail.jpg"
              />
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

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsCreateDialogOpen(false)
                  setEditingVideo(null)
                  reset()
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || createVideo.isPending || updateVideo.isPending}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isSubmitting || createVideo.isPending || updateVideo.isPending
                  ? "Saving..."
                  : editingVideo
                    ? "Update Video"
                    : "Add Video"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
