// Main database interface - using production-ready static system for Vercel
import { productionDB } from './productionDB'
export * from './staticData'

// Export the production database system that works on Vercel
export const localDB = productionDB
export { productionDB }
