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

// app/api/search/history/route.ts
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
      .eq('render_user_id', session.user.id)
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

// app/api/search/session/[sessionId]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../auth/[...nextauth]/route'
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
