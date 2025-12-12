import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

import { PrismaService } from '../../prisma/prisma.service';
import { Profile } from '@prisma/client';

import { StartGoogleLoginDto } from './dto/start-google-login.dto';

@Injectable()
export class AuthService {
  private readonly supabase?: SupabaseClient;

  constructor(private readonly configService: ConfigService, private readonly prisma: PrismaService) {
    const supabaseUrl = this.configService.get<string>('supabase.url');
    const serviceRoleKey = this.configService.get<string>('supabase.serviceRoleKey');

    if (supabaseUrl && serviceRoleKey) {
      this.supabase = createClient(supabaseUrl, serviceRoleKey);
    }
  }

  async startGoogleLogin(dto: StartGoogleLoginDto) {
    if (!this.supabase) {
      throw new InternalServerErrorException('Supabase is not configured');
    }

    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: dto.redirectUri,
      },
    });

    if (error || !data.url) {
      throw new InternalServerErrorException(error?.message ?? 'Failed to start Google login');
    }

    return {
      url: data.url,
    };
  }

  async verifyAccessToken(token: string): Promise<User> {
    if (!this.supabase) {
      throw new InternalServerErrorException('Supabase is not configured');
    }

    const { data, error } = await this.supabase.auth.getUser(token);

    if (error || !data?.user) {
      throw new UnauthorizedException('Invalid or expired session');
    }

    return data.user;
  }

  isUserAdmin(user: User): boolean {
    const appMetadata = user.app_metadata ?? {};
    if (appMetadata.role && typeof appMetadata.role === 'string') {
      if (appMetadata.role.toLowerCase() === 'admin') {
        return true;
      }
    }

    if (Array.isArray(appMetadata.roles) && appMetadata.roles.some((role) => role?.toLowerCase?.() === 'admin')) {
      return true;
    }

    if (typeof appMetadata.isAdmin === 'boolean') {
      return appMetadata.isAdmin;
    }

    return false;
  }

  ensureAdmin(user: User) {
    if (!this.isUserAdmin(user)) {
      throw new ForbiddenException('Admin privileges required');
    }
  }

  async getLinkedProfile(user: User): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: { authId: user.id },
    });
  }

  async linkMinecraftProfile(user: User, minecraftUsername: string): Promise<Profile> {
    const normalizedUsername = minecraftUsername.trim();
    if (!normalizedUsername) {
      throw new BadRequestException('Minecraft username is required');
    }

    const existingUsername = await this.prisma.profile.findUnique({
      where: { username: normalizedUsername },
    });

    if (existingUsername && existingUsername.authId !== user.id) {
      throw new ConflictException('This Minecraft username is already linked to another account');
    }

    const profile = await this.prisma.profile.upsert({
      where: { authId: user.id },
      update: {
        username: normalizedUsername,
        updatedAt: new Date(),
      },
      create: {
        authId: user.id,
        username: normalizedUsername,
      },
    });

    return profile;
  }
}
