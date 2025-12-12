import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LeaderboardsService } from './leaderboards.service';

@ApiTags('leaderboards')
@Controller('leaderboards')
export class LeaderboardsController {
  constructor(private readonly leaderboardsService: LeaderboardsService) {}

  @Get()
  @ApiOperation({ summary: 'Get leaderboard overview (coins, experience, votes)' })
  @ApiResponse({ status: 200, description: 'Leaderboards retrieved successfully' })
  getOverview() {
    return this.leaderboardsService.getOverview();
  }

  @Get('votes')
  @ApiOperation({ summary: 'Get top voters leaderboard' })
  @ApiResponse({ status: 200, description: 'Vote leaderboard retrieved successfully' })
  getTopVoters() {
    return this.leaderboardsService.getTopVoters();
  }
}
