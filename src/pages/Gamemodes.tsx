import { Package, Sword, Wind, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';
import bgImage from '../assets/bg.png';

const gamemodes = [
  {
    id: 'survival',
    name: 'Survival',
    icon: Package,
    color: 'minecraft-green',
    image: '/src/assets/gamemodes/survival.png',
    difficulty: 'Medium',
    description: 'Classic Survival mode with an integrated economy system. Build, trade, and thrive in a balanced world.',
    features: [
      'Economy & Jobs System',
      'Player Shops',
      'Mob Grinders',
      'Farming Rewards',
      'Territory Protection'
    ],
    rewards: ['Currency', 'Cosmetics', 'Special Items']
  },
  {
    id: 'pvp',
    name: 'PvP Arena',
    icon: Sword,
    color: 'minecraft-red',
    image: '/src/assets/gamemodes/pvp.png',
    difficulty: 'Hard',
    description: 'Intense player-versus-player combat in specially designed arenas. Test your skills against the best.',
    features: [
      'Ranked Seasons',
      'Custom Kits',
      'Tournaments',
      'Skill Tracking',
      'Fair Matchmaking'
    ],
    rewards: ['Ranked Badges', 'Exclusive Skins', 'Tournament Prizes']
  },
  {
    id: 'bedwars',
    name: 'Bedwars',
    icon: Wind,
    color: 'minecraft-red',
    image: '/src/assets/gamemodes/bedwars.png',
    difficulty: 'Hard',
    description: 'Protect your bed while destroying others. Build defenses, collect resources, and be the last team standing.',
    features: [
      'Team Combat',
      'Base Building',
      'Resource Collection',
      'Island Strategy',
      'Elimination Mode'
    ],
    rewards: ['Victory Points', 'Exclusive Kits', 'Rank Boost']
  },
  {
    id: 'lifesteal',
    name: 'Lifesteal',
    icon: Zap,
    color: 'minecraft-accent',
    image: '/src/assets/gamemodes/lifesteal.png',
    difficulty: 'Hard',
    description: 'Hardcore mode where defeating players steals their hearts. One death and you\'re permanently removed.',
    features: [
      'Permadeath System',
      'Heart Stealing',
      'Extreme Loot',
      'Epic Battles',
      'Killstreak Bonuses'
    ],
    rewards: ['Legendary Items', 'Titles', 'Hall of Fame']
  },
  {
    id: 'battleroyale',
    name: 'Battle Royale',
    icon: ShieldCheck,
    color: 'minecraft-red',
    image: '/src/assets/gamemodes/battleroyale.png',
    difficulty: 'Extreme',
    description: 'Last player standing. A sprawling island filled with dynamic zones, loot, and edge-of-seat action.',
    features: [
      'Shrinking Safe Zones',
      'Dynamic Loot Drops',
      'Air Strike Finale',
      'Limited Respawns',
      'Seasonal Leaderboard'
    ],
    rewards: ['Flight Permits', 'Battle Skins', 'Lifetime BR Rank']
  }
];

export function Gamemodes() {
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
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-pixel text-4xl sm:text-5xl mb-4 text-minecraft-accent text-center">
            Choose Your Adventure
          </h1>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Eclipse Minecraft offers diverse gamemodes to suit every playstyle. Whether you prefer peaceful building or intense competition, we have something for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {gamemodes.map((mode) => {
              const Icon = mode.icon;
              return (
                <div
                  key={mode.id}
                  className="group relative bg-gradient-to-br from-minecraft-dark/60 to-minecraft-dark/40 border border-minecraft-accent/20 rounded-2xl overflow-hidden backdrop-blur-lg transition-all duration-300 hover:shadow-xl hover:border-minecraft-accent/40"
                >
                  <div className="h-56 bg-minecraft-dark/30 overflow-hidden relative">
                    <img
                      src={mode.image}
                      alt={mode.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-minecraft-dark via-minecraft-dark/50 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <div className="bg-minecraft-accent/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-minecraft-dark font-bold">
                        {mode.difficulty}
                      </div>
                    </div>
                  </div>
                  <div className="p-8 relative">
                    <div className="absolute -top-6 left-8">
                      <div className="bg-minecraft-dark/80 backdrop-blur-md p-3 rounded-xl border border-minecraft-accent/30">
                        <Icon className="text-minecraft-accent" size={32} />
                      </div>
                    </div>
                    
                    <div className="mt-4 mb-6">
                      <h2 className="text-3xl font-bold text-minecraft-green mb-2">{mode.name}</h2>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {mode.description}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-minecraft-accent mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-minecraft-accent rounded-full" />
                        Features
                      </h3>
                      <div className="grid grid-cols-1 gap-2">
                        {mode.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3 group">
                            <div className="w-1.5 h-1.5 bg-minecraft-green rounded-full group-hover:scale-150 transition-transform" />
                            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-sm font-bold text-minecraft-accent mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-minecraft-accent rounded-full" />
                        Rewards
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {mode.rewards.map((reward, i) => (
                          <span
                            key={i}
                            className="text-xs bg-gradient-to-r from-minecraft-accent/10 to-minecraft-green/10 border border-minecraft-accent/30 px-3 py-1.5 rounded-full text-minecraft-accent hover:border-minecraft-accent/60 hover:text-white transition-all duration-300"
                          >
                            {reward}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="accent"
                      className="w-full font-bold py-3 rounded-xl transition-all duration-300"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
