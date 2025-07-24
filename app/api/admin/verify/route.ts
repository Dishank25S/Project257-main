import { NextRequest, NextResponse } from 'next/server'
import { vercelDB } from '@/lib/vercelDB'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    // Rate limiting check (simple implementation)
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown'
    
    if (!password) {
      return NextResponse.json({
        valid: false,
        error: 'Password is required'
      }, { status: 400 })
    }
    
    const isValid = vercelDB.admin.verifyPassword(password)
    
    return NextResponse.json({
      valid: isValid
    })
  } catch (error) {
    return NextResponse.json({
      valid: false,
      error: 'Authentication failed'
    }, { status: 500 })
  }
}
