import { Zap, Shield, Users, TrendingUp, Cpu, Award } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Ultra-low latency infrastructure with servers in multiple regions for smooth gameplay.'
  },
  {
    icon: Shield,
    title: 'Advanced Security',
    description: 'State-of-the-art anti-cheat detection and DDoS protection keeping the server secure.'
  },
  {
    icon: Users,
    title: 'Vibrant Community',
    description: 'Join 50,000+ active players and make friends in a welcoming, diverse community.'
  },
  {
    icon: TrendingUp,
    title: 'Fair Economy',
    description: 'Balanced gameplay with no pay-to-win mechanics. Everyone has equal opportunity to succeed.'
  },
  {
    icon: Cpu,
    title: 'Constant Updates',
    description: 'Regular content updates, bug fixes, and new features based on community feedback.'
  },
  {
    icon: Award,
    title: 'Rewarding Gameplay',
    description: 'Earn cosmetics, ranks, and exclusive items through gameplay and community participation.'
  },
];

export function Features() {
  return (
    <div className="min-h-screen bg-gradient-minecraft text-white">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-pixel text-4xl sm:text-5xl mb-4 text-minecraft-accent text-center">
            Why Eclipse Network Stands Out
          </h1>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            We've invested in the best technology and community management to create an unmatched Minecraft experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="bg-minecraft-dark/50 border border-minecraft-accent/30 rounded-lg p-8 backdrop-blur-md hover:border-minecraft-accent hover:bg-minecraft-dark/70 transition-all duration-300 group"
                >
                  <Icon className="text-minecraft-accent mb-4 group-hover:scale-110 group-hover:text-minecraft-green transition-all" size={40} />
                  <h3 className="text-xl font-bold text-minecraft-green mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-20 bg-minecraft-accent/10 border border-minecraft-accent/30 rounded-lg p-12 backdrop-blur-md text-center">
            <h2 className="font-pixel text-3xl mb-6 text-minecraft-green">Ready to Experience Eclipse Minecraft?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of players already having the time of their lives on Eclipse Network. The adventure awaits!
            </p>
            <div className="flex justify-center">
              <button className="bg-gradient-accent text-minecraft-dark px-8 py-4 rounded-lg font-bold hover:shadow-neon-green transition-all transform hover:scale-105 w-full max-w-[260px]">
                Join Now - play.pixelcraft.net
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
