// Static data for production deployment
// This ensures the website always has content on Vercel

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

// Static data that will always be available in production
export const STATIC_CATEGORIES: Category[] = [
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
  },
  {
    id: '4',
    name: 'Product',
    slug: 'product',
    description: 'Product and commercial photography',
    display_order: 4,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

export const STATIC_PHOTOS: Photo[] = [
  {
    id: 'static-1',
    category_id: '1',
    title: 'Professional Portrait Session',
    description: 'Elegant professional portrait with natural lighting and sophisticated composition.',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=800&fit=crop&crop=faces&auto=format&q=80',
    alt_text: 'Professional portrait of a woman with elegant lighting',
    display_order: 1,
    is_featured: true,
    is_home_featured: true,
    home_display_section: 'top',
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'static-2',
    category_id: '2',
    title: 'Wedding Ceremony Magic',
    description: 'Beautiful wedding ceremony capturing the sacred moment between bride and groom.',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=800&fit=crop&crop=center&auto=format&q=80',
    alt_text: 'Wedding ceremony with bride and groom exchanging vows',
    display_order: 2,
    is_featured: true,
    is_home_featured: true,
    home_display_section: 'top',
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'static-3',
    category_id: '3',
    title: 'Corporate Event Excellence',
    description: 'Dynamic corporate event photography showcasing professional networking and presentations.',
    url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=800&fit=crop&crop=center&auto=format&q=80',
    alt_text: 'Corporate event with people networking and presenting',
    display_order: 3,
    is_featured: true,
    is_home_featured: true,
    home_display_section: 'bottom',
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'static-4',
    category_id: '1',
    title: 'Creative Portrait Art',
    description: 'Artistic portrait with dramatic lighting and creative composition techniques.',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=faces&auto=format&q=80',
    alt_text: 'Artistic portrait of a man with dramatic lighting',
    display_order: 4,
    is_featured: false,
    is_home_featured: true,
    home_display_section: 'bottom',
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'static-5',
    category_id: '2',
    title: 'Wedding Reception Joy',
    description: 'Joyful wedding reception celebration capturing the happiness of family and friends.',
    url: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=800&fit=crop&crop=center&auto=format&q=80',
    alt_text: 'Wedding reception with dancing couples and celebration',
    display_order: 5,
    is_featured: false,
    is_home_featured: false,
    home_display_section: null,
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'static-6',
    category_id: '3',
    title: 'Birthday Celebration',
    description: 'Fun birthday celebration photography capturing joy, happiness and special moments.',
    url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=800&fit=crop&crop=center&auto=format&q=80',
    alt_text: 'Birthday celebration with cake, balloons and happy people',
    display_order: 6,
    is_featured: false,
    is_home_featured: false,
    home_display_section: null,
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'static-7',
    category_id: '4',
    title: 'Product Photography Excellence',
    description: 'High-quality product photography with perfect lighting and professional presentation.',
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&crop=center&auto=format&q=80',
    alt_text: 'Professional product photography of sneakers',
    display_order: 7,
    is_featured: true,
    is_home_featured: false,
    home_display_section: null,
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'static-8',
    category_id: '1',
    title: 'Fashion Portrait Series',
    description: 'Stunning fashion portrait showcasing style and personality with professional lighting.',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop&crop=faces&auto=format&q=80',
    alt_text: 'Fashion portrait of a woman with professional styling',
    display_order: 8,
    is_featured: false,
    is_home_featured: true,
    home_display_section: 'top',
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

export const STATIC_VIDEOS: Video[] = [
  {
    id: 'static-video-1',
    category_id: '2',
    title: 'Wedding Cinematic Highlights',
    description: 'Beautiful cinematic wedding video showcasing the best moments of this special day.',
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
    id: 'static-video-2',
    category_id: '3',
    title: 'Corporate Event Coverage',
    description: 'Professional corporate event video capturing presentations, networking and key moments.',
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

export const STATIC_CONTACT: ContactInfo = {
  id: '1',
  photographer_name: 'Krishna Broker',
  phone: '+91 9665984974',
  location: 'Swargate, Pune',
  email: 'krishna@sharpcinematic.com',
  instagram_url: 'https://instagram.com/sharpcinematic',
  facebook_url: null,
  whatsapp_url: null,
  updated_at: new Date().toISOString()
}
