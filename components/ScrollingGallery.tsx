"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface GalleryImage {
  id: string
  url: string
  alt: string
  featured: boolean
  visible: boolean
}

interface ScrollingGalleryProps {
  images: GalleryImage[]
  scrollSpeed: number
  autoplay: boolean
}

export function ScrollingGallery({ images, scrollSpeed, autoplay }: ScrollingGalleryProps) {
  const [duplicatedImages, setDuplicatedImages] = useState<GalleryImage[]>([])

  useEffect(() => {
    // Filter visible images and duplicate them for seamless loop
    const visibleImages = images.filter((img) => img.visible)
    const duplicated = [...visibleImages, ...visibleImages, ...visibleImages]
    setDuplicatedImages(duplicated)
  }, [images])

  if (duplicatedImages.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <motion.div
        className="flex h-full"
        animate={autoplay ? { x: [0, -100 * (duplicatedImages.length / 3)] } : {}}
        transition={{
          duration: scrollSpeed,
          repeat: autoplay ? Number.POSITIVE_INFINITY : 0,
          ease: "linear",
        }}
        style={{ width: `${duplicatedImages.length * 100}%` }}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={`${image.id}-${index}`}
            className="relative flex-shrink-0 h-full"
            style={{ width: `${100 / duplicatedImages.length}%` }}
          >
            <Image
              src={image.url || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index < 6}
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
