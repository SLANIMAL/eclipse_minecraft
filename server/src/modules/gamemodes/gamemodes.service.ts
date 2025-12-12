import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GamemodesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.gamemode.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        features: true,
        rewards: true,
      },
    });
  }

  async findBySlug(slug: string) {
    const gamemode = await this.prisma.gamemode.findUnique({
      where: { slug },
      include: {
        features: true,
        rewards: true,
      },
    });

    if (!gamemode) {
      throw new NotFoundException(`Gamemode ${slug} not found`);
    }

    return gamemode;
  }
}
