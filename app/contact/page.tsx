"use client"

import { motion } from "framer-motion"
import { Phone, MapPin, Mail, MessageCircle, Instagram, Facebook, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layout/Header"
import { useContactInfo } from "@/hooks/useContactInfo"

export default function ContactPage() {
  const { data: contactInfo } = useContactInfo()

  const handleWhatsAppClick = () => {
    const phone = contactInfo?.phone || "+919665984974"
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, "")}`
    window.open(whatsappUrl, "_blank")
  }

  const handleCallClick = () => {
    const phone = contactInfo?.phone || "+919665984974"
    window.location.href = `tel:${phone}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-20">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get In Touch</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Ready to capture your special moments? Let's discuss your photography needs and create something
                beautiful together.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Contact Information</CardTitle>
                    <CardDescription>Reach out to us through any of these channels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Phone</h3>
                        <p className="text-gray-600">{contactInfo?.phone || "+91 9665984974"}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Location</h3>
                        <p className="text-gray-600">{contactInfo?.location || "Swargate, Pune"}</p>
                      </div>
                    </div>

                    {contactInfo?.email && (
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Email</h3>
                          <p className="text-gray-600">{contactInfo.email}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Working Hours</h3>
                        <p className="text-gray-600">Mon - Sun: 9:00 AM - 8:00 PM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Contact</CardTitle>
                    <CardDescription>Get in touch instantly</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button onClick={handleCallClick} className="w-full bg-gray-900 hover:bg-gray-800" size="lg">
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </Button>
                    <Button onClick={handleWhatsAppClick} className="w-full bg-green-600 hover:bg-green-700" size="lg">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp
                    </Button>
                  </CardContent>
                </Card>

                {/* Social Media */}
                {(contactInfo?.instagram_url || contactInfo?.facebook_url) && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Follow Us</CardTitle>
                      <CardDescription>Stay updated with our latest work</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-4">
                        {contactInfo?.instagram_url && (
                          <a
                            href={contactInfo.instagram_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white hover:opacity-80 transition-opacity"
                          >
                            <Instagram className="w-6 h-6" />
                          </a>
                        )}
                        {contactInfo?.facebook_url && (
                          <a
                            href={contactInfo.facebook_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg text-white hover:opacity-80 transition-opacity"
                          >
                            <Facebook className="w-6 h-6" />
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>

              {/* Services Overview */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-2xl">Our Services</CardTitle>
                    <CardDescription>Professional photography services we offer</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Pre-Wedding</h3>
                        <p className="text-sm text-gray-600">Romantic pre-wedding photography sessions</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Maternity</h3>
                        <p className="text-sm text-gray-600">Beautiful maternity photography</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Baby Shoot</h3>
                        <p className="text-sm text-gray-600">Adorable newborn and baby photography</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Product</h3>
                        <p className="text-sm text-gray-600">Professional product photography</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Wedding</h3>
                        <p className="text-sm text-gray-600">Complete wedding photography coverage</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Model Shoot</h3>
                        <p className="text-sm text-gray-600">Professional model photography</p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-3">Why Choose Us?</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• 8+ years of professional experience</li>
                        <li>• 500+ satisfied clients</li>
                        <li>• High-quality equipment and editing</li>
                        <li>• Flexible scheduling and locations</li>
                        <li>• Competitive pricing packages</li>
                        <li>• Quick turnaround time</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
