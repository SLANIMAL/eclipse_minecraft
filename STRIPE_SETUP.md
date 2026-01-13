# Stripe Payment Integration Setup

This document explains how to set up Stripe payments for the Eclipse Minecraft server website.

## Prerequisites

1. A Stripe account (sign up at https://stripe.com)
2. Stripe API keys (test keys for development, live keys for production)

## Environment Configuration

### Frontend (.env)

Add your Stripe publishable key to the frontend environment file:

```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

### Backend (server/.env)

Add your Stripe secret key to the server environment file:

```bash
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
```

## Getting Your Stripe Keys

1. Log in to your Stripe dashboard
2. Go to Developers → API keys
3. Copy the **Publishable key** (starts with `pk_test_` for test mode)
4. Copy the **Secret key** (starts with `sk_test_` for test mode)
5. Add them to your environment files as shown above

## Testing Payments

### Test Cards

Use these test card numbers to test payments without real transactions:

- **Card Number**: `4242 4242 4242 4242`
- **Expiry**: Any future date
- **CVC**: Any 3 digits
- **ZIP**: Any 5 digits

### Test Scenarios

- **Successful payment**: Use the test card above
- **Card declined**: Use `4000 0000 0000 0002`
- **Insufficient funds**: Use `4000 0000 0000 9995`
- **Expired card**: Use any future expiry date with card `4000 0000 0000 0069`

## How It Works

1. **Frontend**: When user clicks "Proceed to Checkout", the app calls the backend to create a payment intent
2. **Backend**: Creates a Stripe payment intent and returns the client secret
3. **Frontend**: Uses the client secret to render the Stripe payment form
4. **User**: Enters payment details and confirms payment
5. **Stripe**: Processes the payment and redirects to success page
6. **Backend**: Receives webhook confirmation (can be implemented for order fulfillment)

## File Structure

```
src/
├── components/
│   └── StripePaymentForm.tsx     # Stripe payment form component
├── contexts/
│   └── StripeContext.tsx         # Stripe provider context
├── services/
│   └── stripeService.ts          # Frontend Stripe service
└── pages/
    └── PaymentSuccess.tsx        # Payment success page

server/src/stripe/
├── stripe.controller.ts           # Stripe API endpoints
├── stripe.service.ts              # Stripe backend service
├── stripe.module.ts               # NestJS module
└── dto/
    └── create-payment-intent.dto.ts # Payment intent DTO
```

## Security Notes

- Never expose your Stripe secret key in frontend code
- Always use environment variables for API keys
- In production, use HTTPS for all payment-related requests
- Implement webhook handlers for reliable order fulfillment

## Production Deployment

1. Switch to live mode in Stripe dashboard
2. Replace test keys with live keys
3. Configure webhook endpoints for payment confirmation
4. Set up proper error handling and logging
5. Implement order fulfillment logic

## Support

For Stripe-related issues:
- Check Stripe documentation: https://stripe.com/docs
- Review API logs in your Stripe dashboard
- Ensure webhook endpoints are properly configured

For implementation issues:
- Check console logs for frontend errors
- Verify backend API responses
- Ensure environment variables are properly set
