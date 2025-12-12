import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { MinecraftService } from '../../minecraft/minecraft.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { VOTE_PLATFORMS, VotePlatform, getVotePlatform } from './vote-platforms';

@Injectable()
export class VotesService {
  constructor(private readonly prisma: PrismaService, private readonly minecraftService: MinecraftService) {}

  listPlatforms() {
    return VOTE_PLATFORMS;
  }

  listRecent(limit = 25) {
    return this.prisma.vote.findMany({
      orderBy: {
        votedAt: 'desc',
      },
      take: limit,
    });
  }

  async create(dto: CreateVoteDto) {
    const platform = getVotePlatform(dto.serviceId);
    if (!platform) {
      throw new NotFoundException(`Unknown vote platform: ${dto.serviceId}`);
    }

    const vote = await this.prisma.vote.create({
      data: {
        username: dto.username,
        userId: dto.userId,
        serviceId: platform.id,
        serviceName: platform.name,
        ipAddress: dto.ip,
        rewardCoins: dto.rewardCoins ?? platform.rewardCoins,
      },
    });

    await this.minecraftService.processVote({
      username: dto.username,
      serviceName: platform.name,
      timestamp: dto.timestamp ?? Date.now(),
      ip: dto.ip ?? '0.0.0.0',
    });

    return vote;
  }

  async claimVote(profile: Profile, serviceId: string) {
    if (!profile.username) {
      throw new BadRequestException('Link your Minecraft username before voting');
    }

    const platform = getVotePlatform(serviceId);
    if (!platform) {
      throw new NotFoundException(`Unknown vote platform: ${serviceId}`);
    }

    const lastVote = await this.prisma.vote.findFirst({
      where: {
        userId: profile.id,
        serviceId: platform.id,
      },
      orderBy: {
        votedAt: 'desc',
      },
    });

    const cooldownMs = platform.cooldownHours * 60 * 60 * 1000;
    const now = Date.now();
    let cooldownActive = false;
    let nextVoteAt: Date | null = null;

    if (lastVote?.votedAt) {
      const nextAllowed = lastVote.votedAt.getTime() + cooldownMs;
      if (nextAllowed > now) {
        cooldownActive = true;
        nextVoteAt = new Date(nextAllowed);
      }
    }

    if (cooldownActive) {
      return {
        platform,
        cooldownActive: true,
        nextVoteAt,
      };
    }

    const vote = await this.create({
      username: profile.username,
      serviceId: platform.id,
      userId: profile.id,
      rewardCoins: platform.rewardCoins,
    });

    return {
      platform,
      cooldownActive: false,
      vote,
      redirectUrl: this.buildRedirectUrl(platform, profile.username),
    };
  }

  private buildRedirectUrl(platform: VotePlatform, username: string) {
    if (!platform.usernameParam) {
      return platform.url;
    }

    const separator = platform.url.includes('?') ? '&' : '?';
    return `${platform.url}${separator}${platform.usernameParam}=${encodeURIComponent(username)}`;
  }
}
