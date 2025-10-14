// app/api/search/session/[sessionId]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { sessionId } = params

  try {
    const { data: searchSession, error } = await supabaseAdmin
      .from('user_search_sessions')
      .select(`
        id,
        search_query,
        search_timestamp,
        results_count,
        status,
        search_parameters,
        search_duration_ms,
        search_results (
          id,
          title,
          url,
          domain,
          description,
          publication_date,
          authority_score,
          listicle_type,
          position_in_results,
          clicked,
          clicked_at,
          bookmarked,
          bookmarked_at,
          notes
        )
      `)
      .eq('id', sessionId)
      .eq('render_user_id', session.user.id) // Ensure user owns this session
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Search session not found' }, { status: 404 })
      }
      throw error
    }

    return NextResponse.json({ searchSession })
  } catch (error) {
    console.error('Error fetching search session:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
