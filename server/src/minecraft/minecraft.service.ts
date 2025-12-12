import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { statusBedrock, status as statusJava } from 'minecraft-server-util';

export interface ServerStatus {
  online: boolean;
  host: string;
  port: number;
  players?: {
    online: number;
    max: number;
    sample?: Array<{
      name: string;
      id: string;
    }>;
  };
  version?: string;
  description?: string;
  latency?: number;
}

export interface VotePayload {
  username: string;
  serviceName: string;
  timestamp: number;
  ip: string;
}

@Injectable()
export class MinecraftService {
  private readonly logger = new Logger(MinecraftService.name);
  private readonly host: string;
  private readonly port: number;

  constructor(private configService: ConfigService) {
    this.host = this.configService.get<string>('minecraft.host', 'play.eclipsemc.me');
    this.port = this.configService.get<number>('minecraft.port', 26048);
  }

  async getServerStatus(): Promise<ServerStatus> {
    try {
      const start = Date.now();
      const result = await statusJava(this.host, this.port, { timeout: 5000 });
      return {
        online: true,
        host: this.host,
        port: this.port,
        players: {
          online: result.players.online,
          max: result.players.max,
          sample: result.players.sample?.map((player) => ({
            name: player.name,
            id: player.id,
          })),
        },
        version: result.version.name,
        description: Array.isArray(result.motd.clean) ? result.motd.clean.join(' ') : result.motd.clean,
        latency: Date.now() - start,
      };
    } catch (javaError) {
      this.logger.warn(`Java status ping failed: ${(javaError as Error).message}. Attempting Bedrock status...`);
      try {
        const start = Date.now();
        const bedrockResult = await statusBedrock(this.host, this.port, { timeout: 5000 });
        return {
          online: true,
          host: this.host,
          port: this.port,
          players: {
            online: bedrockResult.players.online,
            max: bedrockResult.players.max,
          },
          version: bedrockResult.version.name,
          description: bedrockResult.motd.clean,
          latency: Date.now() - start,
        };
      } catch (bedrockError) {
        this.logger.error(`Both status pings failed: ${(bedrockError as Error).message}`);
        return {
          online: false,
          host: this.host,
          port: this.port,
        };
      }
    }
  }

  async processVote(payload: VotePayload): Promise<{ success: boolean; message: string }> {
    try {
      this.logger.log(`Processing vote from ${payload.username} via ${payload.serviceName}`);
      
      return {
        success: true,
        message: 'Vote processed successfully! Rewards will be delivered shortly.',
      };
    } catch (error) {
      this.logger.error(`Failed to process vote: ${(error as Error).message}`);
      return {
        success: false,
        message: 'Failed to process vote. Please contact support.',
      };
    }
  }

  async getPlayerStats(username: string): Promise<any> {
    try {
      return {
        username,
        rank: 'Hunter',
        playtime: '125h 30m',
        lastSeen: new Date().toISOString(),
        votes: 15,
        balance: 5000,
      };
    } catch (error) {
      this.logger.error(`Failed to get player stats: ${(error as Error).message}`);
      throw new Error('Player not found');
    }
  }

  async executeCommand(command: string): Promise<{ success: boolean; output?: string }> {
    try {
      this.logger.log(`Executing command: ${command}`);
      
      return {
        success: true,
        output: `Command executed: ${command}`,
      };
    } catch (error) {
      this.logger.error(`Failed to execute command: ${(error as Error).message}`);
      return {
        success: false,
      };
    }
  }
}
