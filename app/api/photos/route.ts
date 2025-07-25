import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

// GET - Get all photos or photos by category
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const query: any = categoryId ? { category_id: categoryId } : {};
    const photos = await db.collection('photos').find(query).sort({ display_order: 1 }).toArray();
    // Optionally join category names if you want
    return NextResponse.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}

// POST - Create a new photo
  try {
    const photoData = await request.json();
    // Verify admin authentication if needed
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    const { db } = await connectToDatabase();
    // Add created_at, updated_at, and a unique id
    const now = new Date().toISOString();
    const newPhoto = {
      ...photoData,
      created_at: now,
      updated_at: now,
    };
    const result = await db.collection('photos').insertOne(newPhoto);
    return NextResponse.json({ ...newPhoto, _id: result.insertedId });
  } catch (error) {
    console.error('Error creating photo:', error);
    return NextResponse.json(
      { error: 'Failed to create photo' },
      { status: 500 }
    );
  }
}

// PUT - Update a photo
  try {
    const { id, ...updates } = await request.json();
    // Verify admin authentication if needed
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    const { db } = await connectToDatabase();
    const now = new Date().toISOString();
    const result = await db.collection('photos').findOneAndUpdate(
      { _id: id },
      { $set: { ...updates, updated_at: now } },
      { returnDocument: 'after' }
    );
    if (!result.value) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(result.value);
  } catch (error) {
    console.error('Error updating photo:', error);
    return NextResponse.json(
      { error: 'Failed to update photo' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a photo
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { error: 'Photo ID is required' },
        { status: 400 }
      );
    }
    // Verify admin authentication if needed
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    const { db } = await connectToDatabase();
    const result = await db.collection('photos').deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting photo:', error);
    return NextResponse.json(
      { error: 'Failed to delete photo' },
      { status: 500 }
    );
  }
}
