"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trash2, AlertTriangle, RefreshCw, ImageIcon, PlayCircle, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { usePhotos, usePhotoMutations } from "@/hooks/usePhotos"
import { useVideos, useVideoMutations } from "@/hooks/useVideos"
import { useCategories } from "@/hooks/useCategories"
import { useQueryClient } from "@tanstack/react-query"

export function DefaultContentManager() {
  const [isDeleting, setIsDeleting] = useState(false)
  const [deletionStep, setDeletionStep] = useState("")

  const { data: photos } = usePhotos()
  const { data: videos } = useVideos()
  const { data: categories } = useCategories()
  const { deletePhoto } = usePhotoMutations()
  const { deleteVideo } = useVideoMutations()
  const queryClient = useQueryClient()

  // Identify default/static content (content with IDs starting with 'static-')
  const defaultPhotos = photos?.filter(photo => photo.id.startsWith('static-')) || []
  const defaultVideos = videos?.filter(video => video.id.startsWith('static-')) || []
  const totalDefaultItems = defaultPhotos.length + defaultVideos.length

  const handleDeleteAllDefault = async () => {
    const confirmed = confirm(
      `⚠️ DANGER ZONE ⚠️\n\n` +
      `This will permanently delete:\n` +
      `• ${defaultPhotos.length} default photos\n` +
      `• ${defaultVideos.length} default videos\n\n` +
      `This action cannot be undone!\n\n` +
      `Are you absolutely sure you want to proceed?`
    )

    if (!confirmed) return

    // Double confirmation for safety
    const doubleConfirm = confirm(
      "🚨 FINAL WARNING 🚨\n\n" +
      "You are about to delete all default sample content.\n" +
      "This will leave your website with only your custom uploaded content.\n\n" +
      "Click OK only if you are 100% certain!"
    )

    if (!doubleConfirm) return

    setIsDeleting(true)
    
    try {
      // Delete default photos
      if (defaultPhotos.length > 0) {
        setDeletionStep(`Deleting ${defaultPhotos.length} default photos...`)
        for (const photo of defaultPhotos) {
          await deletePhoto.mutateAsync(photo.id)
        }
      }

      // Delete default videos
      if (defaultVideos.length > 0) {
        setDeletionStep(`Deleting ${defaultVideos.length} default videos...`)
        for (const video of defaultVideos) {
          await deleteVideo.mutateAsync(video.id)
        }
      }

      setDeletionStep("Refreshing content...")
      
      // Refresh all queries
      await queryClient.invalidateQueries()
      
      alert("✅ All default content has been successfully deleted!")
      setDeletionStep("")
      
    } catch (error) {
      console.error("Error deleting default content:", error)
      alert("❌ Failed to delete some content. Please try again or delete items individually.")
      setDeletionStep("")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteDefaultPhotos = async () => {
    if (defaultPhotos.length === 0) return

    const confirmed = confirm(
      `Delete all ${defaultPhotos.length} default photos?\n\n` +
      "This will keep your custom uploaded photos but remove all sample photos.\n" +
      "This action cannot be undone!"
    )

    if (!confirmed) return

    setIsDeleting(true)
    setDeletionStep(`Deleting ${defaultPhotos.length} default photos...`)
    
    try {
      for (const photo of defaultPhotos) {
        await deletePhoto.mutateAsync(photo.id)
      }
      
      await queryClient.invalidateQueries({ queryKey: ["photos"] })
      alert("✅ All default photos have been deleted!")
      setDeletionStep("")
    } catch (error) {
      console.error("Error deleting default photos:", error)
      alert("❌ Failed to delete some photos. Please try again.")
      setDeletionStep("")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteDefaultVideos = async () => {
    if (defaultVideos.length === 0) return

    const confirmed = confirm(
      `Delete all ${defaultVideos.length} default videos?\n\n` +
      "This will keep your custom uploaded videos but remove all sample videos.\n" +
      "This action cannot be undone!"
    )

    if (!confirmed) return

    setIsDeleting(true)
    setDeletionStep(`Deleting ${defaultVideos.length} default videos...`)
    
    try {
      for (const video of defaultVideos) {
        await deleteVideo.mutateAsync(video.id)
      }
      
      await queryClient.invalidateQueries({ queryKey: ["videos"] })
      alert("✅ All default videos have been deleted!")
      setDeletionStep("")
    } catch (error) {
      console.error("Error deleting default videos:", error)
      alert("❌ Failed to delete some videos. Please try again.")
      setDeletionStep("")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Default Content Manager</h2>
          <p className="text-muted-foreground mt-1">
            Manage and remove default sample content from your website
          </p>
        </div>
      </div>

      {/* Warning Alert */}
      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertTitle className="text-yellow-800">Important Notice</AlertTitle>
        <AlertDescription className="text-yellow-700">
          This section allows you to remove the default sample content that comes with the website. 
          Only delete default content if you have uploaded your own photos and videos to replace them.
        </AlertDescription>
      </Alert>

      {/* Content Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Default Photos</CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{defaultPhotos.length}</div>
              <p className="text-xs text-muted-foreground">Sample photos</p>
              {defaultPhotos.length > 0 && (
                <Badge variant="secondary" className="mt-2">
                  Ready for deletion
                </Badge>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Default Videos</CardTitle>
              <PlayCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{defaultVideos.length}</div>
              <p className="text-xs text-muted-foreground">Sample videos</p>
              {defaultVideos.length > 0 && (
                <Badge variant="secondary" className="mt-2">
                  Ready for deletion
                </Badge>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDefaultItems}</div>
              <p className="text-xs text-muted-foreground">Default items</p>
              {totalDefaultItems === 0 && (
                <Badge variant="outline" className="mt-2 text-green-600 border-green-600">
                  All clean!
                </Badge>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Action Buttons */}
      {totalDefaultItems > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-500" />
              Deletion Actions
            </CardTitle>
            <CardDescription>
              Choose what default content to remove from your website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isDeleting && (
              <Alert className="border-blue-200 bg-blue-50">
                <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
                <AlertTitle className="text-blue-800">Processing...</AlertTitle>
                <AlertDescription className="text-blue-700">
                  {deletionStep || "Working..."}
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="destructive"
                onClick={handleDeleteDefaultPhotos}
                disabled={isDeleting || defaultPhotos.length === 0}
                className="w-full"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Delete Default Photos ({defaultPhotos.length})
              </Button>

              <Button
                variant="destructive"
                onClick={handleDeleteDefaultVideos}
                disabled={isDeleting || defaultVideos.length === 0}
                className="w-full"
              >
                <PlayCircle className="h-4 w-4 mr-2" />
                Delete Default Videos ({defaultVideos.length})
              </Button>

              <Button
                variant="destructive"
                onClick={handleDeleteAllDefault}
                disabled={isDeleting || totalDefaultItems === 0}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete All Default ({totalDefaultItems})
              </Button>
            </div>

            <Separator />

            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>What gets deleted:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>All sample/placeholder photos and videos</li>
                <li>Content with IDs starting with "static-"</li>
                <li>Default featured content from home page</li>
              </ul>
              <p><strong>What stays:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Your custom uploaded photos and videos</li>
                <li>Categories and settings</li>
                <li>Contact information</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {totalDefaultItems === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Database className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800">All Clean!</h3>
                <p className="text-muted-foreground">
                  No default sample content found. Your website only contains your custom content.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
