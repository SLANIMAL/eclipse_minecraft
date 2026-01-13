import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }

  async createPaymentIntent(items: any[], currency: string = 'usd') {
    // Calculate total amount in cents and round to nearest integer
    const totalAmount = Math.round(items.reduce((sum, item) => {
      return sum + (item.price * item.quantity * 100); // Convert to cents
    }, 0));

    console.log('Creating payment intent with amount:', totalAmount, 'for items:', items);

    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: totalAmount,
        currency,
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          items: JSON.stringify(items),
        },
      });

      return { clientSecret: paymentIntent.client_secret };
    } catch (error) {
      console.error('Stripe error:', error);
      throw new Error('Failed to create payment intent');
    }
  }

  async confirmPayment(paymentIntentId: string) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status === 'succeeded') {
        // Here you would typically:
        // 1. Update user's ranks/items in database
        // 2. Send confirmation email
        // 3. Log the transaction
        console.log('Payment succeeded:', paymentIntent);
      }

      return paymentIntent;
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw new Error('Failed to confirm payment');
    }
  }
}
