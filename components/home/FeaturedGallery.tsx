"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Play, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PhotoLightbox } from "@/components/gallery/PhotoLightbox"
import { useFeaturedPhotos, useHomeFeaturedPhotos } from "@/hooks/usePhotos"
import { useHomeFeaturedVideos } from "@/hooks/useVideos"

interface FeaturedGalleryProps {
  section: "top" | "bottom"
  title: string
  description: string
}

export function FeaturedGallery({ section, title, description }: FeaturedGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  // Get photos based on section
  const { data: featuredPhotos } = useFeaturedPhotos()
  const { data: homeFeaturedPhotos } = useHomeFeaturedPhotos(section === "bottom" ? "bottom" : undefined)
  const { data: sectionVideos } = useHomeFeaturedVideos(section)

  // Select the appropriate photos based on section
  const sectionPhotos = section === "top" ? featuredPhotos || [] : homeFeaturedPhotos || []

  // Combine photos and videos
  const content = [
    ...sectionPhotos.map((photo) => ({ ...photo, type: "photo" as const })),
    ...(sectionVideos?.map((video) => ({ ...video, type: "video" as const })) || []),
  ].slice(0, section === "top" ? 6 : 8)

  const handleItemClick = (index: number, item: any) => {
    if (item.type === "video") {
      window.open(item.youtube_url, "_blank")
    } else {
      setLightboxIndex(index)
    }
  }

  if (!content.length) return null

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">{title}</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">{description}</p>
        </motion.div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${section === "top" ? "lg:grid-cols-3" : "lg:grid-cols-4"} gap-4 sm:gap-6`}
        >
          {content.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => handleItemClick(index, item)}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg sm:rounded-xl bg-gray-100 shadow-md group-hover:shadow-xl transition-all duration-300">
                <Image
                  src={
                    item.type === "video"
                      ? item.custom_thumbnail_url || `https://img.youtube.com/vi/${item.youtube_id}/maxresdefault.jpg`
                      : item.url || "/placeholder.svg"
                  }
                  alt={
                    item.type === "photo" && 'alt_text' in item
                      ? item.alt_text || item.title || "Content"
                      : item.title || "Content"
                  }
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Play button for videos */}
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" />
                    </div>
                  </div>
                )}

                {/* View icon for photos */}
                {item.type === "photo" && (
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  </div>
                )}

                {/* Content info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold text-sm sm:text-lg mb-1">{item.title || "Untitled"}</h3>
                  {item.category_name && (
                    <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm text-xs rounded-full">
                      {item.category_name}
                    </span>
                  )}
                </div>

                {/* Type badge */}
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                      item.type === "video" ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                    }`}
                  >
                    {item.type === "video" ? "Video" : "Photo"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12"
        >
          <Button size="lg" variant="outline" className="border-gray-300 hover:bg-gray-50 bg-transparent" asChild>
            <Link href="/portfolio">View Complete Portfolio</Link>
          </Button>
        </motion.div>
      </div>

      {/* Lightbox for photos */}
      {sectionPhotos.length > 0 && (
        <PhotoLightbox
          photos={sectionPhotos}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex >= 0}
          onClose={() => setLightboxIndex(-1)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  )
}
