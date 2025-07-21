import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { localDB, type Video } from "@/lib/supabase"

export function useVideos(categoryId?: string) {
  return useQuery({
    queryKey: ["videos", categoryId],
    queryFn: () => {
      const videos = localDB.videos.getAll(categoryId)
      const categories = localDB.categories.getAll()
      
      const result = videos
        .sort((a, b) => a.display_order - b.display_order)
        .map((video) => ({
          ...video,
          category_name: categories.find(c => c.id === video.category_id)?.name || 'Uncategorized',
        })) as (Video & { category_name: string })[]
        
      return Promise.resolve(result)
    },
  })
}

export function useFeaturedVideos() {
  return useQuery({
    queryKey: ["videos", "featured"],
    queryFn: () => {
      const videos = localDB.videos.getAll()
      const categories = localDB.categories.getAll()
      
      const featuredVideos = videos
        .filter(video => video.is_featured)
        .slice(0, 6)
        
      const result = featuredVideos.map((video) => ({
        ...video,
        category_name: categories.find(c => c.id === video.category_id)?.name || 'Uncategorized',
      })) as (Video & { category_name: string })[]
      
      return Promise.resolve(result)
    },
  })
}

export function useHomeFeaturedVideos(section?: string) {
  return useQuery({
    queryKey: ["videos", "home-featured", section],
    queryFn: () => {
      const videos = localDB.videos.getAll()
      const categories = localDB.categories.getAll()
      
      let filteredVideos = videos.filter(video => video.is_home_featured)
      
      if (section) {
        filteredVideos = filteredVideos.filter(video => video.home_display_section === section)
      }

      const result = filteredVideos
        .sort((a, b) => a.display_order - b.display_order)
        .map((video) => ({
          ...video,
          category_name: categories.find(c => c.id === video.category_id)?.name || 'Uncategorized',
        })) as (Video & { category_name: string })[]
        
      return Promise.resolve(result)
    },
  })
}

export function useVideoMutations() {
  const queryClient = useQueryClient()

  const createVideo = useMutation({
    mutationFn: (video: Omit<Video, "id" | "created_at" | "updated_at">) => {
      const newVideo = localDB.videos.create(video)
      return Promise.resolve(newVideo)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] })
    },
  })

  const updateVideo = useMutation({
    mutationFn: ({ id, ...updates }: Partial<Video> & { id: string }) => {
      const updated = localDB.videos.update(id, updates)
      if (!updated) throw new Error('Video not found')
      return Promise.resolve(updated)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] })
    },
  })

  const deleteVideo = useMutation({
    mutationFn: (id: string) => {
      const success = localDB.videos.delete(id)
      if (!success) throw new Error('Video not found')
      return Promise.resolve()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] })
    },
  })

  return { createVideo, updateVideo, deleteVideo }
}
