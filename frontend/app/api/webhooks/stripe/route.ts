import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
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
      const subscriptionId = session.subscription as string;

      console.log('Checkout completed for user:', userId);

      if (userId) {
        try {
          const response = await fetch(`${process.env.GRAPHQL_URL}/graphql`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query: `
                mutation UpdateUserSubscription(
                  $userId: String!
                  $stripeCustomerId: String!
                  $stripeSubscriptionId: String!
                  $subscriptionStatus: String!
                  $tier: Tier!
                ) {
                  updateUserSubscription(
                    userId: $userId
                    stripeCustomerId: $stripeCustomerId
                    stripeSubscriptionId: $stripeSubscriptionId
                    subscriptionStatus: $subscriptionStatus
                    tier: $tier
                  ) {
                    id
                    tier
                    subscriptionStatus
                  }
                }
              `,
              variables: {
                userId,
                stripeCustomerId: customerId,
                stripeSubscriptionId: subscriptionId,
                subscriptionStatus: 'trialing',
                tier: 'PAID',
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

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;
      const subscriptionId = subscription.id;
      const status = subscription.status;
      const trialEnd = subscription.trial_end 
        ? new Date(subscription.trial_end * 1000).toISOString()
        : null;

      console.log('Subscription updated:', subscriptionId, 'Status:', status);

      try {
        const response = await fetch(`${process.env.GRAPHQL_URL}/graphql`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              mutation UpdateSubscriptionStatus(
                $stripeCustomerId: String!
                $stripeSubscriptionId: String!
                $subscriptionStatus: String!
                $trialEnd: String
              ) {
                updateSubscriptionStatus(
                  stripeCustomerId: $stripeCustomerId
                  stripeSubscriptionId: $stripeSubscriptionId
                  subscriptionStatus: $subscriptionStatus
                  trialEnd: $trialEnd
                ) {
                  id
                  subscriptionStatus
                  trialEnd
                }
              }
            `,
            variables: {
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
              subscriptionStatus: status,
              trialEnd: trialEnd,
            },
          }),
        });

        const result = await response.json();
        console.log('Subscription status updated:', result);
      } catch (error) {
        console.error('Failed to update subscription status:', error);
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      console.log('Subscription deleted for customer:', customerId);

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
                  subscriptionStatus
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

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = invoice.customer as string;

      console.log('Payment failed for customer:', customerId);

      try {
        const response = await fetch(`${process.env.GRAPHQL_URL}/graphql`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              mutation UpdateSubscriptionStatusByCustomer(
                $stripeCustomerId: String!
                $subscriptionStatus: String!
              ) {
                updateSubscriptionStatusByCustomer(
                  stripeCustomerId: $stripeCustomerId
                  subscriptionStatus: $subscriptionStatus
                ) {
                  id
                  subscriptionStatus
                }
              }
            `,
            variables: {
              stripeCustomerId: customerId,
              subscriptionStatus: 'past_due',
            },
          }),
        });

        const result = await response.json();
        console.log('User marked as past_due:', result);
      } catch (error) {
        console.error('Failed to update payment status:', error);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
