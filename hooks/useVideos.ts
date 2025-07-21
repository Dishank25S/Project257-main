import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { localDB, type Video } from "@/lib/supabase"

export function useVideos(categoryId?: string) {
  return useQuery({
    queryKey: ["videos", categoryId],
    queryFn: async () => {
      const videos = localDB.videos.getAll(categoryId)
      const categories = localDB.categories.getAll()
      
      return videos
        .sort((a, b) => a.display_order - b.display_order)
        .map((video) => ({
          ...video,
          category_name: categories.find(c => c.id === video.category_id)?.name || 'Uncategorized',
        })) as (Video & { category_name: string })[]
    },
  })
}

export function useFeaturedVideos() {
  return useQuery({
    queryKey: ["videos", "featured"],
    queryFn: async () => {
      const videos = localDB.videos.getAll()
      const categories = localDB.categories.getAll()
      
      const featuredVideos = videos
        .filter(video => video.is_featured)
        .slice(0, 6)
        
      return featuredVideos.map((video) => ({
        ...video,
        category_name: categories.find(c => c.id === video.category_id)?.name || 'Uncategorized',
      })) as (Video & { category_name: string })[]
    },
  })
}

export function useHomeFeaturedVideos(section?: string) {
  return useQuery({
    queryKey: ["videos", "home-featured", section],
    queryFn: async () => {
      const videos = localDB.videos.getAll()
      const categories = localDB.categories.getAll()
      
      let filteredVideos = videos.filter(video => video.is_home_featured)
      
      if (section) {
        filteredVideos = filteredVideos.filter(video => video.home_display_section === section)
      }

      return filteredVideos
        .sort((a, b) => a.display_order - b.display_order)
        .map((video) => ({
          ...video,
          category_name: categories.find(c => c.id === video.category_id)?.name || 'Uncategorized',
        })) as (Video & { category_name: string })[]
    },
  })
}

export function useVideoMutations() {
  const queryClient = useQueryClient()

  const createVideo = useMutation({
    mutationFn: async (video: Omit<Video, "id" | "created_at" | "updated_at">) => {
      const newVideo = localDB.videos.create(video)
      return newVideo
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] })
    },
  })

  const updateVideo = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Video> & { id: string }) => {
      const updated = localDB.videos.update(id, updates)
      if (!updated) throw new Error('Video not found')
      return updated
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] })
    },
  })

  const deleteVideo = useMutation({
    mutationFn: async (id: string) => {
      const success = localDB.videos.delete(id)
      if (!success) throw new Error('Video not found')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] })
    },
  })

  return { createVideo, updateVideo, deleteVideo }
}
