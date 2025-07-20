"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Photo } from "@/lib/supabase"

interface PhotoLightboxProps {
  photos: Photo[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (index: number) => void
}

export function PhotoLightbox({ photos, currentIndex, isOpen, onClose, onNavigate }: PhotoLightboxProps) {
  const currentPhoto = photos[currentIndex]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          if (currentIndex > 0) {
            onNavigate(currentIndex - 1)
          }
          break
        case "ArrowRight":
          if (currentIndex < photos.length - 1) {
            onNavigate(currentIndex + 1)
          }
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentIndex, photos.length, onClose, onNavigate])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!currentPhoto) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Navigation buttons */}
          {currentIndex > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation()
                onNavigate(currentIndex - 1)
              }}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>
          )}

          {currentIndex < photos.length - 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation()
                onNavigate(currentIndex + 1)
              }}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          )}

          {/* Image container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={currentPhoto.image_url || "/placeholder.svg"}
                alt={currentPhoto.alt_text || currentPhoto.title || "Photography"}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </motion.div>

          {/* Photo info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="max-w-4xl mx-auto flex items-end justify-between">
              <div className="text-white">
                {currentPhoto.title && <h2 className="text-2xl font-bold mb-2">{currentPhoto.title}</h2>}
                {currentPhoto.description && <p className="text-gray-300 mb-2">{currentPhoto.description}</p>}
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>
                    {currentIndex + 1} of {photos.length}
                  </span>
                  {currentPhoto.category_name && (
                    <span className="px-2 py-1 bg-purple-600 text-white rounded-full text-xs">
                      {currentPhoto.category_name}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={() => {
                    // Share functionality
                    if (navigator.share) {
                      navigator.share({
                        title: currentPhoto.title || "Photography",
                        url: window.location.href,
                      })
                    }
                  }}
                >
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={() => {
                    // Download functionality
                    const link = document.createElement("a")
                    link.href = currentPhoto.image_url
                    link.download = currentPhoto.title || "photo"
                    link.click()
                  }}
                >
                  <Download className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
