import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  listCategories() {
    return this.prisma.storeCategory.findMany({
      orderBy: { createdAt: 'asc' },
    });
  }

  listItems(categorySlug?: string) {
    return this.prisma.storeItem.findMany({
      where: categorySlug
        ? {
            category: {
              slug: categorySlug,
            },
          }
        : undefined,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async getItem(id: string) {
    const item = await this.prisma.storeItem.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!item) {
      throw new NotFoundException(`Store item ${id} not found`);
    }

    return item;
  }
}
