// Production-ready database implementation
export * from './productionDB'
export * from './staticData'

// Re-export the production database as localDB for compatibility
export { productionDB as localDB } from './productionDB'
