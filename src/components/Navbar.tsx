import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Gamepad2, ShoppingCart, Vote, Sparkles, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';

const navLinks = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Gamemodes', path: '/gamemodes', icon: Gamepad2 },
  { label: 'Store', path: '/store', icon: ShoppingCart },
  { label: 'Vote', path: '/vote', icon: Vote },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [onlinePlayers, setOnlinePlayers] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state for styling
      setScrolled(currentScrollY > 50);
      
      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up or at top - show navbar
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    let isMounted = true;
    const fetchStatus = async () => {
      try {
        const status = await apiService.getServerStatus();
        if (isMounted) {
          setOnlinePlayers(status.players?.online ?? 0);
        }
      } catch (error) {
        console.error('Failed to fetch navbar server status:', error);
        if (isMounted) {
          setOnlinePlayers(null);
        }
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'shadow-2xl' 
        : ''
    } ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left side - empty for balance */}
          <div className="flex-1" />
          
          {/* Center - Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group relative px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center space-x-2 text-sm font-bold ${
                    isActive(link.path)
                      ? 'bg-red-500/20 text-red-400 shadow-lg shadow-red-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Icon size={16} className="transition-transform duration-200 group-hover:scale-110" />
                  <span className="tracking-wide uppercase text-xs">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side - Online players and login */}
          <div className="flex-1 flex justify-end items-center gap-6">
            {/* Online Players Counter */}
            <div className="hidden lg:flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${onlinePlayers !== null ? 'bg-green-500' : 'bg-gray-500'}`} />
              <span className="text-white font-medium">
                {onlinePlayers !== null ? `${onlinePlayers.toLocaleString()} Online` : 'Checking...'}
              </span>
            </div>
            
            {/* Auth Button */}
            {!loading && (
              <div className="hidden lg:flex items-center">
                {user ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-minecraft-accent/20 rounded-lg">
                      <User size={16} className="text-minecraft-accent" />
                      <span className="text-minecraft-accent text-sm font-medium">
                        {user.user_metadata?.username || user.email?.split('@')[0]}
                      </span>
                    </div>
                    <button
                      onClick={signOut}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => navigate('/login')}
                    className="flex items-center gap-2.5 px-4 py-2 rounded-lg font-semibold text-white uppercase tracking-wide text-xs bg-gradient-to-r from-[#f6c243] via-[#f6a641] to-[#f68f3d] hover:from-[#ffd25f] hover:to-[#ff9b45] transition-all duration-300 shadow-[0_6px_18px_rgba(246,166,65,0.3)]"
                  >
                    <Sparkles size={16} />
                    Login
                  </button>
                )}
              </div>
            )}
            
            {/* Mobile menu button and auth */}
            <div className="lg:hidden flex items-center gap-2">
              {!loading && user && (
                <div className="flex items-center gap-2 px-2 py-1 bg-minecraft-accent/20 rounded">
                  <User size={14} className="text-minecraft-accent" />
                </div>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-[#04070d] border-t border-gray-900 overflow-y-auto px-4 pb-12 pt-20">
            <div className="grid grid-cols-2 gap-3 mb-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 ${
                      isActive(link.path)
                        ? 'bg-red-500/20 text-red-400'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon size={24} className="mb-2" />
                    <span className="text-xs font-bold uppercase tracking-wide">{link.label}</span>
                  </Link>
                );
              })}
            </div>
            
            {/* Mobile Auth Section */}
            <div className="border-t border-gray-700 pt-4">
              {!loading && (
                user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-4 py-2 bg-minecraft-accent/20 rounded-lg">
                      <User size={20} className="text-minecraft-accent" />
                      <div>
                        <p className="text-minecraft-accent text-sm font-medium">
                          {user.user_metadata?.username || user.email?.split('@')[0]}
                        </p>
                        <p className="text-gray-400 text-xs">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#f6c243] via-[#f6a641] to-[#f68f3d] hover:from-[#ffd25f] hover:to-[#ff9b45] transition-all duration-300 shadow-[0_8px_24px_rgba(246,166,65,0.3)]"
                  >
                    <Sparkles size={18} />
                    Login
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
