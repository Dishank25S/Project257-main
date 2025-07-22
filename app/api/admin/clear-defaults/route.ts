import { NextRequest, NextResponse } from 'next/server'
import { vercelDB } from '@/lib/vercelDB'

// DELETE - Clear all default content
export async function DELETE(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const result = vercelDB.admin.clearDefaultContent()
    
    return NextResponse.json({
      success: true,
      message: `Deleted ${result.deletedPhotos} photos and ${result.deletedVideos} videos`,
      deletedPhotos: result.deletedPhotos,
      deletedVideos: result.deletedVideos
    })
  } catch (error) {
    console.error('Error clearing default content:', error)
    return NextResponse.json(
      { error: 'Failed to clear default content' },
      { status: 500 }
    )
  }
}

// POST - Clear default photos only
export async function POST(request: NextRequest) {
  try {
    const { type } = await request.json()
    
    // Verify admin authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (type === 'photos') {
      const originalCount = vercelDB.photos.getAll().length
      const photos = vercelDB.photos.getAll()
      
      // Delete all photos with static- IDs
      let deletedCount = 0
      for (const photo of photos) {
        if (photo.id.startsWith('static-')) {
          vercelDB.photos.delete(photo.id)
          deletedCount++
        }
      }
      
      return NextResponse.json({
        success: true,
        message: `Deleted ${deletedCount} default photos`,
        deletedCount
      })
    } else if (type === 'videos') {
      const videos = vercelDB.videos.getAll()
      
      // Delete all videos with static- IDs
      let deletedCount = 0
      for (const video of videos) {
        if (video.id.startsWith('static-')) {
          vercelDB.videos.delete(video.id)
          deletedCount++
        }
      }
      
      return NextResponse.json({
        success: true,
        message: `Deleted ${deletedCount} default videos`,
        deletedCount
      })
    } else {
      return NextResponse.json(
        { error: 'Invalid type. Use "photos" or "videos"' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error clearing default content:', error)
    return NextResponse.json(
      { error: 'Failed to clear default content' },
      { status: 500 }
    )
  }
}
