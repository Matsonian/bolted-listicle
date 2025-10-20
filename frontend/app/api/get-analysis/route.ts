// app/api/get-analysis/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { url } = await req.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    console.log('🔍 Fetching saved analysis for:', { user: session.user.email, url: url.substring(0, 50) });

    const { data, error } = await supabaseAdmin
      .from('listicle_analyses')
      .select('*')
      .eq('render_user_id', session.user.email)
      .eq('url', url)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No analysis found
        return NextResponse.json({ found: false });
      }
      throw error;
    }

    if (!data) {
      return NextResponse.json({ found: false });
    }

    // Convert database format back to API format
    const analysis = {
      title: data.title,
      author_name: data.author_name,
      author_email: data.author_email,
      contact_url: data.contact_url,
      publication_date: data.publication_date,
      description: data.description,
      llm_quality_rating: data.llm_quality_rating,
      quality_reasons: data.quality_reasons,
      importance_score: data.importance_score,
      importance_breakdown: {
        auth: data.importance_auth,
        rel: data.importance_rel,
        fresh: data.importance_fresh,
        eng: data.importance_eng
      },
      outreach_priority: data.outreach_priority,
      suggested_outreach_angle: data.suggested_outreach_angle,
      model_email: data.model_email,
      analyzed_at: data.analyzed_at
    };

    console.log('✅ Found saved analysis from:', data.analyzed_at);

    return NextResponse.json({ found: true, analysis });

  } catch (error) {
    console.error('❌ Error fetching analysis:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analysis' },
      { status: 500 }
    );
  }
}
