import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'You must be logged in to subscribe' },
        { status: 401 }
      );
    }

    const { priceId } = await request.json();
    
    // Default to monthly if no priceId provided
    const selectedPriceId = priceId || process.env.STRIPE_PRICE_ID_MONTHLY;

    const origin = request.headers.get('origin') || process.env.NEXTAUTH_URL;

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: selectedPriceId!,
          quantity: 1,
        },
      ],
      customer_email: session.user.email || undefined,
      client_reference_id: (session.user as any).id,
      success_url: `${origin}/dashboard?success=true`,
      cancel_url: `${origin}/guest-search?canceled=true`,
      metadata: {
        userId: (session.user as any).id,
      },
    });

    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
