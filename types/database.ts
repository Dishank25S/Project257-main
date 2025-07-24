// Type definitions for the photography website

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
  business_name: string
  email: string
  phone: string | null
  whatsapp: string | null
  instagram: string | null
  facebook: string | null
  twitter: string | null
  website: string | null
  address: string | null
  description: string | null
  logo_url: string | null
  created_at: string
  updated_at: string
}

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: Category
        Insert: Omit<Category, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>
      }
      photos: {
        Row: Photo
        Insert: Omit<Photo, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Photo, 'id' | 'created_at' | 'updated_at'>>
      }
      videos: {
        Row: Video
        Insert: Omit<Video, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Video, 'id' | 'created_at' | 'updated_at'>>
      }
      contact_info: {
        Row: ContactInfo
        Insert: Omit<ContactInfo, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<ContactInfo, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
}
