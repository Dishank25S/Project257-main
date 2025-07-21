import { NextRequest, NextResponse } from 'next/server'
import { supabaseDB } from '@/lib/supabase-db'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    const isValid = await supabaseDB.admin.verifyPassword(password)
    
    return NextResponse.json({
      valid: isValid,
      environment: process.env.NODE_ENV,
      hasEnvVar: !!process.env.ADMIN_PASSWORD,
      envValue: process.env.ADMIN_PASSWORD ? 'Set' : 'Not set'
    })
  } catch (error) {
    return NextResponse.json({
      valid: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: process.env.NODE_ENV
    }, { status: 500 })
  }
}
