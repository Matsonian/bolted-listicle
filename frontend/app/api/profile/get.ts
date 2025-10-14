// pages/api/profile/get.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { supabaseAdmin } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const session = await getServerSession(req, res, authOptions)
  if (!session?.user?.id) {
    return res.status(401).json({ error: 'Unauthorized' })
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

    res.status(200).json({ 
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
    res.status(500).json({ error: 'Internal server error' })
  }
}
