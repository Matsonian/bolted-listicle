import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // TODO: Replace with your actual database query
    const userProfile = {
      business_name: 'Sample Business',
      business_description: 'Sample description',
      website: 'https://example.com',
      years_in_business: 5,
      industry: 'Technology',
      target_audience: 'Tech professionals',
      product_type: 'Software',
      unique_value_proposition: 'Sample UVP'
    }
    
    return NextResponse.json(userProfile)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const profileData = await request.json()
    console.log('Saving profile for user:', session.user.id, profileData)
    
    // TODO: Save to your database here
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 })
  }
}
