"use client"

import { Header } from "@/components/layout/Header"
import { HeroSection } from "@/components/home/HeroSection"
import { CategoryCards } from "@/components/home/CategoryCards"
import { FeaturedGallery } from "@/components/home/FeaturedGallery"
import { AboutSection } from "@/components/home/AboutSection"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <HeroSection />
        <CategoryCards />
        <FeaturedGallery
          section="top"
          title="Featured Work"
          description="Discover our most celebrated photography and videography work"
        />
        <AboutSection />
        <FeaturedGallery
          section="bottom"
          title="Recent Projects"
          description="Our latest photography sessions and creative projects"
        />
      </main>
    </div>
  )
}
