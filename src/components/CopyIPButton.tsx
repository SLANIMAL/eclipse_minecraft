import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const SERVER_IP = 'play.eclipse-minecraft.net';

export function CopyIPButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy');
    }
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        right: 'clamp(0.75rem, 3vw, 1.5rem)',
        bottom: 'clamp(1.25rem, 4vw, 2.5rem)',
      }}
      className="fixed z-40 flex items-center gap-2 px-3 py-2 sm:px-4 bg-minecraft-accent/10 border border-minecraft-accent rounded-lg hover:bg-minecraft-accent/20 transition-all duration-300 text-minecraft-accent hover:shadow-neon-cyan group"
    >
      {copied ? (
        <>
          <Check size={20} className="group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">Copied!</span>
        </>
      ) : (
        <>
          <Copy size={20} className="group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">{SERVER_IP}</span>
        </>
      )}
    </button>
  );
}
