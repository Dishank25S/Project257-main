"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Camera, Heart, Baby, Package, Users, Palette, Clock, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layout/Header"
import { useContactInfo } from "@/hooks/useContactInfo"

export default function ServicesPage() {
  const { data: contactInfo } = useContactInfo()

  const handleContactClick = () => {
    const phone = contactInfo?.phone || "+919665984974"
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, "")}`
    window.open(whatsappUrl, "_blank")
  }

  const services = [
    {
      icon: Heart,
      title: "Pre-Wedding Photography",
      description: "Romantic and creative pre-wedding shoots that capture your love story beautifully.",
      features: ["Multiple locations", "Outfit changes", "Professional editing", "High-resolution images"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      icon: Users,
      title: "Wedding Photography",
      description: "Complete wedding coverage from ceremonies to celebrations, capturing every precious moment.",
      features: ["Full day coverage", "Candid moments", "Traditional poses", "Same-day highlights"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      icon: Heart,
      title: "Maternity Photography",
      description: "Beautiful maternity sessions celebrating the miracle of new life and motherhood.",
      features: ["Studio & outdoor options", "Partner involvement", "Artistic poses", "Gentle lighting"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      icon: Baby,
      title: "Baby & Newborn Photography",
      description: "Adorable baby photography sessions capturing those precious early moments.",
      features: ["Safe posing", "Props included", "Family shots", "Milestone sessions"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      icon: Package,
      title: "Product Photography",
      description: "Professional product photography for businesses, e-commerce, and marketing needs.",
      features: ["White background", "Lifestyle shots", "Multiple angles", "Quick turnaround"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      icon: Palette,
      title: "Model & Fashion Photography",
      description: "Creative model and fashion photography for portfolios and commercial use.",
      features: ["Studio lighting", "Creative concepts", "Wardrobe styling", "Professional retouching"],
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  const features = [
    {
      icon: Camera,
      title: "Professional Equipment",
      description: "Latest cameras, lenses, and lighting equipment for the best results",
    },
    {
      icon: Clock,
      title: "Quick Turnaround",
      description: "Fast delivery of edited photos without compromising on quality",
    },
    {
      icon: Award,
      title: "8+ Years Experience",
      description: "Extensive experience across all photography genres",
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
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Professional photography services tailored to capture your most important moments with artistic
                excellence
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="relative aspect-video">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-4 left-4">
                        <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <service.icon className="w-6 h-6 text-gray-900" />
                        </div>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button onClick={handleContactClick} className="w-full bg-gray-900 hover:bg-gray-800">
                        Get Quote
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                What sets our photography services apart from the rest
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Capture Your Special Moments?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Contact us today to discuss your photography needs and let's create something beautiful together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleContactClick} size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                  Get Started Today
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
                >
                  View Portfolio
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
