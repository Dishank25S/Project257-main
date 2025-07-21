import { NextRequest, NextResponse } from 'next/server'
import { vercelDB } from '@/lib/vercelDB'

// GET - Get all photos or photos by category
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    
    const photos = vercelDB.photos.getAll(categoryId || undefined)
    const categories = vercelDB.categories.getAll()
    
    const result = photos
      .sort((a, b) => a.display_order - b.display_order)
      .map((photo) => ({
        ...photo,
        category_name: categories.find(c => c.id === photo.category_id)?.name || 'Uncategorized',
      }))
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching photos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    )
  }
}

// POST - Create a new photo
export async function POST(request: NextRequest) {
  try {
    const photoData = await request.json()
    
    // Verify admin authentication if needed
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const newPhoto = vercelDB.photos.create(photoData)
    return NextResponse.json(newPhoto)
  } catch (error) {
    console.error('Error creating photo:', error)
    return NextResponse.json(
      { error: 'Failed to create photo' },
      { status: 500 }
    )
  }
}

// PUT - Update a photo
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
    
    const updated = vercelDB.photos.update(id, updates)
    if (!updated) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating photo:', error)
    return NextResponse.json(
      { error: 'Failed to update photo' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a photo
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Photo ID is required' },
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
    
    const success = vercelDB.photos.delete(id)
    if (!success) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting photo:', error)
    return NextResponse.json(
      { error: 'Failed to delete photo' },
      { status: 500 }
    )
  }
}
