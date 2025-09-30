import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const customerId = session.customer as string;

      console.log('Checkout completed for user:', userId);

      if (userId) {
        // Update user in your database via GraphQL
        try {
          const response = await fetch(`${process.env.GRAPHQL_URL}/graphql`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query: `
                mutation UpdateUserSubscription($userId: ID!, $stripeCustomerId: String!, $tier: String!) {
                  updateUserSubscription(
                    userId: $userId
                    stripeCustomerId: $stripeCustomerId
                    tier: $tier
                  ) {
                    id
                    tier
                  }
                }
              `,
              variables: {
                userId,
                stripeCustomerId: customerId,
                tier: 'paid',
              },
            }),
          });

          const result = await response.json();
          console.log('User subscription updated:', result);
        } catch (error) {
          console.error('Failed to update user subscription:', error);
        }
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      console.log('Subscription deleted for customer:', customerId);

      // Downgrade user to free tier
      try {
        const response = await fetch(`${process.env.GRAPHQL_URL}/graphql`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              mutation DowngradeUserSubscription($stripeCustomerId: String!) {
                downgradeUserByStripeId(stripeCustomerId: $stripeCustomerId) {
                  id
                  tier
                }
              }
            `,
            variables: {
              stripeCustomerId: customerId,
            },
          }),
        });

        const result = await response.json();
        console.log('User downgraded:', result);
      } catch (error) {
        console.error('Failed to downgrade user:', error);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}