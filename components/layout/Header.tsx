"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone, Instagram, Facebook, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useContactInfo } from "@/hooks/useContactInfo"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: contactInfo } = useContactInfo()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ]

  const handleContactClick = () => {
    const phone = contactInfo?.phone || "+919665984974"
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, "")}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10">
              <Image
                src="/images/sharp-cinematic-logo.png"
                alt="Sharp Cinematic Logo"
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Sharp Cinematic</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm lg:text-base text-gray-700 hover:text-gray-900 font-medium transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Contact Info & Social - Desktop */}
          <div className="hidden xl:flex items-center space-x-4">
            <Button onClick={handleContactClick} className="bg-gray-900 hover:bg-gray-800 text-white" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              <span className="hidden 2xl:inline">{contactInfo?.phone || "+91 9665984974"}</span>
              <span className="2xl:hidden">Call</span>
            </Button>
            <div className="flex items-center space-x-2">
              {contactInfo?.instagram_url && (
                <a
                  href={contactInfo.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {contactInfo?.facebook_url && (
                <a
                  href={contactInfo.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {contactInfo?.whatsapp_url && (
                <a
                  href={contactInfo.whatsapp_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Contact Button - Tablet */}
          <div className="hidden md:flex xl:hidden">
            <Button onClick={handleContactClick} className="bg-gray-900 hover:bg-gray-800 text-white" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="px-4 py-4 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 hover:text-gray-900 font-medium py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-100 space-y-4">
                <Button
                  onClick={() => {
                    handleContactClick()
                    setIsMenuOpen(false)
                  }}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                  size="sm"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {contactInfo?.phone || "+91 9665984974"}
                </Button>

                {/* Social Links - Mobile */}
                {(contactInfo?.instagram_url || contactInfo?.facebook_url || contactInfo?.whatsapp_url) && (
                  <div className="flex items-center justify-center space-x-4 pt-2">
                    {contactInfo?.instagram_url && (
                      <a
                        href={contactInfo.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition-colors p-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Instagram className="w-6 h-6" />
                      </a>
                    )}
                    {contactInfo?.facebook_url && (
                      <a
                        href={contactInfo.facebook_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition-colors p-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Facebook className="w-6 h-6" />
                      </a>
                    )}
                    {contactInfo?.whatsapp_url && (
                      <a
                        href={contactInfo.whatsapp_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition-colors p-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <MessageCircle className="w-6 h-6" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
