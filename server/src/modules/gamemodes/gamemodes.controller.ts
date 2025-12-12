import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GamemodesService } from './gamemodes.service';

@ApiTags('gamemodes')
@Controller('gamemodes')
export class GamemodesController {
  constructor(private readonly gamemodesService: GamemodesService) {}

  @Get()
  @ApiOperation({ summary: 'List available gamemodes' })
  @ApiResponse({ status: 200, description: 'Gamemodes retrieved successfully' })
  async findAll() {
    return this.gamemodesService.findAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get gamemode details by slug' })
  @ApiResponse({ status: 200, description: 'Gamemode retrieved successfully' })
  async findBySlug(@Param('slug') slug: string) {
    return this.gamemodesService.findBySlug(slug);
  }
}
