import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { localDB, type Photo } from "@/lib/supabase"

// Check if we should use API routes (in production/Vercel)
const useAPIRoutes = process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_USE_API === 'true'

export function usePhotos(categoryId?: string) {
  return useQuery({
    queryKey: ["photos", categoryId],
    queryFn: async () => {
      if (useAPIRoutes) {
        // Use API route in production
        const url = categoryId ? `/api/photos?categoryId=${encodeURIComponent(categoryId)}` : '/api/photos'
        const response = await fetch(url)
        if (!response.ok) throw new Error('Failed to fetch photos')
        return response.json()
      } else {
        // Use local storage in development
        const photos = localDB.photos.getAll(categoryId)
        const categories = localDB.categories.getAll()
        
        console.log('usePhotos query - Total photos retrieved:', photos.length)
        if (categoryId) {
          console.log('Filtered by category:', categoryId)
        }
        
        const result = photos
          .sort((a, b) => a.display_order - b.display_order)
          .map((photo) => ({
            ...photo,
            category_name: categories.find(c => c.id === photo.category_id)?.name || 'Uncategorized',
          })) as (Photo & { category_name: string })[]
          
        return Promise.resolve(result)
      }
    },
  })
}

export function useFeaturedPhotos() {
  return useQuery({
    queryKey: ["photos", "featured"],
    queryFn: async () => {
      if (useAPIRoutes) {
        // Use API route in production
        const response = await fetch('/api/photos')
        if (!response.ok) throw new Error('Failed to fetch photos')
        const photos = await response.json()
        return photos.filter((photo: any) => photo.is_featured).slice(0, 6)
      } else {
        // Use local storage in development
        const photos = localDB.photos.getAll()
        const categories = localDB.categories.getAll()
        
        const featuredPhotos = photos
          .filter(photo => photo.is_featured)
          .slice(0, 6)
          
        const result = featuredPhotos.map((photo) => ({
          ...photo,
          category_name: categories.find(c => c.id === photo.category_id)?.name || 'Uncategorized',
        })) as (Photo & { category_name: string })[]
        
        return Promise.resolve(result)
      }
    },
  })
}

export function useHomeFeaturedPhotos(section?: string) {
  return useQuery({
    queryKey: ["photos", "home-featured", section],
    queryFn: async () => {
      if (useAPIRoutes) {
        // Use API route in production
        const response = await fetch('/api/photos')
        if (!response.ok) throw new Error('Failed to fetch photos')
        const photos = await response.json()
        
        let filteredPhotos = photos.filter((photo: any) => photo.is_home_featured)
        
        if (section) {
          filteredPhotos = filteredPhotos.filter((photo: any) => photo.home_display_section === section)
        }
        
        return filteredPhotos.sort((a: any, b: any) => a.display_order - b.display_order)
      } else {
        // Use local storage in development
        const photos = localDB.photos.getAll()
        const categories = localDB.categories.getAll()
        
        let filteredPhotos = photos.filter(photo => photo.is_home_featured)
        
        if (section) {
          filteredPhotos = filteredPhotos.filter(photo => photo.home_display_section === section)
        }

        const result = filteredPhotos
          .sort((a, b) => a.display_order - b.display_order)
          .map((photo) => ({
            ...photo,
            category_name: categories.find(c => c.id === photo.category_id)?.name || 'Uncategorized',
          })) as (Photo & { category_name: string })[]
          
        return Promise.resolve(result)
      }
    },
  })
}

export function usePhotoMutations() {
  const queryClient = useQueryClient()

  const createPhoto = useMutation({
    mutationFn: async (photo: Omit<Photo, "id" | "created_at" | "updated_at">) => {
      if (useAPIRoutes) {
        const response = await fetch('/api/photos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer admin' // Simple auth token
          },
          body: JSON.stringify(photo)
        })
        
        if (!response.ok) {
          const error = await response.text()
          throw new Error(`Failed to create photo: ${error}`)
        }
        
        return response.json()
      } else {
        // Use local storage in development
        const newPhoto = localDB.photos.create(photo)
        return Promise.resolve(newPhoto)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] })
    },
    onError: (error) => {
      console.error('Error creating photo:', error)
    }
  })

  const updatePhoto = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Photo> & { id: string }) => {
      if (useAPIRoutes) {
        const response = await fetch('/api/photos', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer admin' // Simple auth token
          },
          body: JSON.stringify({ id, ...updates })
        })
        
        if (!response.ok) {
          const error = await response.text()
          throw new Error(`Failed to update photo: ${error}`)
        }
        
        return response.json()
      } else {
        // Use local storage in development
        const updated = localDB.photos.update(id, updates)
        if (!updated) throw new Error('Photo not found')
        return Promise.resolve(updated)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] })
    },
    onError: (error) => {
      console.error('Error updating photo:', error)
    }
  })

  const deletePhoto = useMutation({
    mutationFn: async (id: string) => {
      if (useAPIRoutes) {
        const response = await fetch(`/api/photos?id=${encodeURIComponent(id)}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer admin' // Simple auth token
          }
        })
        
        if (!response.ok) {
          const error = await response.text()
          throw new Error(`Failed to delete photo: ${error}`)
        }
        
        return response.json()
      } else {
        // Use local storage in development
        const success = localDB.photos.delete(id)
        if (!success) throw new Error('Photo not found')
        return Promise.resolve()
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] })
    },
    onError: (error) => {
      console.error('Error deleting photo:', error)
    }
  })

  return { createPhoto, updatePhoto, deletePhoto }
}
