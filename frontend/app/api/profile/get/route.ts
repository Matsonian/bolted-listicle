// app/api/profile/get/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]/route'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { data: profile, error } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('render_user_id', session.user.id)
      .single()

    if (error && error.code !== 'PGRST116') { // Not found is OK
      console.error('Supabase error:', error)
      throw error
    }

    // Also get daily activity for today
    const today = new Date().toISOString().split('T')[0]
    const { data: dailyActivity, error: activityError } = await supabaseAdmin
      .from('user_daily_activity')
      .select('*')
      .eq('render_user_id', session.user.id)
      .eq('activity_date', today)
      .single()

    if (activityError && activityError.code !== 'PGRST116') {
      console.error('Activity error:', activityError)
    }

    return NextResponse.json({ 
      profile: profile || null,
      dailyActivity: dailyActivity || {
        searches_performed: 0,
        total_results_found: 0,
        results_clicked: 0,
        results_bookmarked: 0,
        time_spent_minutes: 0
      }
    })
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
