"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { useCategories } from "@/hooks/useCategories"
import { usePhotos } from "@/hooks/usePhotos"

export function CategoryCards() {
  const router = useRouter()
  const { data: categories } = useCategories()
  const { data: allPhotos } = usePhotos()

  const getCategoryPhoto = (categoryId: string) => {
    const categoryPhotos = allPhotos?.filter((photo) => photo.category_id === categoryId && photo.is_active)
    return categoryPhotos?.[0] || null
  }

  const getCategoryPhotoCount = (categoryId: string) => {
    return allPhotos?.filter((photo) => photo.category_id === categoryId && photo.is_active).length || 0
  }

  const handleCategoryClick = (categorySlug: string) => {
    router.push(`/portfolio?category=${categorySlug}`)
  }

  if (!categories?.length) return null

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Our Services</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Specializing in capturing life's most precious moments across different photography styles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((category, index) => {
            const categoryPhoto = getCategoryPhoto(category.id)
            const photoCount = getCategoryPhotoCount(category.id)

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => handleCategoryClick(category.slug)}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl sm:rounded-2xl bg-gray-200 shadow-lg group-hover:shadow-xl transition-all duration-500">
                  {categoryPhoto ? (
                    <Image
                      src={categoryPhoto.image_url || "/placeholder.svg"}
                      alt={categoryPhoto.alt_text || category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-sm sm:text-lg">No photos yet</span>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-1 sm:mb-2">{category.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-200 mb-2 sm:mb-3 line-clamp-2">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm">{photoCount} photos</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>

                  {/* Photo count badge */}
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/50 backdrop-blur-sm text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
                    {photoCount}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
