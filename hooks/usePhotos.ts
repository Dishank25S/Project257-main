import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase, type Photo } from "@/lib/supabase"

export function usePhotos(categoryId?: string) {
  return useQuery({
    queryKey: ["photos", categoryId],
    queryFn: async () => {
      let query = supabase
        .from("photos")
        .select(`
          *,
          categories!inner(name)
        `)
        .eq("is_active", true)

      if (categoryId) {
        query = query.eq("category_id", categoryId)
      }

      const { data, error } = await query.order("display_order").order("created_at", { ascending: false })

      if (error) throw error

      return data.map((photo) => ({
        ...photo,
        category_name: photo.categories?.name,
      })) as Photo[]
    },
  })
}

export function useFeaturedPhotos() {
  return useQuery({
    queryKey: ["photos", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("photos")
        .select(`
          *,
          categories!inner(name)
        `)
        .eq("is_featured", true)
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(6)

      if (error) throw error

      return data.map((photo) => ({
        ...photo,
        category_name: photo.categories?.name,
      })) as Photo[]
    },
  })
}

export function useHomeFeaturedPhotos(section?: string) {
  return useQuery({
    queryKey: ["photos", "home-featured", section],
    queryFn: async () => {
      let query = supabase
        .from("photos")
        .select(`
          *,
          categories!inner(name)
        `)
        .eq("is_home_featured", true)
        .eq("is_active", true)

      if (section) {
        query = query.eq("home_display_section", section)
      }

      const { data, error } = await query.order("display_order").order("created_at", { ascending: false })

      if (error) throw error

      return data.map((photo) => ({
        ...photo,
        category_name: photo.categories?.name,
      })) as Photo[]
    },
  })
}

export function usePhotoMutations() {
  const queryClient = useQueryClient()

  const createPhoto = useMutation({
    mutationFn: async (photo: Omit<Photo, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase.from("photos").insert(photo).select().single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] })
    },
  })

  const updatePhoto = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Photo> & { id: string }) => {
      const { data, error } = await supabase
        .from("photos")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] })
    },
  })

  const deletePhoto = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("photos").delete().eq("id", id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] })
    },
  })

  return { createPhoto, updatePhoto, deletePhoto }
}
