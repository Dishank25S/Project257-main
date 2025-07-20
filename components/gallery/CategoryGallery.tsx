"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CategoryFilter } from "./CategoryFilter"
import { PhotoCard } from "./PhotoCard"
import { PhotoLightbox } from "./PhotoLightbox"
import { LoadingSpinner } from "@/components/common/LoadingSpinner"
import { EmptyState } from "@/components/common/EmptyState"
import { usePhotos } from "@/hooks/usePhotos"

interface CategoryGalleryProps {
  initialCategory?: string | null
}

export function CategoryGallery({ initialCategory }: CategoryGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null)

  // Update selectedCategory when initialCategory changes
  useEffect(() => {
    if (initialCategory !== undefined) {
      setSelectedCategory(initialCategory)
    }
  }, [initialCategory])

  const [lightboxIndex, setLightboxIndex] = useState<number>(-1)

  const { data: photos, isLoading } = usePhotos(selectedCategory || undefined)

  const handlePhotoClick = (index: number) => {
    setLightboxIndex(index)
  }

  const handleCloseLightbox = () => {
    setLightboxIndex(-1)
  }

  const handleNavigateLightbox = (index: number) => {
    setLightboxIndex(index)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

      {photos && photos.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo, index) => (
            <PhotoCard key={photo.id} photo={photo} index={index} onClick={() => handlePhotoClick(index)} />
          ))}
        </motion.div>
      ) : (
        <EmptyState
          title="No photos found"
          description={
            selectedCategory
              ? "No photos in this category yet. Try selecting a different category."
              : "No photos have been uploaded yet. Check back soon for amazing photography!"
          }
        />
      )}

      {photos && photos.length > 0 && (
        <PhotoLightbox
          photos={photos}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex >= 0}
          onClose={handleCloseLightbox}
          onNavigate={handleNavigateLightbox}
        />
      )}
    </div>
  )
}
