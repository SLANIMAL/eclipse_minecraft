import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const rules = [
  {
    category: 'General Rules',
    rules: [
      'Respect all players and staff members at all times',
      'Do not use offensive language or slurs of any kind',
      'No harassment, bullying, or hate speech',
      'Do not impersonate other players or staff',
      'No spam or flooding of chat',
      'Keep conversations family-friendly',
    ]
  },
  {
    category: 'Chat Rules',
    rules: [
      'Advertising other servers is strictly prohibited',
      'Do not ask for items, money, or ranks',
      'Avoid excessive caps lock (KEEP IT LOWERCASE)',
      'No political or religious debates',
      'No adult content or NSFW links',
      'Report issues privately via tickets, not in chat',
    ]
  },
  {
    category: 'PvP Rules',
    rules: [
      'No teaming in solo modes',
      'No combat logging (leaving during combat)',
      'No glitch exploitation for advantage',
      'Respect duels and honor agreements',
      'No spawn camping in contested areas',
      'Report hacking immediately',
    ]
  },
  {
    category: 'Survival Rules',
    rules: [
      'No griefing other players\' properties',
      'Use /region claim to protect your builds',
      'No intentional lag machines or entities',
      'No lag traps or redstone farms without permission',
      'Respect claimed territory signs',
      'No stealing from players or shops',
    ]
  },
];

const punishments = [
  { offense: 'Mild language/spam', first: '5m mute', second: '30m mute', third: 'Kick' },
  { offense: 'Harassment/bullying', first: '1h mute', second: '24h mute', third: '7d ban' },
  { offense: 'Griefing', first: 'Warning', second: '24h ban', third: 'Permanent ban' },
  { offense: 'Cheating/Hacking', first: '30d ban', second: 'Permanent ban', third: 'IP ban' },
  { offense: 'Advertising', first: 'Kick', second: '7d ban', third: 'Permanent ban' },
];

export function Rules() {
  const [expandedCategory, setExpandedCategory] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-minecraft text-white">
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-pixel text-4xl sm:text-5xl mb-4 text-minecraft-accent text-center">
            Server Rules
          </h1>
          <p className="text-gray-400 text-center mb-16">
            Read and understand our rules to have the best experience on Eclipse Minecraft
          </p>

          <div className="space-y-4 mb-16">
            {rules.map((section, idx) => (
              <div
                key={idx}
                className="bg-minecraft-dark/50 border border-minecraft-accent/30 rounded-lg backdrop-blur-md overflow-hidden"
              >
                <button
                  onClick={() => setExpandedCategory(expandedCategory === idx ? -1 : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-minecraft-accent/10 transition-colors"
                >
                  <h2 className="font-pixel text-lg text-minecraft-green">{section.category}</h2>
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${expandedCategory === idx ? 'rotate-180' : ''}`}
                  />
                </button>

                {expandedCategory === idx && (
                  <div className="px-6 pb-4 border-t border-minecraft-accent/20 space-y-3">
                    {section.rules.map((rule, i) => (
                      <div key={i} className="flex gap-3 text-gray-300">
                        <span className="text-minecraft-accent font-bold min-w-fit">•</span>
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-minecraft-accent/10 border border-minecraft-accent/30 rounded-lg p-8 backdrop-blur-md mb-16">
            <h2 className="font-pixel text-2xl mb-6 text-minecraft-green">Punishment Guidelines</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-minecraft-accent/20">
                    <th className="text-left py-3 px-4 text-minecraft-accent font-bold">Offense</th>
                    <th className="text-left py-3 px-4 text-minecraft-accent font-bold">1st Offense</th>
                    <th className="text-left py-3 px-4 text-minecraft-accent font-bold">2nd Offense</th>
                    <th className="text-left py-3 px-4 text-minecraft-accent font-bold">3rd+ Offense</th>
                  </tr>
                </thead>
                <tbody>
                  {punishments.map((row, i) => (
                    <tr key={i} className="border-b border-minecraft-accent/10 hover:bg-minecraft-accent/5">
                      <td className="py-3 px-4 text-minecraft-green font-bold">{row.offense}</td>
                      <td className="py-3 px-4 text-gray-400">{row.first}</td>
                      <td className="py-3 px-4 text-gray-400">{row.second}</td>
                      <td className="py-3 px-4 text-minecraft-red font-bold">{row.third}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-minecraft-dark/50 border border-minecraft-accent/30 rounded-lg p-8 backdrop-blur-md">
            <h2 className="font-pixel text-2xl mb-4 text-minecraft-green">Appeals & Disputes</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                If you believe you have been wrongly punished, you can submit an appeal through our Discord server.
              </p>
              <p>
                • Visit <span className="text-minecraft-accent">appeals.eclipseminecraft.net</span>
              </p>
              <p>
                • Join our Discord and open a ticket in <span className="text-minecraft-accent">#appeals</span>
              </p>
              <p>
                • Provide clear evidence and reasoning for your appeal
              </p>
              <p className="text-sm text-gray-500 mt-6">
                Note: False appeals may result in additional penalties. Please be honest and respectful during the appeal process.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
