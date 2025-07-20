"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePhotos } from "@/hooks/usePhotos"
import { useHomeFeaturedVideos } from "@/hooks/useVideos"
import { useContactInfo } from "@/hooks/useContactInfo"

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { data: heroPhotos } = usePhotos()
  const { data: heroVideos } = useHomeFeaturedVideos("hero")
  const { data: contactInfo } = useContactInfo()

  // Combine photos and videos for hero carousel
  const heroContent = [
    ...(heroPhotos?.filter((photo) => photo.is_featured || photo.is_home_featured).slice(0, 5) || []),
    ...(heroVideos?.slice(0, 2) || []),
  ]

  useEffect(() => {
    if (heroContent.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % heroContent.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [heroContent.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % heroContent.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + heroContent.length) % heroContent.length)
  }

  const handleContactClick = () => {
    const phone = contactInfo?.phone || "+919665984974"
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, "")}`
    window.open(whatsappUrl, "_blank")
  }

  if (!heroContent.length) {
    return (
      <section className="relative h-screen overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&h=1080&fit=crop&crop=center"
          alt="Professional photography equipment - Sharp Cinematic"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6"
            >
              Sharp Cinematic
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl mb-2 sm:mb-4 font-light"
            >
              Creative Visual Storytelling
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-200 px-4"
            >
              Capturing Life's Beautiful Moments with Cinematic Excellence
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
            >
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 w-full sm:w-auto" asChild>
                <Link href="/portfolio">View Portfolio</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent w-full sm:w-auto"
                onClick={handleContactClick}
              >
                Contact Now
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  const currentItem = heroContent[currentIndex]
  const isVideo = "youtube_id" in currentItem

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {isVideo ? (
            <div className="relative w-full h-full bg-gray-900 flex items-center justify-center">
              <Image
                src={
                  currentItem.custom_thumbnail_url ||
                  `https://img.youtube.com/vi/${currentItem.youtube_id || "/placeholder.svg"}/maxresdefault.jpg`
                }
                alt={currentItem.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40" />
              <Button
                size="lg"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30"
                onClick={() => window.open(currentItem.youtube_url, "_blank")}
              >
                <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </Button>
            </div>
          ) : (
            <Image
              src={currentItem.url || "/placeholder.svg"}
              alt={currentItem.alt_text || currentItem.title || "Photography"}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6"
          >
            Sharp Cinematic
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl mb-2 sm:mb-4 font-light"
          >
            Creative Visual Storytelling
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-200 px-4"
          >
            Capturing Life's Beautiful Moments with Cinematic Excellence
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
          >
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 w-full sm:w-auto" asChild>
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent w-full sm:w-auto"
              onClick={handleContactClick}
            >
              Contact Now
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      {heroContent.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-20"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-20"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </Button>

          {/* Dots */}
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {heroContent.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
