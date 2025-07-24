import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { localDB, type Video } from "@/lib/supabase"
import { auth } from "@/lib/auth"

// Check if we should use API routes (in production/Vercel)
const useAPIRoutes = process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_USE_API === 'true'

export function useVideos(categoryId?: string) {
  return useQuery({
    queryKey: ["videos", categoryId],
    queryFn: async () => {
      if (useAPIRoutes) {
        // Use API route in production
        const url = categoryId ? `/api/videos?categoryId=${encodeURIComponent(categoryId)}` : '/api/videos'
        const response = await fetch(url)
        if (!response.ok) throw new Error('Failed to fetch videos')
        return response.json()
      } else {
        // Use local storage in development
        const videos = localDB.videos.getAll(categoryId)
        const categories = localDB.categories.getAll()
        
        const result = videos
          .sort((a, b) => a.display_order - b.display_order)
          .map((video) => ({
            ...video,
            category_name: categories.find(c => c.id === video.category_id)?.name || 'Uncategorized',
          })) as (Video & { category_name: string })[]
          
        return Promise.resolve(result)
      }
    },
  })
}

export function useFeaturedVideos() {
  return useQuery({
    queryKey: ["videos", "featured"],
    queryFn: async () => {
      if (useAPIRoutes) {
        // Use API route in production - fetch all videos and filter on client
        const response = await fetch('/api/videos')
        if (!response.ok) throw new Error('Failed to fetch videos')
        const videos = await response.json()
        
        return videos
          .filter((video: Video & { category_name: string }) => video.is_featured)
          .slice(0, 6)
      } else {
        // Use local storage in development
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
      }
    },
  })
}

export function useHomeFeaturedVideos(section?: string) {
  return useQuery({
    queryKey: ["videos", "home-featured", section],
    queryFn: async () => {
      if (useAPIRoutes) {
        // Use API route in production - fetch all videos and filter on client
        const response = await fetch('/api/videos')
        if (!response.ok) throw new Error('Failed to fetch videos')
        const videos = await response.json()
        
        let filteredVideos = videos.filter((video: Video & { category_name: string }) => video.is_home_featured)
        
        if (section) {
          filteredVideos = filteredVideos.filter((video: Video & { category_name: string }) => video.home_display_section === section)
        }

        return filteredVideos.sort((a: Video, b: Video) => a.display_order - b.display_order)
      } else {
        // Use local storage in development
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
      }
    },
  })
}

export function useVideoMutations() {
  const queryClient = useQueryClient()

  const createVideo = useMutation({
    mutationFn: async (video: Omit<Video, "id" | "created_at" | "updated_at">) => {
      if (useAPIRoutes) {
        // Use API route in production
        const response = await fetch('/api/videos', {
          method: 'POST',
          headers: auth.getHeaders(),
          body: JSON.stringify(video)
        })
        
        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Failed to create video: ${errorText}`)
        }
        
        return response.json()
      } else {
        // Use localStorage in development
        return Promise.resolve(localDB.videos.create(video))
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] })
    },
  })

  const updateVideo = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Video> & { id: string }) => {
      if (useAPIRoutes) {
        // Use API route in production
        const response = await fetch('/api/videos', {
          method: 'PUT',
          headers: auth.getHeaders(),
          body: JSON.stringify({ id, ...updates })
        })
        
        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Failed to update video: ${errorText}`)
        }
        
        return response.json()
      } else {
        // Use localStorage in development
        return Promise.resolve(localDB.videos.update(id, updates))
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] })
    },
  })

  const deleteVideo = useMutation({
    mutationFn: async (id: string) => {
      if (useAPIRoutes) {
        // Use API route in production
        const response = await fetch(`/api/videos?id=${encodeURIComponent(id)}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${auth.getToken()}`
          }
        })
        
        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Failed to delete video: ${errorText}`)
        }
        
        return response.json()
      } else {
        // Use localStorage in development
        return Promise.resolve({ success: localDB.videos.delete(id) })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] })
    },
  })

  return { createVideo, updateVideo, deleteVideo }
}
