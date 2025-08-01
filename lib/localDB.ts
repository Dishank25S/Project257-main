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

// Sample photos for demonstration
const DEFAULT_PHOTOS: Photo[] = [
  {
    id: 'sample-1',
    category_id: '1', // Portraits
    title: 'Professional Portrait',
    description: 'A stunning professional portrait capturing natural beauty and confidence.',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=800&fit=crop&crop=faces',
    alt_text: 'Professional portrait of a woman',
    display_order: 1,
    is_featured: true,
    is_home_featured: true,
    home_display_section: 'top',
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'sample-2',
    category_id: '2', // Weddings
    title: 'Wedding Ceremony',
    description: 'Beautiful wedding ceremony capturing the special moment between the couple.',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=800&fit=crop&crop=center',
    alt_text: 'Wedding ceremony with bride and groom',
    display_order: 2,
    is_featured: true,
    is_home_featured: true,
    home_display_section: 'top',
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'sample-3',
    category_id: '3', // Events
    title: 'Corporate Event',
    description: 'Dynamic corporate event photography showcasing professional networking.',
    url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=800&fit=crop&crop=center',
    alt_text: 'Corporate event with people networking',
    display_order: 3,
    is_featured: true,
    is_home_featured: true,
    home_display_section: 'bottom',
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'sample-4',
    category_id: '1', // Portraits
    title: 'Artistic Portrait',
    description: 'Creative artistic portrait with dramatic lighting and composition.',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=faces',
    alt_text: 'Artistic portrait of a man',
    display_order: 4,
    is_featured: false,
    is_home_featured: true,
    home_display_section: 'bottom',
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'sample-5',
    category_id: '2', // Weddings
    title: 'Wedding Reception',
    description: 'Joyful wedding reception celebration with family and friends.',
    url: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=800&fit=crop&crop=center',
    alt_text: 'Wedding reception with dancing couples',
    display_order: 5,
    is_featured: false,
    is_home_featured: false,
    home_display_section: null,
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'sample-6',
    category_id: '3', // Events
    title: 'Birthday Celebration',
    description: 'Fun birthday celebration capturing joy and happiness.',
    url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=800&fit=crop&crop=center',
    alt_text: 'Birthday celebration with cake and balloons',
    display_order: 6,
    is_featured: false,
    is_home_featured: false,
    home_display_section: null,
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

// Sample videos for demonstration
const DEFAULT_VIDEOS: Video[] = [
  {
    id: 'video-sample-1',
    category_id: '2', // Weddings
    title: 'Wedding Highlights Reel',
    description: 'Beautiful wedding highlights showcasing the best moments of the special day.',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtube_id: 'dQw4w9WgXcQ',
    custom_thumbnail_url: null,
    duration: null,
    display_order: 1,
    is_featured: true,
    is_home_featured: true,
    home_display_section: 'top',
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'video-sample-2',
    category_id: '3', // Events
    title: 'Corporate Event Coverage',
    description: 'Professional corporate event video showcasing key moments and presentations.',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtube_id: 'dQw4w9WgXcQ',
    custom_thumbnail_url: null,
    duration: null,
    display_order: 2,
    is_featured: false,
    is_home_featured: true,
    home_display_section: 'bottom',
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

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
  
  // Initialize sample photos if not exists or empty
  const existingPhotos = getFromStorage<Photo[]>(STORAGE_KEYS.PHOTOS, [])
  if (existingPhotos.length === 0) {
    setToStorage(STORAGE_KEYS.PHOTOS, DEFAULT_PHOTOS)
  }
  
  // Initialize sample videos if not exists or empty
  const existingVideos = getFromStorage<Video[]>(STORAGE_KEYS.VIDEOS, [])
  if (existingVideos.length === 0) {
    setToStorage(STORAGE_KEYS.VIDEOS, DEFAULT_VIDEOS)
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
  },
  
  // Utility function to reset all data to defaults (useful for demo)
  resetToDefaults: () => {
    if (typeof window === 'undefined') return
    
    setToStorage(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES)
    setToStorage(STORAGE_KEYS.PHOTOS, DEFAULT_PHOTOS)
    setToStorage(STORAGE_KEYS.VIDEOS, DEFAULT_VIDEOS)
    setToStorage(STORAGE_KEYS.CONTACT, DEFAULT_CONTACT)
    
    console.log('Database reset to default sample data')
  }
}

// Initialize data on import
if (typeof window !== 'undefined') {
  initializeData()
}
