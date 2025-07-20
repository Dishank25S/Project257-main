import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
  photo_count?: number
}

export type Photo = {
  id: string
  category_id: string
  title: string | null
  description: string | null
  image_url: string
  thumbnail_url: string | null
  alt_text: string | null
  display_order: number
  is_featured: boolean
  is_home_featured: boolean
  home_display_section: string | null
  file_size: number | null
  dimensions: { width: number; height: number } | null
  metadata: any
  is_active: boolean
  created_at: string
  updated_at: string
  category_name?: string
}
