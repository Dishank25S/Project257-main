"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { useCategories } from "@/hooks/useCategories"

interface CategoryFilterProps {
  selectedCategory: string | null
  onCategoryChange: (categoryId: string | null) => void
  initialCategory?: string | null
}

export function CategoryFilter({ selectedCategory, onCategoryChange, initialCategory }: CategoryFilterProps) {
  const { data: categories, isLoading } = useCategories()

  // Set initial category if provided
  useEffect(() => {
    if (initialCategory && categories) {
      const category = categories.find((cat) => cat.id === initialCategory)
      if (category && selectedCategory !== initialCategory) {
        onCategoryChange(initialCategory)
      }
    }
  }, [initialCategory, categories, selectedCategory, onCategoryChange])

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onCategoryChange(null)}
        className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
          selectedCategory === null
            ? "bg-purple-600 text-white shadow-lg"
            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
        }`}
      >
        All Work
        <Badge variant="secondary" className="ml-2">
          {categories?.reduce((sum, cat) => sum + (cat.photo_count || 0), 0) || 0}
        </Badge>
      </motion.button>

      {categories?.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.id)}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
            selectedCategory === category.id
              ? "bg-purple-600 text-white shadow-lg"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          {category.name}
          <Badge variant="secondary" className="ml-2">
            {category.photo_count || 0}
          </Badge>
        </motion.button>
      ))}
    </div>
  )
}
