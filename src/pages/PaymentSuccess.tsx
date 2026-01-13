import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Home } from 'lucide-react';
import { Button } from '../components/Button';

export function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Here you could verify the payment status with the backend
    // using the URL parameters or session ID
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-minecraft text-white p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-minecraft-dark/50 border border-minecraft-accent/30 rounded-lg p-6 backdrop-blur-md text-center">
          <div className="w-12 h-12 bg-minecraft-green rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={24} className="text-minecraft-dark" />
          </div>
          
          <h1 className="font-pixel text-2xl mb-3 text-minecraft-green">
            Payment Successful!
          </h1>
          
          <p className="text-gray-400 text-sm mb-6">
            Thank you for your purchase! Your ranks and items will be delivered to your account shortly.
          </p>
          
          <div className="space-y-3">
            <Button
              variant="accent"
              onClick={() => navigate('/store')}
              className="w-full"
            >
              Back to Store
            </Button>
            
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
              className="w-full"
            >
              <Home size={14} className="mr-2" />
              Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
