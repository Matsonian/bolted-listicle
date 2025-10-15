// app/api/search/history/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const { data: searchHistory, error } = await supabaseAdmin
      .from('user_search_sessions')
      .select(`
        id,
        search_query,
        search_timestamp,
        results_count,
        status,
        search_duration_ms,
        search_results (
          id,
          title,
          url,
          domain,
          clicked,
          bookmarked,
          position_in_results
        )
      `)
      .eq('render_user_id', session.user.email)
      .order('search_timestamp', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Search history error:', error)
      throw error
    }

    return NextResponse.json({ searchHistory: searchHistory || [] })
  } catch (error) {
    console.error('Error fetching search history:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
