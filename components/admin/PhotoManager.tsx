"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Search, Edit, Trash2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { LoadingSpinner } from "@/components/common/LoadingSpinner"
import { EmptyState } from "@/components/common/EmptyState"
import { usePhotos, usePhotoMutations } from "@/hooks/usePhotos"
import { useCategories } from "@/hooks/useCategories"
import type { Photo } from "@/lib/supabase"

export function PhotoManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null)

  const { data: photos, isLoading } = usePhotos()
  const { data: categories } = useCategories()
  const { updatePhoto, deletePhoto } = usePhotoMutations()

  const filteredPhotos = photos?.filter((photo: any) => {
    const matchesSearch =
      photo.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || photo.category_id === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleUpdatePhoto = async (photoData: Partial<Photo>) => {
    if (!editingPhoto) return

    try {
      await updatePhoto.mutateAsync({
        id: editingPhoto.id,
        ...photoData,
      })
      setEditingPhoto(null)
    } catch (error) {
      console.error("Failed to update photo:", error)
    }
  }

  const handleDeletePhoto = async (photoId: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) return

    try {
      await deletePhoto.mutateAsync(photoId)
    } catch (error) {
      console.error("Failed to delete photo:", error)
    }
  }

  const toggleFeatured = async (photo: Photo) => {
    try {
      await updatePhoto.mutateAsync({
        id: photo.id,
        is_featured: !photo.is_featured,
      })
    } catch (error) {
      console.error("Failed to toggle featured status:", error)
    }
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
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search photos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Photos Grid */}
      {filteredPhotos && filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo: any, index: number) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative aspect-square">
                  <Image
                    src={photo.url || "/placeholder.svg"}
                    alt={photo.alt_text || photo.title || "Photo"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />

                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => toggleFeatured(photo)}
                        className={photo.is_featured ? "bg-yellow-500 text-white" : ""}
                      >
                        <Star className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="secondary" onClick={() => setEditingPhoto(photo)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="secondary" onClick={() => handleDeletePhoto(photo.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Featured badge */}
                  {photo.is_featured && <Badge className="absolute top-2 right-2 bg-yellow-500">Featured</Badge>}
                </div>

                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-medium truncate">{photo.title || "Untitled"}</h3>
                    {photo.description && <p className="text-sm text-gray-600 line-clamp-2">{photo.description}</p>}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{photo.category_name}</span>
                      <span>{new Date(photo.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No photos found"
          description={
            searchTerm || selectedCategory !== "all"
              ? "No photos match your current filters. Try adjusting your search or category filter."
              : "No photos have been uploaded yet. Start by uploading some photos to your portfolio."
          }
        />
      )}

      {/* Edit Photo Dialog */}
      <Dialog open={!!editingPhoto} onOpenChange={() => setEditingPhoto(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Photo</DialogTitle>
            <DialogDescription>Update photo information and settings</DialogDescription>
          </DialogHeader>

          {editingPhoto && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-title">Title</Label>
                    <Input
                      id="edit-title"
                      defaultValue={editingPhoto.title || ""}
                      onChange={(e) => setEditingPhoto((prev) => (prev ? { ...prev, title: e.target.value } : null))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="edit-alt">Alt Text</Label>
                    <Input
                      id="edit-alt"
                      defaultValue={editingPhoto.alt_text || ""}
                      onChange={(e) => setEditingPhoto((prev) => (prev ? { ...prev, alt_text: e.target.value } : null))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="edit-category">Category</Label>
                    <Select
                      value={editingPhoto.category_id || undefined}
                      onValueChange={(value) =>
                        setEditingPhoto((prev) => (prev ? { ...prev, category_id: value } : null))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
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

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="edit-featured"
                      checked={editingPhoto.is_featured}
                      onCheckedChange={(checked) =>
                        setEditingPhoto((prev) => (prev ? { ...prev, is_featured: checked as boolean } : null))
                      }
                    />
                    <Label htmlFor="edit-featured">Featured photo</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={editingPhoto.url || "/placeholder.svg"}
                      alt={editingPhoto.alt_text || "Photo"}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  defaultValue={editingPhoto.description || ""}
                  onChange={(e) => setEditingPhoto((prev) => (prev ? { ...prev, description: e.target.value } : null))}
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingPhoto(null)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => handleUpdatePhoto(editingPhoto)}
                  disabled={updatePhoto.isPending}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {updatePhoto.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
