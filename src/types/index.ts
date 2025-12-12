export interface Gamemode {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  features: string[];
  rewards: string[];
}

export interface RankTier {
  id: string;
  name: string;
  price: number;
  perks: string[];
  color: string;
  position: number;
}

export interface StoreItem {
  id: string;
  name: string;
  category: 'rank' | 'crate' | 'cosmetic' | 'booster' | 'pass';
  price: number;
  description: string;
  perks: string[];
  icon: string;
}

export interface CartItem {
  itemId: string;
  item: StoreItem;
  quantity: number;
}

export interface LeaderboardEntry {
  rank: number;
  playerName: string;
  playerUUID: string;
  value: number;
  secondaryValue?: number;
}

export interface StaffMember {
  id: string;
  username: string;
  rank: 'Owner' | 'Admin' | 'Moderator' | 'Helper';
  avatar: string;
  bio: string;
  joinDate: string;
  discord?: string;
  twitter?: string;
}

export interface Testimonial {
  id: string;
  playerName: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface ServerStats {
  id: string;
  onlinePlayers: number;
  maxPlayers: number;
  motd: string;
  updatedAt: string;
}

export interface VoteReward {
  id: string;
  voteCount: number;
  rewardName: string;
  rewardIcon: string;
}
