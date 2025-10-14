// app/api/profile/update/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { 
      firstName, 
      lastName, 
      location, 
      businessName, 
      businessDescription, 
      businessWebsite, 
      primaryProduct 
    } = body

    const { data, error } = await supabaseAdmin
      .from('user_profiles')
      .upsert({
        render_user_id: session.user.id,
        first_name: firstName || null,
        last_name: lastName || null,
        location: location || null,
        business_name: businessName || null,
        business_description: businessDescription || null,
        business_website: businessWebsite || null,
        primary_product: primaryProduct || null,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'render_user_id'
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase update error:', error)
      throw error
    }

    return NextResponse.json({ profile: data })
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
