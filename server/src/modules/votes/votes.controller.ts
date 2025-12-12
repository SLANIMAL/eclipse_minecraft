import { BadRequestException, Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../auth/auth.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { ClaimVoteDto } from './dto/claim-vote.dto';
import { VotesService } from './votes.service';

@ApiTags('votes')
@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService, private readonly authService: AuthService) {}

  @Get()
  @ApiOperation({ summary: 'List recent votes' })
  @ApiResponse({ status: 200, description: 'Votes retrieved successfully' })
  listRecent() {
    return this.votesService.listRecent();
  }

  @Get('platforms')
  @ApiOperation({ summary: 'List supported vote platforms' })
  @ApiResponse({ status: 200, description: 'Platforms retrieved successfully' })
  listPlatforms() {
    return this.votesService.listPlatforms();
  }

  @Post()
  @ApiOperation({ summary: 'Create a vote entry (admin/internal use)' })
  @ApiResponse({ status: 201, description: 'Vote recorded successfully' })
  create(@Body() dto: CreateVoteDto) {
    return this.votesService.create(dto);
  }

  @Post('claim')
  @ApiOperation({ summary: 'Claim a vote reward & receive redirect URL' })
  @ApiResponse({ status: 200, description: 'Vote claim processed' })
  async claimVote(@Headers('authorization') authorization: string, @Body() dto: ClaimVoteDto) {
    const token = this.extractBearerToken(authorization);
    const user = await this.authService.verifyAccessToken(token);
    const profile = await this.authService.getLinkedProfile(user);

    if (!profile) {
      throw new BadRequestException('Please link your Minecraft username before voting.');
    }

    return this.votesService.claimVote(profile, dto.serviceId);
  }

  private extractBearerToken(header?: string) {
    if (!header?.startsWith('Bearer ')) {
      throw new BadRequestException('Missing authorization token');
    }
    return header.slice('Bearer '.length);
  }
}
