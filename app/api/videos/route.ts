import { NextRequest, NextResponse } from 'next/server'
import { vercelDB } from '@/lib/vercelDB'

// GET - Get all videos or videos by category
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    
    const videos = vercelDB.videos.getAll(categoryId || undefined)
    const categories = vercelDB.categories.getAll()
    
    const result = videos
      .sort((a, b) => a.display_order - b.display_order)
      .map((video) => ({
        ...video,
        category_name: categories.find(c => c.id === video.category_id)?.name || 'Uncategorized',
      }))
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching videos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    )
  }
}

// POST - Create a new video
export async function POST(request: NextRequest) {
  try {
    const videoData = await request.json()
    
    // Verify admin authentication if needed
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const newVideo = vercelDB.videos.create(videoData)
    return NextResponse.json(newVideo)
  } catch (error) {
    console.error('Error creating video:', error)
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    )
  }
}

// PUT - Update a video
export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json()
    
    // Verify admin authentication if needed
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const updated = vercelDB.videos.update(id, updates)
    if (!updated) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating video:', error)
    return NextResponse.json(
      { error: 'Failed to update video' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a video
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Video ID is required' },
        { status: 400 }
      )
    }
    
    // Verify admin authentication if needed
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const success = vercelDB.videos.delete(id)
    if (!success) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting video:', error)
    return NextResponse.json(
      { error: 'Failed to delete video' },
      { status: 500 }
    )
  }
}
