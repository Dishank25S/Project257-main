// Supabase Database Service
// This replaces the localStorage system with a real Supabase database

import { supabase } from './supabase-client'
import type { Category, Photo, Video, ContactInfo } from './staticData'

// Database service using Supabase
export const supabaseDB = {
  // Categories
  categories: {
    async getAll(): Promise<Category[]> {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: true })
      
      if (error) {
        console.error('Error fetching categories:', error)
        return []
      }
      
      return data || []
    },

    async create(category: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Promise<Category | null> {
      const { data, error } = await supabase
        .from('categories')
        .insert([category])
        .select()
        .single()
      
      if (error) {
        console.error('Error creating category:', error)
        return null
      }
      
      return data
    },

    async update(id: string, updates: Partial<Category>): Promise<Category | null> {
      const { data, error } = await supabase
        .from('categories')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()
      
      if (error) {
        console.error('Error updating category:', error)
        return null
      }
      
      return data
    },

    async delete(id: string): Promise<boolean> {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)
      
      if (error) {
        console.error('Error deleting category:', error)
        return false
      }
      
      return true
    }
  },

  // Photos
  photos: {
    async getAll(categoryId?: string): Promise<Photo[]> {
      let query = supabase
        .from('photos')
        .select('*')
        .order('display_order', { ascending: true })
      
      if (categoryId) {
        query = query.eq('category_id', categoryId)
      }
      
      const { data, error } = await query
      
      if (error) {
        console.error('Error fetching photos:', error)
        return []
      }
      
      return data || []
    },

    async getById(id: string): Promise<Photo | null> {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) {
        console.error('Error fetching photo:', error)
        return null
      }
      
      return data
    },

    async create(photo: Omit<Photo, 'id' | 'created_at' | 'updated_at'>): Promise<Photo | null> {
      const { data, error } = await supabase
        .from('photos')
        .insert([photo])
        .select()
        .single()
      
      if (error) {
        console.error('Error creating photo:', error)
        return null
      }
      
      return data
    },

    async update(id: string, updates: Partial<Photo>): Promise<Photo | null> {
      const { data, error } = await supabase
        .from('photos')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()
      
      if (error) {
        console.error('Error updating photo:', error)
        return null
      }
      
      return data
    },

    async delete(id: string): Promise<boolean> {
      const { error } = await supabase
        .from('photos')
        .delete()
        .eq('id', id)
      
      if (error) {
        console.error('Error deleting photo:', error)
        return false
      }
      
      return true
    }
  },

  // Videos
  videos: {
    async getAll(categoryId?: string): Promise<Video[]> {
      let query = supabase
        .from('videos')
        .select('*')
        .order('display_order', { ascending: true })
      
      if (categoryId) {
        query = query.eq('category_id', categoryId)
      }
      
      const { data, error } = await query
      
      if (error) {
        console.error('Error fetching videos:', error)
        return []
      }
      
      return data || []
    },

    async getById(id: string): Promise<Video | null> {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) {
        console.error('Error fetching video:', error)
        return null
      }
      
      return data
    },

    async create(video: Omit<Video, 'id' | 'created_at' | 'updated_at'>): Promise<Video | null> {
      const { data, error } = await supabase
        .from('videos')
        .insert([video])
        .select()
        .single()
      
      if (error) {
        console.error('Error creating video:', error)
        return null
      }
      
      return data
    },

    async update(id: string, updates: Partial<Video>): Promise<Video | null> {
      const { data, error } = await supabase
        .from('videos')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()
      
      if (error) {
        console.error('Error updating video:', error)
        return null
      }
      
      return data
    },

    async delete(id: string): Promise<boolean> {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id)
      
      if (error) {
        console.error('Error deleting video:', error)
        return false
      }
      
      return true
    }
  },

  // Contact Info
  contact: {
    async get(): Promise<ContactInfo | null> {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .limit(1)
        .single()
      
      if (error) {
        console.error('Error fetching contact info:', error)
        // Return default contact info if none exists
        return {
          id: '1',
          photographer_name: 'Photography Studio',
          phone: '+1 (555) 123-4567',
          location: '123 Photography Street, Creative District, NY 10001',
          email: 'hello@photographystudio.com',
          instagram_url: 'https://instagram.com/photographystudio',
          facebook_url: 'https://facebook.com/PhotographyStudioNY',
          whatsapp_url: null,
          updated_at: new Date().toISOString()
        }
      }
      
      return data
    },

    async update(updates: Partial<ContactInfo>): Promise<ContactInfo | null> {
      // First try to get the existing contact info directly
      const { data: existing, error: fetchError } = await supabase
        .from('contact_info')
        .select('*')
        .limit(1)
        .single()
      
      if (fetchError || !existing) {
        // Create new contact info if none exists
        const { data, error } = await supabase
          .from('contact_info')
          .insert([{
            photographer_name: 'Photography Studio',
            phone: '+1 (555) 123-4567',
            location: '123 Photography Street, Creative District, NY 10001',
            email: 'hello@photographystudio.com',
            instagram_url: 'https://instagram.com/photographystudio',
            facebook_url: 'https://facebook.com/PhotographyStudioNY',
            whatsapp_url: null,
            ...updates,
            updated_at: new Date().toISOString()
          }])
          .select()
          .single()
        
        if (error) {
          console.error('Error creating contact info:', error)
          return null
        }
        
        return data
      } else {
        // Update existing contact info
        const { data, error } = await supabase
          .from('contact_info')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', existing.id)
          .select()
          .single()
        
        if (error) {
          console.error('Error updating contact info:', error)
          return null
        }
        
        return data
      }
    }
  },

  // Admin authentication
  admin: {
    async verifyPassword(password: string): Promise<boolean> {
      // Use environment variable for admin password
      const adminPassword = process.env.ADMIN_PASSWORD || process.env.ADMIN_DEFAULT_PASSWORD || 'admin123'
      return password === adminPassword
    },

    async hasPassword(): Promise<boolean> {
      return true // Always return true since we have a default password
    },

    async setPassword(password: string): Promise<void> {
      // In a real implementation, you might want to store this in the database
      // For now, we'll just log that a password change was attempted
      console.log('Password change attempted - would need to update environment variable')
    }
  }
}
