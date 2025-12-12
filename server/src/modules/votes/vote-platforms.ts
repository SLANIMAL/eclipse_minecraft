export interface VotePlatform {
  id: string;
  name: string;
  url: string;
  rewardCoins: number;
  icon: string;
  description: string;
  cooldownHours: number;
  usernameParam?: string;
}

export const VOTE_PLATFORMS: VotePlatform[] = [
  {
    id: 'minecraftservers',
    name: 'MinecraftServers.org',
    url: 'https://minecraftservers.org/server/xxxxxxxx/vote',
    rewardCoins: 500,
    icon: '🎮',
    description: 'Massive directory with daily vote rewards.',
    cooldownHours: 24,
    usernameParam: 'username',
  },
  {
    id: 'planetminecraft',
    name: 'PlanetMinecraft',
    url: 'https://www.planetminecraft.com/server/eclipse-network/vote/',
    rewardCoins: 500,
    icon: '🌍',
    description: 'Community-driven hub with strong exposure.',
    cooldownHours: 24,
    usernameParam: 'player',
  },
  {
    id: 'minecraft-mp',
    name: 'Minecraft-MP.com',
    url: 'https://minecraft-mp.com/server/xxxxxxxx/vote/',
    rewardCoins: 500,
    icon: '🗳️',
    description: 'Supports both Java & Bedrock vote tracking.',
    cooldownHours: 24,
    usernameParam: 'nickname',
  },
  {
    id: 'topg',
    name: 'TopG.org',
    url: 'https://topg.org/minecraft-servers/server-xxxxxxxx',
    rewardCoins: 750,
    icon: '⭐',
    description: 'Multi-game listing with strong incentives.',
    cooldownHours: 24,
    usernameParam: 'player',
  },
  {
    id: 'minecraftserverslist',
    name: 'MinecraftServersList',
    url: 'https://minecraftserverslist.org/server/eclipse-network/vote',
    rewardCoins: 500,
    icon: '📋',
    description: 'Clean UI and consistent Sri Lankan traffic.',
    cooldownHours: 24,
    usernameParam: 'username',
  },
  {
    id: 'mcslist',
    name: 'Minecraft-Server-List.com',
    url: 'https://minecraft-server-list.com/server/xxxxxxxx/vote/',
    rewardCoins: 750,
    icon: '🏆',
    description: 'Legacy list trusted by veteran players.',
    cooldownHours: 24,
    usernameParam: 'playername',
  },
  {
    id: 'minecraftlist',
    name: 'MinecraftList.org',
    url: 'https://minecraftlist.org/server/eclipse-network/vote',
    rewardCoins: 500,
    icon: '🧭',
    description: 'Modern UX with streak tracking support.',
    cooldownHours: 24,
    usernameParam: 'username',
  },
];

export function getVotePlatform(id: string): VotePlatform | undefined {
  return VOTE_PLATFORMS.find((platform) => platform.id === id);
}
