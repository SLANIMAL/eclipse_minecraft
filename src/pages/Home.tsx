import { useEffect, useState } from 'react';
import { Users, MessageCircle, Zap, Copy } from 'lucide-react';
import bgImage from '../assets/bg.png';
import { apiService, type ServerStatus as ApiServerStatus } from '../services/api';

export function Home() {
  const [copied, setCopied] = useState(false);
  const [serverStatus, setServerStatus] = useState<ApiServerStatus | null>(null);
  const [statusLoading, setStatusLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await apiService.getServerStatus();
        setServerStatus(status);
      } catch (error) {
        console.error('Failed to fetch home server status:', error);
      } finally {
        setStatusLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyIP = async () => {
    try {
      await navigator.clipboard.writeText('play.eclipsemc.me');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(1,4,9,0.95) 0%, rgba(1,4,9,0.75) 35%, rgba(1,4,9,0.4) 75%, rgba(1,4,9,0.85) 100%), url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 pb-20 pt-24">
        
        {/* Season Info */}
        <div className="flex items-center gap-3 mb-8">
          <Zap size={20} className="text-yellow-400" />
          <span className="text-yellow-400 font-bold tracking-wider">SEASON 01 • RIFTBORN</span>
        </div>
        
        {/* Stats */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap mb-12 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-gray-400" />
            <span className="text-2xl sm:text-3xl font-bold leading-none">
              {statusLoading
                ? '...'
                : (serverStatus?.players?.online ?? 0).toLocaleString()}
            </span>
            <span className="text-gray-400">Online</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MessageCircle size={18} className="text-gray-400" />
            <span className="text-gray-300">discord.gg/eclipse</span>
          </div>
        </div>

        {/* Eclipse Network Logo */}
        <div className="relative mb-16 flex justify-center">
          <div className="absolute -inset-16">
            <div className="w-full h-full bg-[radial-gradient(circle,_rgba(246,162,65,0.35)_0%,_transparent_60%)] blur-3xl opacity-90 animate-pulse" />
          </div>
          <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-[#f6c243]/50 via-[#f68f3d]/40 to-[#f6c243]/50 blur-[60px] opacity-70 animate-[pulse_3s_ease-in-out_infinite]" />
          <img
            src="/src/assets/logo.png"
            alt="Eclipse Network"
            className="relative w-80 h-80 object-contain animate-float drop-shadow-[0_15px_45px_rgba(246,162,65,0.35)]"
          />
        </div>

        {/* Server IP Section */}
        <div className="w-full max-w-3xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-6 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            <div className="flex-1">
              <p className="text-[0.6rem] uppercase tracking-[0.4em] text-gray-400">
                Server IP
              </p>
              <div className="flex items-center flex-wrap gap-3 mt-2">
                <span className="text-2xl font-mono text-white">play.eclipsemc.me</span>
                <span className="px-3 py-1 text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-full flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Always Online
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Java & Bedrock • 1.20+ • Low latency worldwide
              </p>
            </div>

            <button
              onClick={handleCopyIP}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#f6c243] via-[#f6a641] to-[#f68f3d] hover:from-[#ffd25f] hover:to-[#ff9b45] transition-all duration-300 shadow-[0_10px_30px_rgba(246,166,65,0.35)]"
            >
              <Copy size={18} />
              {copied ? 'Copied!' : 'Copy IP'}
            </button>
          </div>
        </div>
        
      </main>
    </div>
  );
}
