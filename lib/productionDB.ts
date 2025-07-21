// Production-ready database that works on Vercel
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

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined'

// Check if we're in production (Vercel)
const isProduction = process.env.NODE_ENV === 'production'

// Local storage keys (only used in development)
const STORAGE_KEYS = {
  CATEGORIES: 'photography_categories',
  PHOTOS: 'photography_photos',
  VIDEOS: 'photography_videos',
  CONTACT: 'photography_contact',
  ADMIN_PASSWORD: 'admin_password'
} as const

// Utility functions for localStorage (development only)
const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (!isBrowser || isProduction) return defaultValue
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

const setToStorage = <T>(key: string, value: T): void => {
  if (!isBrowser || isProduction) return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Failed to save to localStorage:', error)
  }
}

const generateId = () => Math.random().toString(36).substr(2, 9)

// Initialize data only in development
const initializeData = () => {
  if (!isBrowser || isProduction) return
  
  // Initialize categories if not exists
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    setToStorage(STORAGE_KEYS.CATEGORIES, STATIC_CATEGORIES)
  }
  
  // Initialize contact info if not exists
  if (!localStorage.getItem(STORAGE_KEYS.CONTACT)) {
    setToStorage(STORAGE_KEYS.CONTACT, STATIC_CONTACT)
  }
  
  // Initialize sample photos if not exists or empty
  const existingPhotos = getFromStorage<Photo[]>(STORAGE_KEYS.PHOTOS, [])
  if (existingPhotos.length === 0) {
    setToStorage(STORAGE_KEYS.PHOTOS, STATIC_PHOTOS)
  }
  
  // Initialize sample videos if not exists or empty
  const existingVideos = getFromStorage<Video[]>(STORAGE_KEYS.VIDEOS, [])
  if (existingVideos.length === 0) {
    setToStorage(STORAGE_KEYS.VIDEOS, STATIC_VIDEOS)
  }
}

