import { Body, Controller, Get, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { StartGoogleLoginDto } from './dto/start-google-login.dto';
import { LinkProfileDto } from './dto/link-profile.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google/start')
  @ApiOperation({ summary: 'Start Google login process' })
  @ApiResponse({ status: 200, description: 'Returns redirect URL for Google login' })
  startGoogleLogin(@Body() dto: StartGoogleLoginDto) {
    return this.authService.startGoogleLogin(dto);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get linked Minecraft profile for current user' })
  @ApiResponse({ status: 200, description: 'Returns current profile (if any)' })
  async getProfile(@Headers('authorization') authorization?: string) {
    const token = this.extractBearerToken(authorization);
    const user = await this.authService.verifyAccessToken(token);
    const profile = await this.authService.getLinkedProfile(user);

    return {
      email: user.email,
      profile,
      linked: Boolean(profile?.username),
    };
  }

  @Post('profile/link')
  @ApiOperation({ summary: 'Link a Minecraft username to the current user' })
  @ApiResponse({ status: 200, description: 'Profile linked successfully' })
  async linkProfile(
    @Headers('authorization') authorization: string,
    @Body() dto: LinkProfileDto,
  ) {
    const token = this.extractBearerToken(authorization);
    const user = await this.authService.verifyAccessToken(token);
    const profile = await this.authService.linkMinecraftProfile(user, dto.minecraftUsername);

    return {
      profile,
      linked: true,
    };
  }

  private extractBearerToken(header?: string) {
    if (!header?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing authorization token');
    }
    return header.slice('Bearer '.length);
  }
}
