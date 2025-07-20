"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Camera, FolderOpen, Upload, BarChart3, LogOut, Plus, Eye, Star, Play, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PhotoUpload } from "./PhotoUpload"
import { PhotoManager } from "./PhotoManager"
import { CategoryManager } from "./CategoryManager"
import { VideoUpload } from "./VideoUpload"
import { VideoManager } from "./VideoManager"
import { useAuth } from "@/hooks/useAuth"
import { useCategories } from "@/hooks/useCategories"
import { usePhotos } from "@/hooks/usePhotos"
import { useVideos } from "@/hooks/useVideos"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { logout, user } = useAuth()
  const { data: categories } = useCategories()
  const { data: allPhotos } = usePhotos()
  const { data: allVideos } = useVideos()

  const stats = {
    totalPhotos: allPhotos?.length || 0,
    totalVideos: allVideos?.length || 0,
    totalCategories: categories?.length || 0,
    featuredPhotos: allPhotos?.filter((photo) => photo.is_featured).length || 0,
    recentUploads:
      allPhotos?.filter((photo) => {
        const uploadDate = new Date(photo.created_at)
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return uploadDate > weekAgo
      }).length || 0,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Camera className="w-8 h-8 text-purple-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Sharp Cinematic Admin</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <Button variant="outline" size="sm" onClick={() => logout.mutate()} className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span className="hidden sm:inline">Photos</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              <span className="hidden sm:inline">Videos</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Categories</span>
            </TabsTrigger>
            <TabsTrigger value="upload-photos" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Upload Photos</span>
            </TabsTrigger>
            <TabsTrigger value="upload-videos" className="flex items-center gap-2">
              <Youtube className="w-4 h-4" />
              <span className="hidden sm:inline">Add Videos</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Photos</CardTitle>
                    <Camera className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalPhotos}</div>
                    <p className="text-xs text-muted-foreground">Across all categories</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
                    <Play className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalVideos}</div>
                    <p className="text-xs text-muted-foreground">YouTube videos</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Categories</CardTitle>
                    <FolderOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalCategories}</div>
                    <p className="text-xs text-muted-foreground">Active categories</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Featured Photos</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.featuredPhotos}</div>
                    <p className="text-xs text-muted-foreground">Highlighted photos</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Recent Uploads</CardTitle>
                    <Upload className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.recentUploads}</div>
                    <p className="text-xs text-muted-foreground">Last 7 days</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks to manage your portfolio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => setActiveTab("upload-photos")}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Upload New Photos
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => setActiveTab("upload-videos")}
                  >
                    <Youtube className="w-4 h-4 mr-2" />
                    Add YouTube Videos
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => setActiveTab("categories")}
                  >
                    <FolderOpen className="w-4 h-4 mr-2" />
                    Manage Categories
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => window.open("/", "_blank")}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Public Website
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Overview</CardTitle>
                  <CardDescription>Photos distribution across categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories?.slice(0, 6).map((category) => (
                      <div key={category.id} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm text-gray-500">{category.photo_count || 0} photos</span>
                      </div>
                    ))}
                    {categories && categories.length > 6 && (
                      <div className="text-center pt-2">
                        <Button variant="ghost" size="sm" onClick={() => setActiveTab("categories")}>
                          View All Categories
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="photos">
            <PhotoManager />
          </TabsContent>

          <TabsContent value="videos">
            <VideoManager />
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManager />
          </TabsContent>

          <TabsContent value="upload-photos">
            <PhotoUpload />
          </TabsContent>

          <TabsContent value="upload-videos">
            <VideoUpload />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
