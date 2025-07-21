import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { localDB, type Category } from "@/lib/supabase"

// Check if we should use API routes (in production/Vercel)
const useAPIRoutes = process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_USE_API === 'true'

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      if (useAPIRoutes) {
        // Use API route in production
        const response = await fetch('/api/categories')
        if (!response.ok) throw new Error('Failed to fetch categories')
        const categories = await response.json()
        
        // Get photos to calculate photo count
        const photosResponse = await fetch('/api/photos')
        const photos = photosResponse.ok ? await photosResponse.json() : []
        
        const result = categories.map((category: Category) => ({
          ...category,
          photo_count: photos.filter((p: any) => p.category_id === category.id).length,
        })) as (Category & { photo_count: number })[]
        
        return result
      } else {
        // Use local storage in development
        const categories = localDB.categories.getAll()
        const photos = localDB.photos.getAll()
        
        const result = categories.map((category) => ({
          ...category,
          photo_count: photos.filter(p => p.category_id === category.id).length,
        })) as (Category & { photo_count: number })[]
        
        return Promise.resolve(result)
      }
    },
  })
}

export function useCategoryMutations() {
  const queryClient = useQueryClient()

  const createCategory = useMutation({
    mutationFn: async (category: Omit<Category, "id" | "created_at" | "updated_at">) => {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer admin' // Simple auth token
        },
        body: JSON.stringify(category)
      })
      
      if (!response.ok) {
        throw new Error('Failed to create category')
      }
      
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })

  const updateCategory = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Category> & { id: string }) => {
      const response = await fetch('/api/categories', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer admin' // Simple auth token
        },
        body: JSON.stringify({ id, ...updates })
      })
      
      if (!response.ok) {
        throw new Error('Failed to update category')
      }
      
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })

  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/categories?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer admin' // Simple auth token
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete category')
      }
      
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })

  return { createCategory, updateCategory, deleteCategory }
}
