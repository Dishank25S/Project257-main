/**
 * Secure authentication utilities
 */

let authToken: string | null = null

export const auth = {
  setToken: (password: string) => {
    authToken = password
  },
  
  getToken: (): string => {
    return authToken || process.env.ADMIN_PASSWORD || 'admin123'
  },
  
  clearToken: () => {
    authToken = null
  },
  
  getHeaders: () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth.getToken()}`
  })
}

export default auth
