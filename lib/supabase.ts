// Main database interface - using vercel-ready in-memory system for serverless deployment
import { vercelDB } from './vercelDB'
export * from './staticData'

// Export the vercel database system that works on serverless deployment
export const localDB = vercelDB
export { vercelDB }
