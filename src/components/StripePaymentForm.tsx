import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from './Button';

interface StripePaymentFormProps {
  clientSecret: string;
  onSuccess: () => void;
  onCancel: () => void;
  amount: number;
}

export function StripePaymentForm({ 
  clientSecret, 
  onSuccess, 
  onCancel, 
  amount 
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message || 'An error occurred');
      } else {
        setMessage('An unexpected error occurred.');
      }
    } else {
      onSuccess();
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-minecraft-accent/5 border border-minecraft-accent/20 rounded-lg p-6">
        <h3 className="font-bold text-minecraft-green mb-4">Payment Information</h3>
        <PaymentElement 
          options={{
            layout: 'tabs'
          }}
        />
      </div>

      {message && (
        <div className="bg-minecraft-red/20 border border-minecraft-red rounded-lg p-4 text-minecraft-red">
          {message}
        </div>
      )}

      <div className="bg-minecraft-dark/50 border border-minecraft-accent/30 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">Total:</span>
          <span className="text-xl font-bold text-minecraft-accent">${amount.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="accent"
          className="flex-1"
          disabled={isLoading || !stripe || !elements}
        >
          {isLoading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
        </Button>
      </div>
    </form>
  );
}
