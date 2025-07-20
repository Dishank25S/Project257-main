"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { LoadingSpinner } from "@/components/common/LoadingSpinner"
import { EmptyState } from "@/components/common/EmptyState"
import { useCategories, useCategoryMutations } from "@/hooks/useCategories"
import type { Category } from "@/lib/supabase"

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
})

type CategoryForm = z.infer<typeof categorySchema>

export function CategoryManager() {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const { data: categories, isLoading } = useCategories()
  const { createCategory, updateCategory, deleteCategory } = useCategoryMutations()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
  })

  const watchedName = watch("name")

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const onSubmit = async (data: CategoryForm) => {
    try {
      if (editingCategory) {
        await updateCategory.mutateAsync({
          id: editingCategory.id,
          ...data,
        })
        setEditingCategory(null)
      } else {
        await createCategory.mutateAsync({
          ...data,
          display_order: (categories?.length || 0) + 1,
          is_active: true,
        })
        setIsCreateDialogOpen(false)
      }
      reset()
    } catch (error) {
      console.error("Failed to save category:", error)
    }
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setValue("name", category.name)
    setValue("slug", category.slug)
    setValue("description", category.description || "")
  }

  const handleDelete = async (categoryId: string) => {
    if (!confirm("Are you sure you want to delete this category? This will also delete all photos in this category.")) {
      return
    }

    try {
      await deleteCategory.mutateAsync(categoryId)
    } catch (error) {
      console.error("Failed to delete category:", error)
    }
  }

  const handleCreateNew = () => {
    reset()
    setEditingCategory(null)
    setIsCreateDialogOpen(true)
  }

  // Auto-update slug when name changes (only for new categories)
  if (watchedName && !editingCategory) {
    const newSlug = generateSlug(watchedName)
    setValue("slug", newSlug)
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
          <h2 className="text-2xl font-bold">Category Management</h2>
          <p className="text-gray-600">Organize your photos into categories</p>
        </div>
        <Button onClick={handleCreateNew} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {categories && categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <FolderOpen className="w-5 h-5 text-purple-600" />
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </div>
                    <Badge variant="secondary">{category.photo_count || 0} photos</Badge>
                  </div>
                  {category.description && (
                    <CardDescription className="line-clamp-2">{category.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <p>Slug: {category.slug}</p>
                      <p>Order: {category.display_order}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(category)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(category.id)}
                        disabled={deleteCategory.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No categories found"
          description="Create your first category to start organizing your photos."
          actionLabel="Add Category"
          onAction={handleCreateNew}
          icon={<FolderOpen className="w-12 h-12 text-gray-400" />}
        />
      )}

      {/* Create/Edit Dialog */}
      <Dialog
        open={isCreateDialogOpen || !!editingCategory}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateDialogOpen(false)
            setEditingCategory(null)
            reset()
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Category" : "Create New Category"}</DialogTitle>
            <DialogDescription>
              {editingCategory
                ? "Update category information and settings"
                : "Add a new category to organize your photos"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name *</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="e.g., Wedding Photography"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                {...register("slug")}
                placeholder="e.g., wedding-photography"
                className={errors.slug ? "border-red-500" : ""}
              />
              {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
              <p className="text-xs text-gray-500">
                Used in URLs. Only lowercase letters, numbers, and hyphens allowed.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Brief description of this category..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsCreateDialogOpen(false)
                  setEditingCategory(null)
                  reset()
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || createCategory.isPending || updateCategory.isPending}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isSubmitting || createCategory.isPending || updateCategory.isPending
                  ? "Saving..."
                  : editingCategory
                    ? "Update Category"
                    : "Create Category"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
