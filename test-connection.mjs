// Test Supabase connection
import { supabase } from './lib/supabase-client.js'

async function testConnection() {
  try {
    console.log('Testing Supabase connection...')
    
    // Try to get categories from Supabase
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('Supabase connection error:', error.message)
      return false
    }
    
    console.log('✅ Supabase connection successful!')
    console.log('Sample data:', data)
    return true
    
  } catch (err) {
    console.error('Connection test failed:', err.message)
    return false
  }
}

testConnection()
  .then(success => {
    if (success) {
      console.log('\n🎉 Your Supabase integration is working!')
      console.log('You can now start the development server with: pnpm dev')
    } else {
      console.log('\n❌ There may be an issue with your Supabase configuration')
      console.log('Please check:')
      console.log('1. Database tables are created (run the SQL scripts)')
      console.log('2. Environment variables are correct')
      console.log('3. Supabase project is active')
    }
  })
  .catch(err => {
    console.error('Test execution failed:', err)
  })
