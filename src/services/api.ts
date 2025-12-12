const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface ServerStatus {
  online: boolean;
  host: string;
  port: number;
  players?: {
    online: number;
    max: number;
  };
  version?: string;
  description?: string;
  latency?: number;
}

export interface PlayerStats {
  username: string;
  rank: string;
  playtime: string;
  lastSeen: string;
  votes: number;
  balance: number;
}

export interface VotePayload {
  username: string;
  serviceName: string;
  timestamp: number;
  ip: string;
}

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

export interface VoteClaimResponse {
  platform: VotePlatform;
  cooldownActive: boolean;
  nextVoteAt?: string;
  redirectUrl?: string;
}

export interface LinkedProfileResponse {
  email: string | null;
  profile: {
    id: string;
    username: string | null;
    rank?: string | null;
  } | null;
  linked: boolean;
}

export interface LinkProfileResponse {
  profile: {
    id: string;
    username: string | null;
    rank?: string | null;
  };
  linked: boolean;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const { headers: optionHeaders, ...restOptions } = options;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...optionHeaders,
      },
      ...restOptions,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getServerStatus(): Promise<ServerStatus> {
    return this.request<ServerStatus>('/minecraft/status');
  }

  async getPlayerStats(username: string): Promise<PlayerStats> {
    return this.request<PlayerStats>(`/minecraft/player/${username}`);
  }

  async processVote(voteData: VotePayload): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>('/minecraft/vote', {
      method: 'POST',
      body: JSON.stringify(voteData),
    });
  }

  async executeCommand(command: string): Promise<{ success: boolean; output?: string }> {
    return this.request<{ success: boolean; output?: string }>('/minecraft/command', {
      method: 'POST',
      body: JSON.stringify({ command }),
    });
  }

  async getVotePlatforms(): Promise<VotePlatform[]> {
    return this.request<VotePlatform[]>('/votes/platforms');
  }

  async claimVote(serviceId: string, accessToken: string): Promise<VoteClaimResponse> {
    return this.request<VoteClaimResponse>('/votes/claim', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ serviceId }),
    });
  }

  async getLinkedProfile(accessToken: string): Promise<LinkedProfileResponse> {
    return this.request<LinkedProfileResponse>('/auth/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async linkMinecraftProfile(minecraftUsername: string, accessToken: string): Promise<LinkProfileResponse> {
    return this.request<LinkProfileResponse>('/auth/profile/link', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ minecraftUsername }),
    });
  }
}

export const apiService = new ApiService();
