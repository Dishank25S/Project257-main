// Simple in-memory data store for Vercel
// This will work with serverless functions and persist during the function lifetime

import { 
  STATIC_CATEGORIES, 
  STATIC_PHOTOS, 
  STATIC_VIDEOS, 
  STATIC_CONTACT,
  type Category,
  type Photo,
  type Video,
  type ContactInfo
} from './staticData'

// In-memory storage (will reset on each deployment but works for serverless functions)
let memoryDB = {
  categories: [...STATIC_CATEGORIES],
  photos: [...STATIC_PHOTOS],
  videos: [...STATIC_VIDEOS],
  contact: { ...STATIC_CONTACT }
}

const generateId = () => Math.random().toString(36).substr(2, 9) + Date.now().toString(36)

// Vercel-compatible database
export const vercelDB = {
  // Categories
  categories: {
    getAll: (): Category[] => {
      return [...memoryDB.categories].sort((a, b) => a.display_order - b.display_order)
    },
    
    create: (category: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Category => {
      const newCategory: Category = {
        ...category,
        id: generateId(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      memoryDB.categories.push(newCategory)
      return newCategory
    },
    
    update: (id: string, updates: Partial<Category>): Category | null => {
      const index = memoryDB.categories.findIndex(c => c.id === id)
      if (index === -1) return null
      
      memoryDB.categories[index] = {
        ...memoryDB.categories[index],
        ...updates,
        updated_at: new Date().toISOString()
      }
      return memoryDB.categories[index]
    },
    
    delete: (id: string): boolean => {
      const originalLength = memoryDB.categories.length
      memoryDB.categories = memoryDB.categories.filter(c => c.id !== id)
      return memoryDB.categories.length < originalLength
    }
  },

  // Photos
  photos: {
    getAll: (categoryId?: string): Photo[] => {
      let photos = [...memoryDB.photos]
      if (categoryId) {
        photos = photos.filter(p => p.category_id === categoryId)
      }
      return photos.sort((a, b) => a.display_order - b.display_order)
    },
    
    getById: (id: string): Photo | null => {
      return memoryDB.photos.find(p => p.id === id) || null
    },
    
    create: (photo: Omit<Photo, 'id' | 'created_at' | 'updated_at'>): Photo => {
      const newPhoto: Photo = {
        ...photo,
        id: generateId(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      memoryDB.photos.push(newPhoto)
      return newPhoto
    },
    
    update: (id: string, updates: Partial<Photo>): Photo | null => {
      const index = memoryDB.photos.findIndex(p => p.id === id)
      if (index === -1) return null
      
      memoryDB.photos[index] = {
        ...memoryDB.photos[index],
        ...updates,
        updated_at: new Date().toISOString()
      }
      return memoryDB.photos[index]
    },
    
    delete: (id: string): boolean => {
      const originalLength = memoryDB.photos.length
      memoryDB.photos = memoryDB.photos.filter(p => p.id !== id)
      return memoryDB.photos.length < originalLength
    }
  },

  // Videos
  videos: {
    getAll: (categoryId?: string): Video[] => {
      let videos = [...memoryDB.videos]
      if (categoryId) {
        videos = videos.filter(v => v.category_id === categoryId)
      }
      return videos.sort((a, b) => a.display_order - b.display_order)
    },
    
    getById: (id: string): Video | null => {
      return memoryDB.videos.find(v => v.id === id) || null
    },
    
    create: (video: Omit<Video, 'id' | 'created_at' | 'updated_at'>): Video => {
      const newVideo: Video = {
        ...video,
        id: generateId(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      memoryDB.videos.push(newVideo)
      return newVideo
    },
    
    update: (id: string, updates: Partial<Video>): Video | null => {
      const index = memoryDB.videos.findIndex(v => v.id === id)
      if (index === -1) return null
      
      memoryDB.videos[index] = {
        ...memoryDB.videos[index],
        ...updates,
        updated_at: new Date().toISOString()
      }
      return memoryDB.videos[index]
    },
    
    delete: (id: string): boolean => {
      const originalLength = memoryDB.videos.length
      memoryDB.videos = memoryDB.videos.filter(v => v.id !== id)
      return memoryDB.videos.length < originalLength
    }
  },

  // Contact Info
  contact: {
    get: (): ContactInfo => {
      return { ...memoryDB.contact }
    },
    
    update: (updates: Partial<ContactInfo>): ContactInfo => {
      memoryDB.contact = {
        ...memoryDB.contact,
        ...updates,
        updated_at: new Date().toISOString()
      }
      return { ...memoryDB.contact }
    }
  },

  // Admin
  admin: {
    verifyPassword: (password: string): boolean => {
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
      return password === adminPassword
    }
  },

  // Utility to reset data
  reset: () => {
    memoryDB = {
      categories: [...STATIC_CATEGORIES],
      photos: [...STATIC_PHOTOS],
      videos: [...STATIC_VIDEOS],
      contact: { ...STATIC_CONTACT }
    }
  }
}
