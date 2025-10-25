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
    const userId = (session.user as any).id;
    const token = (session as any).accessToken;

    console.log('=== CHECKOUT SESSION START ===', { userId, hasToken: !!token });

    // Check if user already has a Stripe customer ID (FIXED QUERY)
    const userResponse = await fetch(`${process.env.GRAPHQL_URL}/graphql`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Added auth header
      },
      body: JSON.stringify({
        query: `
          query GetUser {
            user {
              id
              email
              stripeCustomerId
              subscriptionStatus
            }
          }
        `,
        // Removed variables - backend uses ctx.user
      }),
    });

    const userData = await userResponse.json();
    console.log('=== USER DATA RESPONSE ===', userData);

    let customerId = userData?.data?.user?.stripeCustomerId;
    const existingStatus = userData?.data?.user?.subscriptionStatus;

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      console.log('=== CREATING STRIPE CUSTOMER ===');
      const customer = await stripe.customers.create({
        email: session.user.email || undefined,
        metadata: {
          userId: userId,
        },
      });
      customerId = customer.id;
      console.log('=== STRIPE CUSTOMER CREATED ===', customerId);

      // Save customer ID to database via GraphQL
      const updateResponse = await fetch(`${process.env.GRAPHQL_URL}/graphql`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Added auth header
        },
        body: JSON.stringify({
          query: `
            mutation UpdateUser($stripeCustomerId: String) {
              updateUser(stripeCustomerId: $stripeCustomerId) {
                id
                stripeCustomerId
              }
            }
          `,
          variables: {
            stripeCustomerId: customerId,
          },
        }),
      });

      const updateResult = await updateResponse.json();
      console.log('=== UPDATE USER RESULT ===', updateResult);
    }

    // Determine if user should get trial (only for new subscriptions)
    const shouldGetTrial = !existingStatus || existingStatus === 'incomplete' || existingStatus === 'canceled';
    console.log('=== TRIAL STATUS ===', { existingStatus, shouldGetTrial });

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: selectedPriceId!,
          quantity: 1,
        },
      ],
      subscription_data: {
        // Add 7-day trial for new users
        ...(shouldGetTrial && { trial_period_days: 7 }),
        metadata: {
          userId: userId,
        },
      },
      success_url: `${origin}/welcome?success=true`,
      cancel_url: `${origin}/guest-search?canceled=true`,
      metadata: {
        userId: userId,
      },
    });

    console.log('=== CHECKOUT SESSION CREATED ===', checkoutSession.id);
    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    console.error('=== STRIPE CHECKOUT ERROR ===', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
