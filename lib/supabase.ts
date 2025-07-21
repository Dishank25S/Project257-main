// Main database interface - switches between Supabase and static data
import { productionDB } from './productionDB'
import type { Category, Photo, Video, ContactInfo } from './staticData'

// Define a common database interface
export interface Database {
  categories: {
    getAll: () => Category[]
    // Add other category methods if needed
  }
  photos: {
    getAll: (categoryId?: string) => Photo[]
    // Add other photo methods if needed
  }
  videos: {
    getAll: (categoryId?: string) => Video[]
    // Add other video methods if needed
  }
  contact: {
    get: () => ContactInfo
    // Add other contact methods if needed
  }
  // Add other top-level database objects if needed
}

let finalDB: any // Using 'any' to avoid complex type issues with dynamic import

if (process.env.NODE_ENV === 'production') {
  console.log("Using production database (static data)")
  finalDB = productionDB
} else {
  console.log("Using development database (Supabase)")
  // Dynamically import supabase-db only in development
  const { supabaseDB } = require('./supabase-db')
  finalDB = supabaseDB
}

export const localDB = finalDB
export * from './staticData'
export { productionDB }
