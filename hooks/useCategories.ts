import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { productionDB as localDB, type Category } from "@/lib/supabase"

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const categories = localDB.categories.getAll()
      const photos = localDB.photos.getAll()
      
      return categories.map((category) => ({
        ...category,
        photo_count: photos.filter(p => p.category_id === category.id).length,
      })) as (Category & { photo_count: number })[]
    },
  })
}

export function useCategoryMutations() {
  const queryClient = useQueryClient()

  const createCategory = useMutation({
    mutationFn: async (category: Omit<Category, "id" | "created_at" | "updated_at">) => {
      const newCategory = localDB.categories.create(category)
      return newCategory
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })

  const updateCategory = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Category> & { id: string }) => {
      const updated = localDB.categories.update(id, updates)
      if (!updated) throw new Error('Category not found')
      return updated
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })

  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      const success = localDB.categories.delete(id)
      if (!success) throw new Error('Category not found')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })

  return { createCategory, updateCategory, deleteCategory }
}
