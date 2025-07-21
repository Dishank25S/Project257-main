import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { localDB, type Category } from "@/lib/supabase"

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      const categories = localDB.categories.getAll()
      const photos = localDB.photos.getAll()
      
      const result = categories.map((category) => ({
        ...category,
        photo_count: photos.filter(p => p.category_id === category.id).length,
      })) as (Category & { photo_count: number })[]
      
      return Promise.resolve(result)
    },
  })
}

export function useCategoryMutations() {
  const queryClient = useQueryClient()

  const createCategory = useMutation({
    mutationFn: (category: Omit<Category, "id" | "created_at" | "updated_at">) => {
      const newCategory = localDB.categories.create(category)
      return Promise.resolve(newCategory)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })

  const updateCategory = useMutation({
    mutationFn: ({ id, ...updates }: Partial<Category> & { id: string }) => {
      const updated = localDB.categories.update(id, updates)
      if (!updated) throw new Error('Category not found')
      return Promise.resolve(updated)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })

  const deleteCategory = useMutation({
    mutationFn: (id: string) => {
      const success = localDB.categories.delete(id)
      if (!success) throw new Error('Category not found')
      return Promise.resolve()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })

  return { createCategory, updateCategory, deleteCategory }
}
