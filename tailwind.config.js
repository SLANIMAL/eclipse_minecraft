/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'minecraft-dark': '#0a0e27',
        'minecraft-darker': '#050812',
        'minecraft-accent': '#00d4ff',
        'minecraft-green': '#00ff41',
        'minecraft-gold': '#ffd700',
        'minecraft-red': '#ff3333',
      },
      backgroundImage: {
        'gradient-minecraft': 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1428 100%)',
        'gradient-accent': 'linear-gradient(135deg, #00d4ff 0%, #00ff41 100%)',
      },
      fontFamily: {
        'pixel': ['Press Start 2P', 'cursive'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        'md': '12px',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 212, 255, 0.5)',
        'neon-green': '0 0 20px rgba(0, 255, 65, 0.5)',
        'glow': '0 0 30px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.1)',
      },
    },
  },
  plugins: [],
};
