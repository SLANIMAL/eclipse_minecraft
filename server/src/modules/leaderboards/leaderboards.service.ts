import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LeaderboardsService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview(limit = 10) {
    const [topCoins, topExperience, topVoters] = await Promise.all([
      this.prisma.profile.findMany({
        orderBy: { coins: 'desc' },
        take: limit,
        select: { id: true, username: true, coins: true, rank: true },
      }),
      this.prisma.profile.findMany({
        orderBy: { experience: 'desc' },
        take: limit,
        select: { id: true, username: true, experience: true, level: true },
      }),
      this.prisma.vote.groupBy({
        by: ['username'],
        _count: { username: true },
        orderBy: { _count: { username: 'desc' } },
        take: limit,
      }),
    ]);

    return {
      topCoins,
      topExperience,
      topVoters: topVoters.map((entry) => ({
        username: entry.username,
        votes: entry._count.username,
      })),
    };
  }

  async getTopVoters(limit = 50) {
    const topVoters = await this.prisma.vote.groupBy({
      by: ['username'],
      _count: { username: true },
      orderBy: { _count: { username: 'desc' } },
      take: limit,
    });

    return topVoters.map((entry, index) => ({
      rank: index + 1,
      username: entry.username,
      votes: entry._count.username,
    }));
  }
}
