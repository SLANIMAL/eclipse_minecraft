import { BadgeDollarSign, Mail, MessageSquare, Pickaxe, Radio, Users } from 'lucide-react';

const footerLinks = [
  {
    heading: 'Network',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Gamemodes', href: '/gamemodes' },
      { label: 'Store', href: '/store' },
      { label: 'Vote', href: '/vote' },
    ],
  },
  {
    heading: 'Community',
    links: [
      { label: 'Leaderboards', href: '/leaderboards' },
      { label: 'About', href: '/about' },
      { label: 'Features', href: '/features' },
    ],
  },
];

const socialLinks = [
  {
    label: 'Discord',
    href: 'https://discord.gg/eclipse',
    icon: MessageSquare,
  },
  {
    label: 'Support',
    href: 'mailto:support@eclipse-network.gg',
    icon: Mail,
  },
];

const statHighlights = [
  {
    label: 'Community',
    value: '62K+',
    icon: Users,
    subtext: 'Monthly adventurers',
  },
  {
    label: 'Economy',
    value: '4.5M',
    icon: BadgeDollarSign,
    subtext: 'Coins traded this season',
  },
  {
    label: 'Events',
    value: '24',
    icon: Pickaxe,
    subtext: 'Unique quests available',
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 bg-gradient-to-b from-[#04070D] via-[#03050A] to-[#010308] border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.15),_transparent_60%)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 py-16 text-sm text-gray-400">
        <div className="grid gap-12 lg:grid-cols-[2fr,3fr]">
          <div className="space-y-8">
            <div>
              <p className="font-pixel text-2xl text-white tracking-[0.3em]">ECLIPSE NETWORK</p>
              <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-sm">
                A next-generation Minecraft universe blending high-stakes gamemodes, cinematic storytelling, and a player-driven economy. Built for dreamers and competitive legends alike.
              </p>
            </div>

            <div className="grid gap-3">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="font-medium text-white">
                  play.eclipsemc.me <span className="text-xs text-gray-500">• Java & Bedrock 1.20+</span>
                </p>
              </div>
              <div className="flex gap-4 flex-wrap">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:border-minecraft-accent/50 hover:text-white transition-colors"
                  >
                    <Icon size={16} />
                    <span className="uppercase text-xs tracking-[0.2em]">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {statHighlights.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-4">
                  <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-[0.3em]">
                    <stat.icon size={14} className="text-minecraft-accent" />
                    {stat.label}
                  </div>
                  <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.subtext}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {footerLinks.map((section) => (
              <div key={section.heading}>
                <h3 className="font-pixel text-minecraft-accent text-sm mb-5 uppercase tracking-[0.4em]">
                  {section.heading}
                </h3>
                <ul className="space-y-3 text-sm">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-minecraft-accent" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-minecraft-accent uppercase text-xs tracking-[0.4em]">
                <Radio size={16} />
                Broadcasts
              </div>
              <p className="text-white text-base leading-relaxed">
                “Void Siege weekly event starts Friday • Diorite Citadel raid tickets on sale now • Double boosters activate this weekend.”
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Live broadcast feed
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-6 flex flex-col sm:flex-row gap-4 items-center justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Eclipse Network. Not affiliated with Mojang Studios.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="/status" className="hover:text-white transition-colors">
              Status
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
