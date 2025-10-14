// app/api/search/save/route.ts
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
    const { searchQuery, results, searchDuration, searchParameters } = body

    if (!searchQuery || !results || !Array.isArray(results)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create search session
    const { data: searchSession, error: sessionError } = await supabaseAdmin
      .from('user_search_sessions')
      .insert({
        render_user_id: session.user.id,
        search_query: searchQuery,
        results_count: results.length,
        search_duration_ms: searchDuration || null,
        search_parameters: searchParameters || null,
        status: 'completed',
        ip_address: request.headers.get('x-forwarded-for') || request.ip,
        user_agent: request.headers.get('user-agent')
      })
      .select()
      .single()

    if (sessionError) {
      console.error('Session creation error:', sessionError)
      throw sessionError
    }

    // Save search results if any
    if (results.length > 0) {
      const searchResultsData = results.map((result: any, index: number) => ({
        search_session_id: searchSession.id,
        title: result.title || 'Untitled',
        url: result.url || result.link || '',
        domain: result.domain || (result.url || result.link ? new URL(result.url || result.link).hostname : null),
        description: result.description || result.snippet || null,
        position_in_results: index + 1,
        authority_score: result.authorityScore || null,
        listicle_type: result.type || result.listicle_type || null,
        publication_date: result.publishedDate || result.publication_date || null
      }))

      const { error: resultsError } = await supabaseAdmin
        .from('search_results')
        .insert(searchResultsData)

      if (resultsError) {
        console.error('Results insertion error:', resultsError)
        throw resultsError
      }
    }

    // Update daily activity
    const today = new Date().toISOString().split('T')[0]
    
    // Get existing activity
    const { data: existingActivity } = await supabaseAdmin
      .from('user_daily_activity')
      .select('searches_performed, total_results_found')
      .eq('render_user_id', session.user.id)
      .eq('activity_date', today)
      .single()

    // Upsert daily activity
    await supabaseAdmin
      .from('user_daily_activity')
      .upsert({
        render_user_id: session.user.id,
        activity_date: today,
        searches_performed: (existingActivity?.searches_performed || 0) + 1,
        total_results_found: (existingActivity?.total_results_found || 0) + results.length,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'render_user_id,activity_date'
      })

    return NextResponse.json({ sessionId: searchSession.id })
  } catch (error) {
    console.error('Error saving search:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
