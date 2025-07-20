import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"

export type Video = {
  id: string
  category_id: string
  title: string
  description: string | null
  youtube_url: string
  youtube_id: string
  custom_thumbnail_url: string | null
  duration: string | null
  display_order: number
  is_featured: boolean
  is_home_featured: boolean
  home_display_section: string | null
  view_count: number
  created_at: string
  updated_at: string
  category_name?: string
}

export function useVideos(categoryId?: string) {
  return useQuery({
    queryKey: ["videos", categoryId],
    queryFn: async () => {
      let query = supabase.from("videos").select(`
          *,
          categories!inner(name)
        `)

      if (categoryId) {
        query = query.eq("category_id", categoryId)
      }

      const { data, error } = await query.order("display_order").order("created_at", { ascending: false })

      if (error) throw error

      return data.map((video) => ({
        ...video,
        category_name: video.categories?.name,
      })) as Video[]
    },
  })
}

export function useHomeVideos(section?: string) {
  return useQuery({
    queryKey: ["videos", "home", section],
    queryFn: async () => {
      let query = supabase
        .from("videos")
        .select(`
          *,
          categories!inner(name)
        `)
        .eq("is_home_featured", true)

      if (section) {
        query = query.eq("home_display_section", section)
      }

      const { data, error } = await query.order("display_order").order("created_at", { ascending: false })

      if (error) throw error

      return data.map((video) => ({
        ...video,
        category_name: video.categories?.name,
      })) as Video[]
    },
  })
}

export function useVideoMutations() {
  const queryClient = useQueryClient()

  const createVideo = useMutation({
    mutationFn: async (video: Omit<Video, "id" | "created_at" | "updated_at">) => {
      // Extract YouTube ID from URL
      const youtubeId = extractYouTubeId(video.youtube_url)
      if (!youtubeId) throw new Error("Invalid YouTube URL")

      const { data, error } = await supabase
        .from("videos")
        .insert({ ...video, youtube_id: youtubeId })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] })
    },
  })

  const updateVideo = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Video> & { id: string }) => {
      const { data, error } = await supabase
        .from("videos")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] })
    },
  })

  const deleteVideo = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("videos").delete().eq("id", id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] })
    },
  })

  return { createVideo, updateVideo, deleteVideo }
}

function extractYouTubeId(url: string): string | null {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
  const match = url.match(regex)
  return match ? match[1] : null
}
