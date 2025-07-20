"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { Photo } from "@/lib/supabase"

interface PhotoCardProps {
  photo: Photo & { category_name?: string }
  onClick: () => void
  index: number
}

export function PhotoCard({ photo, onClick, index }: PhotoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-md group-hover:shadow-xl transition-all duration-300">
        <Image
          src={photo.url || "/placeholder.svg"}
          alt={photo.alt_text || photo.title || "Photography"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          {photo.title && <h3 className="font-semibold text-lg mb-1">{photo.title}</h3>}
          {photo.description && <p className="text-sm text-gray-200 line-clamp-2">{photo.description}</p>}
          {photo.category_name && (
            <span className="inline-block mt-2 px-2 py-1 bg-purple-600 text-xs rounded-full">
              {photo.category_name}
            </span>
          )}
        </div>

        {/* Featured badge */}
        {photo.is_featured && (
          <div className="absolute top-3 right-3">
            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">Featured</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
