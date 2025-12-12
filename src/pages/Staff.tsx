import { Mail, MessageSquare } from 'lucide-react';

const staffMembers = [
  {
    rank: 'Owner',
    members: [
      {
        name: 'SkyMaster',
        avatar: '👑',
        bio: 'Founder of Eclipse Minecraft. Passionate about creating the best server experience.',
        joinDate: '2020',
        discord: '@skymaster',
      }
    ]
  },
  {
    rank: 'Admins',
    members: [
      {
        name: 'IceWizard',
        avatar: '❄️',
        bio: 'Senior admin focused on server stability and security.',
        joinDate: '2020',
        discord: '@icewizard',
      },
      {
        name: 'FireKnight',
        avatar: '🔥',
        bio: 'Lead developer and technical lead for Eclipse Minecraft.',
        joinDate: '2021',
        discord: '@fireknight',
      }
    ]
  },
  {
    rank: 'Moderators',
    members: [
      {
        name: 'NightGuard',
        avatar: '🌙',
        bio: 'Moderator handling late-night shifts and community support.',
        joinDate: '2021',
        discord: '@nightguard',
      },
      {
        name: 'SunBringer',
        avatar: '☀️',
        bio: 'Community moderator and event organizer.',
        joinDate: '2022',
        discord: '@sunbringer',
      },
      {
        name: 'LunaKeeper',
        avatar: '✨',
        bio: 'Chat moderator focused on maintaining a positive community.',
        joinDate: '2022',
        discord: '@lunakeeper',
      }
    ]
  },
  {
    rank: 'Helpers',
    members: [
      {
        name: 'EchoVoice',
        avatar: '📢',
        bio: 'New player helper assisting with questions and guides.',
        joinDate: '2023',
        discord: '@echovoice',
      },
      {
        name: 'StarLight',
        avatar: '⭐',
        bio: 'Support specialist helping players with technical issues.',
        joinDate: '2023',
        discord: '@starlight',
      }
    ]
  }
];

export function Staff() {
  return (
    <div className="min-h-screen bg-gradient-minecraft text-white">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-pixel text-4xl sm:text-5xl mb-4 text-minecraft-accent text-center">
            Meet The Team
          </h1>
          <p className="text-gray-400 text-center mb-16">
            Dedicated staff members working to make Eclipse Minecraft amazing
          </p>

          {staffMembers.map((section, idx) => (
            <div key={idx} className="mb-16">
              <h2 className="font-pixel text-2xl mb-8 text-minecraft-green">{section.rank}s</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.members.map((member, i) => (
                  <div
                    key={i}
                    className="bg-minecraft-dark/50 border border-minecraft-accent/30 rounded-lg p-6 backdrop-blur-md hover:border-minecraft-accent transition-all"
                  >
                    <div className="text-5xl mb-4">{member.avatar}</div>
                    <h3 className="text-xl font-bold text-minecraft-green mb-1">{member.name}</h3>
                    <p className="text-sm text-minecraft-accent mb-4 font-mono">{section.rank}</p>
                    <p className="text-sm text-gray-400 mb-6 leading-relaxed">{member.bio}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <span>Joined: {member.joinDate}</span>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`#${member.discord}`}
                        className="flex-1 bg-minecraft-accent/10 border border-minecraft-accent/30 hover:bg-minecraft-accent/20 transition-colors rounded px-3 py-2 text-sm flex items-center justify-center gap-2 text-minecraft-accent"
                      >
                        <MessageSquare size={14} />
                        Discord
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-minecraft-accent/10 border border-minecraft-accent/30 rounded-lg p-8 backdrop-blur-md">
            <h2 className="font-pixel text-2xl mb-4 text-minecraft-green">Join Our Team</h2>
            <p className="text-gray-300 mb-4">
              Interested in joining our staff team? We're always looking for passionate, dedicated players who want to help our community.
            </p>
            <ul className="space-y-2 text-gray-300 mb-6 text-sm">
              <li>• Must be 18+ years old</li>
              <li>• Active member with good standing</li>
              <li>• Excellent communication skills</li>
              <li>• Available for at least 10 hours per week</li>
              <li>• Discord and Minecraft Java required</li>
            </ul>
            <a
              href="#applications"
              className="inline-flex items-center gap-2 bg-minecraft-accent text-minecraft-dark px-6 py-3 rounded-lg font-bold hover:shadow-neon-cyan transition-all"
            >
              <Mail size={18} />
              Apply Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
