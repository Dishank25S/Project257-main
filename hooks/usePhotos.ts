import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { localDB, type Photo } from "@/lib/supabase"

export function usePhotos(categoryId?: string) {
  return useQuery({
    queryKey: ["photos", categoryId],
    queryFn: () => {
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
    },
  })
}

export function useFeaturedPhotos() {
  return useQuery({
    queryKey: ["photos", "featured"],
    queryFn: () => {
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
    },
  })
}

export function useHomeFeaturedPhotos(section?: string) {
  return useQuery({
    queryKey: ["photos", "home-featured", section],
    queryFn: () => {
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
    },
  })
}

export function usePhotoMutations() {
  const queryClient = useQueryClient()

  const createPhoto = useMutation({
    mutationFn: (photo: Omit<Photo, "id" | "created_at" | "updated_at">) => {
      const newPhoto = localDB.photos.create(photo)
      return Promise.resolve(newPhoto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] })
    },
  })

  const updatePhoto = useMutation({
    mutationFn: ({ id, ...updates }: Partial<Photo> & { id: string }) => {
      const updated = localDB.photos.update(id, updates)
      if (!updated) throw new Error('Photo not found')
      return Promise.resolve(updated)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] })
    },
  })

  const deletePhoto = useMutation({
    mutationFn: (id: string) => {
      const success = localDB.photos.delete(id)
      if (!success) throw new Error('Photo not found')
      return Promise.resolve()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photos"] })
    },
  })

  return { createPhoto, updatePhoto, deletePhoto }
}
