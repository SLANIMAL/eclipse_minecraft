interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: string;
}

export const createPaymentIntent = async (items: CartItem[]): Promise<{ clientSecret: string }> => {
  try {
    const response = await fetch('http://localhost:4000/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        currency: 'usd',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    return response.json();
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};
