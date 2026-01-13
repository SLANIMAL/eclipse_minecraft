import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface StripeProviderProps {
  children: React.ReactNode;
  options?: {
    clientSecret?: string;
    appearance?: any;
  };
}

export function StripeProvider({ children, options }: StripeProviderProps) {
  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}
