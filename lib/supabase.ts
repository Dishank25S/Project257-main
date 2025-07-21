// Production-ready database implementation
export * from './productionDB'
export * from './staticData'

// Re-export the production database as localDB for compatibility
// Main database interface - now using Supabase
import { supabaseDB } from './supabase-db'
export * from './staticData'

// Export Supabase database as the main database
export const localDB = supabaseDB
export { supabaseDB as productionDB }
