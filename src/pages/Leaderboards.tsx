import { useState } from 'react';
import { Search, Sword, Clock, TrendingUp, Trophy } from 'lucide-react';

const leaderboardData = {
  kills: [
    { rank: 1, name: 'PvPKing', value: 4825, secondary: 1.95 },
    { rank: 2, name: 'WarriorZ', value: 4120, secondary: 2.15 },
    { rank: 3, name: 'CombatMaster', value: 3890, secondary: 1.87 },
    { rank: 4, name: 'SlayerX', value: 3652, secondary: 1.72 },
    { rank: 5, name: 'DeathDealer', value: 3445, secondary: 1.61 },
  ],
  playtime: [
    { rank: 1, name: 'GrindMaster', value: 2840, secondary: 118.3 },
    { rank: 2, name: 'Dedicated99', value: 2650, secondary: 110.4 },
    { rank: 3, name: 'HourlyPlayer', value: 2510, secondary: 104.6 },
    { rank: 4, name: 'NoLife', value: 2340, secondary: 97.5 },
    { rank: 5, name: 'ForeverOnline', value: 2180, secondary: 90.8 },
  ],
  richest: [
    { rank: 1, name: 'MoneyMan', value: 15500000, secondary: 85 },
    { rank: 2, name: 'RichPLayer', value: 14200000, secondary: 78 },
    { rank: 3, name: 'CashFlow', value: 12800000, secondary: 72 },
    { rank: 4, name: 'BankRoll', value: 11500000, secondary: 68 },
    { rank: 5, name: 'Wealthy', value: 10200000, secondary: 61 },
  ],
  votes: [
    { rank: 1, name: 'VoteLord', value: 2850, secondary: 95 },
    { rank: 2, name: 'Voter123', value: 2720, secondary: 91 },
    { rank: 3, name: 'CommunityGuy', value: 2645, secondary: 88 },
    { rank: 4, name: 'VoteKing', value: 2510, secondary: 84 },
    { rank: 5, name: 'SupportVoter', value: 2398, secondary: 80 },
  ],
};

export function Leaderboards() {
  const [activeTab, setActiveTab] = useState<'kills' | 'playtime' | 'richest' | 'votes'>('kills');
  const [searchTerm, setSearchTerm] = useState('');

  const currentData = leaderboardData[activeTab];
  const filtered = currentData.filter(entry =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIcon = (tab: string) => {
    switch (tab) {
      case 'kills': return <Sword size={20} />;
      case 'playtime': return <Clock size={20} />;
      case 'richest': return <TrendingUp size={20} />;
      case 'votes': return <Trophy size={20} />;
      default: return null;
    }
  };

  const getLabel = (tab: string) => {
    switch (tab) {
      case 'kills': return 'Kills';
      case 'playtime': return 'Hours';
      case 'richest': return 'Currency';
      case 'votes': return 'Votes';
      default: return '';
    }
  };

  const getSecondaryLabel = (tab: string) => {
    switch (tab) {
      case 'kills': return 'K/D Ratio';
      case 'playtime': return 'Hours';
      case 'richest': return 'Level';
      case 'votes': return 'Streak';
      default: return '';
    }
  };

  const formatValue = (tab: string, value: number) => {
    if (tab === 'richest') {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (tab === 'playtime') {
      return value.toFixed(1);
    }
    return value.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-minecraft text-white">
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-pixel text-4xl sm:text-5xl mb-4 text-minecraft-accent text-center">
            Leaderboards
          </h1>
          <p className="text-gray-400 text-center mb-16">
            Compete with other players and claim your spot at the top
          </p>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-64">
              <div className="space-y-3">
                {['kills', 'playtime', 'richest', 'votes'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`w-full px-6 py-4 rounded-lg transition-all flex items-center gap-3 ${
                      activeTab === tab
                        ? 'bg-minecraft-accent text-minecraft-dark font-bold'
                        : 'bg-minecraft-dark/50 border border-minecraft-accent/30 text-gray-300 hover:border-minecraft-accent'
                    }`}
                  >
                    {getIcon(tab)}
                    <span className="capitalize">{tab === 'richest' ? 'Richest' : tab}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-6 relative">
                <Search className="absolute left-3 top-3 text-minecraft-accent" size={20} />
                <input
                  type="text"
                  placeholder="Search player..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-minecraft-dark/50 border border-minecraft-accent/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-minecraft-accent transition-colors"
                />
              </div>

              <div className="bg-minecraft-dark/50 border border-minecraft-accent/30 rounded-lg backdrop-blur-md overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-6 bg-minecraft-darker border-b border-minecraft-accent/20 font-bold text-minecraft-accent">
                  <div className="col-span-1">#</div>
                  <div className="col-span-4">Player</div>
                  <div className="col-span-3 text-right">{getLabel(activeTab)}</div>
                  <div className="col-span-4 text-right">{getSecondaryLabel(activeTab)}</div>
                </div>

                <div className="divide-y divide-minecraft-accent/10">
                  {filtered.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                      No players found matching your search
                    </div>
                  ) : (
                    filtered.map((entry, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-minecraft-accent/5 transition-colors"
                      >
                        <div className="col-span-1">
                          <div className={`w-8 h-8 flex items-center justify-center rounded font-bold ${
                            entry.rank === 1
                              ? 'bg-minecraft-gold text-minecraft-dark'
                              : entry.rank === 2
                              ? 'bg-gray-400 text-minecraft-dark'
                              : entry.rank === 3
                              ? 'bg-orange-600 text-white'
                              : 'bg-minecraft-accent/20 text-minecraft-accent'
                          }`}>
                            {entry.rank}
                          </div>
                        </div>
                        <div className="col-span-4">
                          <p className="font-bold text-minecraft-green">{entry.name}</p>
                        </div>
                        <div className="col-span-3 text-right">
                          <p className="font-bold text-minecraft-accent">
                            {formatValue(activeTab, entry.value)}
                          </p>
                        </div>
                        <div className="col-span-4 text-right">
                          <p className="text-gray-400 text-sm">
                            {entry.secondary}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
