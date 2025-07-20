"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { CategoryGallery } from "@/components/gallery/CategoryGallery"
import { motion } from "framer-motion"
import { useCategories } from "@/hooks/useCategories"

export default function PortfolioPage() {
  const searchParams = useSearchParams()
  const categorySlug = searchParams.get("category")
  const { data: categories } = useCategories()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    if (categorySlug && categories) {
      const category = categories.find((cat) => cat.slug === categorySlug)
      if (category) {
        setSelectedCategory(category.id)
      }
    }
  }, [categorySlug, categories])

  const selectedCategoryName = categories?.find((cat) => cat.id === selectedCategory)?.name

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {selectedCategoryName ? `${selectedCategoryName} Portfolio` : "Our Portfolio"}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {selectedCategoryName
                  ? `Explore our ${selectedCategoryName.toLowerCase()} photography collection`
                  : "Explore our collection of beautiful photography across different categories and styles"}
              </p>
            </motion.div>
          </div>
        </section>

        <CategoryGallery initialCategory={selectedCategory} />
      </main>
    </div>
  )
}
