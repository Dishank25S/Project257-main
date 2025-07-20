"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Upload, Star, Eye, EyeOff, Settings, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"

interface GalleryImage {
  id: string
  url: string
  alt: string
  featured: boolean
  visible: boolean
}

interface GallerySettings {
  scrollSpeed: number
  autoplay: boolean
}

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
  images: GalleryImage[]
  onUpdateImages: (images: GalleryImage[]) => void
  settings: GallerySettings
  onUpdateSettings: (settings: GallerySettings) => void
}

export function AdminPanel({ isOpen, onClose, images, onUpdateImages, settings, onUpdateSettings }: AdminPanelProps) {
  const [newImageUrl, setNewImageUrl] = useState("")
  const [newImageAlt, setNewImageAlt] = useState("")

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return

    const newImage: GalleryImage = {
      id: Date.now().toString(),
      url: newImageUrl.trim(),
      alt: newImageAlt.trim() || "Gallery image",
      featured: false,
      visible: true,
    }

    onUpdateImages([...images, newImage])
    setNewImageUrl("")
    setNewImageAlt("")
  }

  const handleToggleFeatured = (id: string) => {
    const updatedImages = images.map((img) => (img.id === id ? { ...img, featured: !img.featured } : img))
    onUpdateImages(updatedImages)
  }

  const handleToggleVisibility = (id: string) => {
    const updatedImages = images.map((img) => (img.id === id ? { ...img, visible: !img.visible } : img))
    onUpdateImages(updatedImages)
  }

  const handleDeleteImage = (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      const updatedImages = images.filter((img) => img.id !== id)
      onUpdateImages(updatedImages)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 h-full w-full max-w-4xl bg-gray-900 border-l border-gray-700 overflow-y-auto"
          >
            <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                  <p className="text-gray-400">Manage your cinema gallery</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              <Tabs defaultValue="images" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                  <TabsTrigger
                    value="images"
                    className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Images
                  </TabsTrigger>
                  <TabsTrigger
                    value="settings"
                    className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="images" className="space-y-6">
                  {/* Add New Image */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Upload className="w-5 h-5" />
                        Add New Image
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Add a new image to the scrolling gallery
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="imageUrl" className="text-gray-300">
                          Image URL
                        </Label>
                        <Input
                          id="imageUrl"
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="imageAlt" className="text-gray-300">
                          Alt Text
                        </Label>
                        <Input
                          id="imageAlt"
                          value={newImageAlt}
                          onChange={(e) => setNewImageAlt(e.target.value)}
                          placeholder="Description of the image"
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <Button
                        onClick={handleAddImage}
                        disabled={!newImageUrl.trim()}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
                      >
                        Add Image
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Image Gallery Management */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Gallery Images ({images.length})</CardTitle>
                      <CardDescription className="text-gray-400">
                        Manage visibility, featured status, and delete images
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {images.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                          <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No images in gallery yet</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {images.map((image) => (
                            <div key={image.id} className="bg-gray-700 rounded-lg p-4 space-y-3">
                              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-600">
                                <Image
                                  src={image.url || "/placeholder.svg"}
                                  alt={image.alt}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              </div>

                              <div className="space-y-2">
                                <p className="text-white text-sm font-medium truncate">{image.alt}</p>

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                      <Switch
                                        checked={image.visible}
                                        onCheckedChange={() => handleToggleVisibility(image.id)}
                                        className="data-[state=checked]:bg-yellow-500"
                                      />
                                      <span className="text-xs text-gray-400">
                                        {image.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                      </span>
                                    </div>

                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleToggleFeatured(image.id)}
                                      className={`p-1 ${
                                        image.featured
                                          ? "text-yellow-500 hover:text-yellow-400"
                                          : "text-gray-400 hover:text-yellow-500"
                                      }`}
                                    >
                                      <Star className={`w-4 h-4 ${image.featured ? "fill-current" : ""}`} />
                                    </Button>
                                  </div>

                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteImage(image.id)}
                                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Gallery Settings</CardTitle>
                      <CardDescription className="text-gray-400">
                        Configure how the background gallery behaves
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-gray-300">Auto-scroll</Label>
                          <Switch
                            checked={settings.autoplay}
                            onCheckedChange={(checked) => onUpdateSettings({ ...settings, autoplay: checked })}
                            className="data-[state=checked]:bg-yellow-500"
                          />
                        </div>
                        <p className="text-xs text-gray-500">Enable automatic scrolling of background images</p>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-gray-300">Scroll Speed: {settings.scrollSpeed}s</Label>
                        <Slider
                          value={[settings.scrollSpeed]}
                          onValueChange={([value]) => onUpdateSettings({ ...settings, scrollSpeed: value })}
                          min={10}
                          max={60}
                          step={5}
                          className="w-full"
                        />
                        <p className="text-xs text-gray-500">Time for one complete scroll cycle (10-60 seconds)</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
