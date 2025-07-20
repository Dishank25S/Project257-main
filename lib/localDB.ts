// Local data manager to replace Supabase
export type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export type Photo = {
  id: string
  category_id: string | null
  title: string
  description: string | null
  url: string
  alt_text: string | null
  display_order: number
  is_featured: boolean
  is_home_featured: boolean
  home_display_section: string | null
  view_count: number
  created_at: string
  updated_at: string
}

export type Video = {
  id: string
  category_id: string | null
  title: string
  description: string | null
  youtube_url: string
  youtube_id: string
  custom_thumbnail_url: string | null
  duration: string | null
  display_order: number
  is_featured: boolean
  is_home_featured: boolean
  home_display_section: string | null
  view_count: number
  created_at: string
  updated_at: string
}

export type ContactInfo = {
  id: string
  photographer_name: string
  phone: string
  location: string
  email: string | null
  instagram_url: string | null
  facebook_url: string | null
  whatsapp_url: string | null
  updated_at: string
}

// Local storage keys
const STORAGE_KEYS = {
  CATEGORIES: 'photography_categories',
  PHOTOS: 'photography_photos',
  VIDEOS: 'photography_videos',
  CONTACT: 'photography_contact',
  ADMIN_PASSWORD: 'admin_password'
} as const

// Default data
const DEFAULT_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Portraits',
    slug: 'portraits',
    description: 'Professional portrait photography',
    display_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Weddings',
    slug: 'weddings',
    description: 'Beautiful wedding photography',
    display_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Events',
    slug: 'events',
    description: 'Event and celebration photography',
    display_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

const DEFAULT_CONTACT: ContactInfo = {
  id: '1',
  photographer_name: 'Krishna Broker',
  phone: '+91 9665984974',
  location: 'Swargate, Pune',
  email: 'krishna@example.com',
  instagram_url: null,
  facebook_url: null,
  whatsapp_url: null,
  updated_at: new Date().toISOString()
}

// Utility functions
const generateId = () => Math.random().toString(36).substr(2, 9)

const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

const setToStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Failed to save to localStorage:', error)
  }
}

// Initialize default data
const initializeData = () => {
  if (typeof window === 'undefined') return
  
  // Initialize categories if not exists
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    setToStorage(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES)
  }
  
  // Initialize contact info if not exists
  if (!localStorage.getItem(STORAGE_KEYS.CONTACT)) {
    setToStorage(STORAGE_KEYS.CONTACT, DEFAULT_CONTACT)
  }
  
  // Initialize empty arrays for photos and videos
  if (!localStorage.getItem(STORAGE_KEYS.PHOTOS)) {
    setToStorage(STORAGE_KEYS.PHOTOS, [])
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.VIDEOS)) {
    setToStorage(STORAGE_KEYS.VIDEOS, [])
  }
}

// API-like functions to replace Supabase calls
export const localDB = {
  // Categories
  categories: {
    getAll: (): Category[] => {
      initializeData()
      return getFromStorage(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES)
    },
    
    create: (category: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Category => {
      const categories = localDB.categories.getAll()
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
      const categories = localDB.categories.getAll()
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
      const categories = localDB.categories.getAll()
      const filteredCategories = categories.filter(c => c.id !== id)
      if (filteredCategories.length === categories.length) return false
      
      setToStorage(STORAGE_KEYS.CATEGORIES, filteredCategories)
      return true
    }
  },

  // Photos
  photos: {
    getAll: (categoryId?: string): Photo[] => {
      initializeData()
      const photos = getFromStorage<Photo[]>(STORAGE_KEYS.PHOTOS, [])
      return categoryId ? photos.filter(p => p.category_id === categoryId) : photos
    },
    
    getById: (id: string): Photo | null => {
      const photos = localDB.photos.getAll()
      return photos.find(p => p.id === id) || null
    },
    
    create: (photo: Omit<Photo, 'id' | 'created_at' | 'updated_at'>): Photo => {
      const photos = localDB.photos.getAll()
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
      const photos = localDB.photos.getAll()
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
      const photos = localDB.photos.getAll()
      const filteredPhotos = photos.filter(p => p.id !== id)
      if (filteredPhotos.length === photos.length) return false
      
      setToStorage(STORAGE_KEYS.PHOTOS, filteredPhotos)
      return true
    }
  },

  // Videos
  videos: {
    getAll: (categoryId?: string): Video[] => {
      initializeData()
      const videos = getFromStorage<Video[]>(STORAGE_KEYS.VIDEOS, [])
      return categoryId ? videos.filter(v => v.category_id === categoryId) : videos
    },
    
    create: (video: Omit<Video, 'id' | 'created_at' | 'updated_at'>): Video => {
      const videos = localDB.videos.getAll()
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
      const videos = localDB.videos.getAll()
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
      const videos = localDB.videos.getAll()
      const filteredVideos = videos.filter(v => v.id !== id)
      if (filteredVideos.length === videos.length) return false
      
      setToStorage(STORAGE_KEYS.VIDEOS, filteredVideos)
      return true
    }
  },

  // Contact Info
  contact: {
    get: (): ContactInfo => {
      initializeData()
      return getFromStorage(STORAGE_KEYS.CONTACT, DEFAULT_CONTACT)
    },
    
    update: (updates: Partial<ContactInfo>): ContactInfo => {
      const current = localDB.contact.get()
      const updated = {
        ...current,
        ...updates,
        updated_at: new Date().toISOString()
      }
      setToStorage(STORAGE_KEYS.CONTACT, updated)
      return updated
    }
  },

  // Admin authentication (simple password-based)
  auth: {
    setPassword: (password: string): void => {
      setToStorage(STORAGE_KEYS.ADMIN_PASSWORD, password)
    },
    
    checkPassword: (password: string): boolean => {
      const storedPassword = getFromStorage(STORAGE_KEYS.ADMIN_PASSWORD, 'admin123')
      return password === storedPassword
    },
    
    hasPassword: (): boolean => {
      return !!localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD)
    }
  }
}

// Initialize data on import
if (typeof window !== 'undefined') {
  initializeData()
}
