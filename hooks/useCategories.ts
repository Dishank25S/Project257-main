import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase, type Category } from "@/lib/supabase"

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select(`
          *,
          photos!inner(count)
        `)
        .eq("is_active", true)
        .order("display_order")

      if (error) throw error

      return data.map((category) => ({
        ...category,
        photo_count: category.photos?.length || 0,
      })) as Category[]
    },
  })
}

export function useCategoryMutations() {
  const queryClient = useQueryClient()

  const createCategory = useMutation({
    mutationFn: async (category: Omit<Category, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase.from("categories").insert(category).select().single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })

  const updateCategory = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Category> & { id: string }) => {
      const { data, error } = await supabase
        .from("categories")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })

  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("categories").delete().eq("id", id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })

  return { createCategory, updateCategory, deleteCategory }
}
