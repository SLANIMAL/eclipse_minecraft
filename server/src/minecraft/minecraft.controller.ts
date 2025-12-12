import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MinecraftService, VotePayload } from './minecraft.service';

@ApiTags('minecraft')
@Controller('minecraft')
export class MinecraftController {
  constructor(private readonly minecraftService: MinecraftService) {}

  @Get('status')
  @ApiOperation({ summary: 'Get Minecraft server status' })
  @ApiResponse({ status: 200, description: 'Server status retrieved successfully' })
  async getServerStatus() {
    return this.minecraftService.getServerStatus();
  }

  @Post('vote')
  @ApiOperation({ summary: 'Process a player vote' })
  @ApiResponse({ status: 200, description: 'Vote processed successfully' })
  async processVote(@Body() votePayload: VotePayload) {
    return this.minecraftService.processVote(votePayload);
  }

  @Get('player/:username')
  @ApiOperation({ summary: 'Get player statistics' })
  @ApiResponse({ status: 200, description: 'Player stats retrieved successfully' })
  async getPlayerStats(@Param('username') username: string) {
    return this.minecraftService.getPlayerStats(username);
  }

  @Post('command')
  @ApiOperation({ summary: 'Execute server command (admin only)' })
  @ApiResponse({ status: 200, description: 'Command executed successfully' })
  async executeCommand(@Body('command') command: string) {
    return this.minecraftService.executeCommand(command);
  }
}
