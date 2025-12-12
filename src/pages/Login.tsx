import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Button } from '../components/Button';
import { supabase } from '../lib/supabase';

const GoogleLogo = () => (
  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#0d1a3a] shadow-[0_0_25px_rgba(9,13,36,0.8)]">
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" role="img" aria-label="Google logo">
      <path d="M17.64 9.20452C17.64 8.46174 17.5791 7.83984 17.4627 7.23828H9V10.8871H14.5813C14.4341 11.9121 13.8038 12.768 12.8457 13.2902V15.6348H15.0589C16.8289 14.11 17.64 11.8363 17.64 9.20452Z" fill="#4285F4"/>
      <path d="M9 18C11.43 18 13.4774 17.1347 15.0588 15.6348L12.8456 13.2902C12.0976 13.7764 11.1626 14.0397 10.175 14.0397C8.10137 14.0397 6.31875 12.6394 5.69422 10.7812H3.3457V12.1985C4.91211 14.9956 7.77081 18 9 18Z" fill="#34A853"/>
      <path d="M5.69425 10.7812C5.50937 10.204 5.41016 9.59145 5.41016 8.96145C5.41016 8.33145 5.50937 7.7189 5.69425 7.1416V5.72424H3.34573C2.58484 7.11236 2.125 8.77947 2.125 10.5415C2.125 12.3036 2.58487 13.9707 3.34576 15.3588L5.69425 13.9414V10.7812Z" fill="#FBBC05"/>
      <path d="M9 3.88125C10.2834 3.88125 11.456 4.34599 12.3668 5.1974L14.0894 3.4748C12.4701 1.99626 10.4209 1.125 8.06875 1.125C5.70781 1.125 3.64253 1.99121 2.11523 3.46537L4.46375 5.88135C5.08947 4.02461 6.87209 2.62427 9 2.62427V3.88125Z" fill="#EA4335"/>
    </svg>
  </span>
);

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
            },
          },
        });
        if (error) throw error;
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      setError(error.message || 'Failed to sign in with Google');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-minecraft flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-minecraft-dark/60 backdrop-blur-lg border border-minecraft-accent/30 rounded-2xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="font-pixel text-2xl text-minecraft-accent mb-2">
              ECLIPSE NETWORK
            </h1>
            <p className="text-gray-400 text-sm">
              {isLogin ? 'Welcome back to Eclipse' : 'Join the Eclipse community'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-minecraft-dark/50 border border-minecraft-accent/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-minecraft-accent transition-colors"
                    placeholder="Enter your username"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-minecraft-dark/50 border border-minecraft-accent/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-minecraft-accent transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-minecraft-dark/50 border border-minecraft-accent/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-minecraft-accent transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="accent"
              className="w-full py-3"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-minecraft-dark border-t-minecraft-green rounded-full animate-spin" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </Button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full mt-3 flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/5 py-3 px-4 text-sm font-semibold text-white transition hover:border-minecraft-accent/60 hover:bg-white/10 disabled:opacity-60"
            >
              <GoogleLogo />
              {googleLoading ? 'Redirecting...' : 'Continue with Google'}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-minecraft-accent hover:text-minecraft-green transition-colors font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