// Production-ready database
export const productionDB = {
  // Categories
  categories: {
    getAll: (): Category[] => {
      if (isProduction) {
        return STATIC_CATEGORIES
      }
      initializeData()
      return getFromStorage(STORAGE_KEYS.CATEGORIES, STATIC_CATEGORIES)
    },
    
    create: (category: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Category => {
      if (isProduction) {
        console.warn('Cannot create categories in production mode')
        return STATIC_CATEGORIES[0] // Return first category as fallback
      }
      
      const categories = productionDB.categories.getAll()
      const newCategory: Category = {
        ...category,
        id: generateId(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      categories.push(newCategory)
      setToStorage(STORAGE_KEYS.CATEGORIES, categories)
      return newCategory
    },
    
    update: (id: string, updates: Partial<Category>): Category | null => {
      if (isProduction) {
        console.warn('Cannot update categories in production mode')
        return null
      }
      
      const categories = productionDB.categories.getAll()
      const index = categories.findIndex(c => c.id === id)
      if (index === -1) return null
      
      categories[index] = {
        ...categories[index],
        ...updates,
        updated_at: new Date().toISOString()
      }
      setToStorage(STORAGE_KEYS.CATEGORIES, categories)
      return categories[index]
    },
    
    delete: (id: string): boolean => {
      if (isProduction) {
        console.warn('Cannot delete categories in production mode')
        return false
      }
      
      const categories = productionDB.categories.getAll()
      const filteredCategories = categories.filter(c => c.id !== id)
      if (filteredCategories.length === categories.length) return false
      
      setToStorage(STORAGE_KEYS.CATEGORIES, filteredCategories)
      return true
    }
  },

  // Photos
  photos: {
    getAll: (categoryId?: string): Photo[] => {
      let photos: Photo[]
      
      if (isProduction) {
        photos = STATIC_PHOTOS
      } else {
        initializeData()
        photos = getFromStorage<Photo[]>(STORAGE_KEYS.PHOTOS, STATIC_PHOTOS)
      }
      
      return categoryId ? photos.filter(p => p.category_id === categoryId) : photos
    },
    
    getById: (id: string): Photo | null => {
      const photos = productionDB.photos.getAll()
      return photos.find(p => p.id === id) || null
    },
    
    create: (photo: Omit<Photo, 'id' | 'created_at' | 'updated_at'>): Photo => {
      if (isProduction) {
        console.warn('Cannot create photos in production mode. Use a proper image hosting service.')
        return STATIC_PHOTOS[0] // Return first photo as fallback
      }
      
      const photos = productionDB.photos.getAll()
      const newPhoto: Photo = {
        ...photo,
        id: generateId(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      photos.push(newPhoto)
      setToStorage(STORAGE_KEYS.PHOTOS, photos)
      return newPhoto
    },
    
    update: (id: string, updates: Partial<Photo>): Photo | null => {
      if (isProduction) {
        console.warn('Cannot update photos in production mode')
        return null
      }
      
      const photos = productionDB.photos.getAll()
      const index = photos.findIndex(p => p.id === id)
      if (index === -1) return null
      
      photos[index] = {
        ...photos[index],
        ...updates,
        updated_at: new Date().toISOString()
      }
      setToStorage(STORAGE_KEYS.PHOTOS, photos)
      return photos[index]
    },
    
    delete: (id: string): boolean => {
      if (isProduction) {
        console.warn('Cannot delete photos in production mode')
        return false
      }
      
      const photos = productionDB.photos.getAll()
      const filteredPhotos = photos.filter(p => p.id !== id)
      if (filteredPhotos.length === photos.length) return false
      
      setToStorage(STORAGE_KEYS.PHOTOS, filteredPhotos)
      return true
    }
  },

  // Videos
  videos: {
    getAll: (categoryId?: string): Video[] => {
      let videos: Video[]
      
      if (isProduction) {
        videos = STATIC_VIDEOS
      } else {
        initializeData()
        videos = getFromStorage<Video[]>(STORAGE_KEYS.VIDEOS, STATIC_VIDEOS)
      }
      
      return categoryId ? videos.filter(v => v.category_id === categoryId) : videos
    },
    
    getById: (id: string): Video | null => {
      const videos = productionDB.videos.getAll()
      return videos.find(v => v.id === id) || null
    },
    
    create: (video: Omit<Video, 'id' | 'created_at' | 'updated_at'>): Video => {
      if (isProduction) {
        console.warn('Cannot create videos in production mode')
        return STATIC_VIDEOS[0] // Return first video as fallback
      }
      
      const videos = productionDB.videos.getAll()
      const newVideo: Video = {
        ...video,
        id: generateId(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      videos.push(newVideo)
      setToStorage(STORAGE_KEYS.VIDEOS, videos)
      return newVideo
    },
    
    update: (id: string, updates: Partial<Video>): Video | null => {
      if (isProduction) {
        console.warn('Cannot update videos in production mode')
        return null
      }
      
      const videos = productionDB.videos.getAll()
      const index = videos.findIndex(v => v.id === id)
      if (index === -1) return null
      
      videos[index] = {
        ...videos[index],
        ...updates,
        updated_at: new Date().toISOString()
      }
      setToStorage(STORAGE_KEYS.VIDEOS, videos)
      return videos[index]
    },
    
    delete: (id: string): boolean => {
      if (isProduction) {
        console.warn('Cannot delete videos in production mode')
        return false
      }
      
      const videos = productionDB.videos.getAll()
      const filteredVideos = videos.filter(v => v.id !== id)
      if (filteredVideos.length === videos.length) return false
      
      setToStorage(STORAGE_KEYS.VIDEOS, filteredVideos)
      return true
    }
  },

  // Contact Info
  contact: {
    get: (): ContactInfo => {
      if (isProduction) {
        return STATIC_CONTACT
      }
      initializeData()
      return getFromStorage(STORAGE_KEYS.CONTACT, STATIC_CONTACT)
    },
    
    update: (updates: Partial<ContactInfo>): ContactInfo => {
      if (isProduction) {
        console.warn('Cannot update contact info in production mode')
        return STATIC_CONTACT
      }
      
      const current = productionDB.contact.get()
      const updated = {
        ...current,
        ...updates,
        updated_at: new Date().toISOString()
      }
      setToStorage(STORAGE_KEYS.CONTACT, updated)
      return updated
    }
  },

  // Admin
  admin: {
    setPassword: (password: string): void => {
      if (isProduction) {
        console.warn('Cannot set password in production mode')
        return
      }
      setToStorage(STORAGE_KEYS.ADMIN_PASSWORD, password)
    },
    
    verifyPassword: (password: string): boolean => {
      if (isProduction) {
        // Use environment variable for production password
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
        console.log('Production mode - checking password against env var')
        return password === adminPassword
      }
      const stored = getFromStorage(STORAGE_KEYS.ADMIN_PASSWORD, 'admin123')
      return stored === password
    },
    
    hasPassword: (): boolean => {
      if (isProduction) return true
      return !!getFromStorage(STORAGE_KEYS.ADMIN_PASSWORD, null)
    }
  },
  
  // Utility function to reset all data to defaults (development only)
  resetToDefaults: () => {
    if (isProduction) {
      console.warn('Cannot reset data in production mode')
      return
    }
    
    if (!isBrowser) return
    
    setToStorage(STORAGE_KEYS.CATEGORIES, STATIC_CATEGORIES)
    setToStorage(STORAGE_KEYS.PHOTOS, STATIC_PHOTOS)
    setToStorage(STORAGE_KEYS.VIDEOS, STATIC_VIDEOS)
    setToStorage(STORAGE_KEYS.CONTACT, STATIC_CONTACT)
    
    console.log('Database reset to default sample data')
  }
}

// Initialize data on import (development only)
if (isBrowser && !isProduction) {
  initializeData()
}
