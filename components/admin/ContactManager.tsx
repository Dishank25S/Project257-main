"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useContactInfo, useContactInfoMutations } from "@/hooks/useContactInfo"
import { toast } from "sonner"

export function ContactManager() {
  const { data: contactInfo } = useContactInfo()
  const { updateContactInfo } = useContactInfoMutations()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    photographer_name: contactInfo?.photographer_name || "",
    phone: contactInfo?.phone || "",
    email: contactInfo?.email || "",
    location: contactInfo?.location || "",
    instagram_url: contactInfo?.instagram_url || "",
    facebook_url: contactInfo?.facebook_url || "",
    whatsapp_url: contactInfo?.whatsapp_url || "",
  })

  // Update form data when contactInfo loads
  useEffect(() => {
    if (contactInfo) {
      setFormData({
        photographer_name: contactInfo.photographer_name,
        phone: contactInfo.phone,
        email: contactInfo.email || "",
        location: contactInfo.location,
        instagram_url: contactInfo.instagram_url || "",
        facebook_url: contactInfo.facebook_url || "",
        whatsapp_url: contactInfo.whatsapp_url || "",
      })
    }
  }, [contactInfo])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await updateContactInfo.mutateAsync(formData)
      toast.success("Contact information updated successfully!")
    } catch (error) {
      toast.error("Failed to update contact information")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Contact Information</h2>
          <p className="text-muted-foreground">
            Manage your business contact details displayed on the website
          </p>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Basic Information
            </CardTitle>
            <CardDescription>
              Core business information displayed on your website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="photographer_name">Photographer Name</Label>
              <Input
                id="photographer_name"
                value={formData.photographer_name}
                onChange={(e) => handleInputChange("photographer_name", e.target.value)}
                placeholder="Your professional name"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+91 9665984974"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Swargate, Pune"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Instagram className="w-5 h-5" />
              Social Media Links
            </CardTitle>
            <CardDescription>
              Connect your social media accounts to your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="instagram_url" className="flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                Instagram URL
              </Label>
              <Input
                id="instagram_url"
                value={formData.instagram_url}
                onChange={(e) => handleInputChange("instagram_url", e.target.value)}
                placeholder="https://instagram.com/yourprofile"
              />
            </div>
            <div>
              <Label htmlFor="facebook_url" className="flex items-center gap-2">
                <Facebook className="w-4 h-4" />
                Facebook URL
              </Label>
              <Input
                id="facebook_url"
                value={formData.facebook_url}
                onChange={(e) => handleInputChange("facebook_url", e.target.value)}
                placeholder="https://facebook.com/yourpage"
              />
            </div>
            <div>
              <Label htmlFor="whatsapp_url" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                WhatsApp URL
              </Label>
              <Input
                id="whatsapp_url"
                value={formData.whatsapp_url}
                onChange={(e) => handleInputChange("whatsapp_url", e.target.value)}
                placeholder="https://wa.me/919665984974"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Contact Preview
          </CardTitle>
          <CardDescription>
            This is how your contact information will appear on the website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">{formData.photographer_name || "Photographer Name"}</h3>
            <div className="space-y-2">
              {formData.phone && (
                <p className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4" />
                  {formData.phone}
                </p>
              )}
              {formData.email && (
                <p className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  {formData.email}
                </p>
              )}
              {formData.location && (
                <p className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4" />
                  {formData.location}
                </p>
              )}
            </div>
            <div className="flex gap-3 mt-4">
              {formData.instagram_url && (
                <Instagram className="w-5 h-5 text-pink-600" />
              )}
              {formData.facebook_url && (
                <Facebook className="w-5 h-5 text-blue-600" />
              )}
              {formData.whatsapp_url && (
                <MessageCircle className="w-5 h-5 text-green-600" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
