"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Award, Users, Camera, MapPin, Heart, Star } from "lucide-react"
import { Header } from "@/components/layout/Header"
import { useContactInfo } from "@/hooks/useContactInfo"

export default function AboutPage() {
  const { data: contactInfo } = useContactInfo()

  const stats = [
    { icon: Camera, label: "Years Experience", value: "8+" },
    { icon: Users, label: "Happy Clients", value: "500+" },
    { icon: Award, label: "Projects Completed", value: "1000+" },
    { icon: MapPin, label: "Locations Covered", value: "50+" },
  ]

  const values = [
    {
      icon: Heart,
      title: "Passion for Photography",
      description: "Every shot is taken with genuine passion and dedication to capture the perfect moment.",
    },
    {
      icon: Star,
      title: "Quality Excellence",
      description: "We use professional equipment and techniques to ensure the highest quality results.",
    },
    {
      icon: Users,
      title: "Client-Focused",
      description: "Your vision and satisfaction are our top priorities in every project we undertake.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Us</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Passionate about capturing life's most beautiful moments through the art of photography
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Meet {contactInfo?.photographer_name || "Krishna Broker"}
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Based in {contactInfo?.location || "Swargate, Pune"}, I am a professional photographer with over 8
                  years of experience in capturing life's most precious moments. My journey in photography began with a
                  simple love for freezing beautiful moments in time.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  I specialize in pre-wedding, maternity, baby, product, and wedding photography. Each session is
                  approached with creativity, technical expertise, and a deep understanding of what makes each moment
                  special.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  My goal is not just to take photographs, but to tell stories, capture emotions, and create memories
                  that will be treasured for generations to come.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=600&width=480"
                    alt={`${contactInfo?.photographer_name || "Krishna Broker"} - Professional Photographer`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gray-900 rounded-full opacity-10" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gray-900 rounded-full opacity-5" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The principles that guide our work and define our commitment to excellence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">My Journey</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From passion to profession - the story of my photography career
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">The Beginning (2016)</h3>
                  <p className="text-gray-600">
                    Started my photography journey with a simple camera and a passion for capturing beautiful moments.
                    What began as a hobby quickly turned into a calling.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Growth (2018-2020)</h3>
                  <p className="text-gray-600">
                    Expanded into wedding and pre-wedding photography, building a reputation for quality and creativity.
                    Invested in professional equipment and continuous learning.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Specialization (2021-Present)</h3>
                  <p className="text-gray-600">
                    Specialized in maternity, baby, and product photography while continuing to excel in wedding
                    photography. Now serving 500+ happy clients across Pune and beyond.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
