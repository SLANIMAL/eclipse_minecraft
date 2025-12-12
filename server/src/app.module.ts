import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { validationSchema } from './config/validation';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { GamemodesModule } from './modules/gamemodes/gamemodes.module';
import { StoreModule } from './modules/store/store.module';
import { LeaderboardsModule } from './modules/leaderboards/leaderboards.module';
import { VotesModule } from './modules/votes/votes.module';
import { HealthModule } from './modules/health/health.module';
import { MinecraftModule } from './minecraft/minecraft.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
      envFilePath: ['.env', '../../.env'],
    }),
    PrismaModule,
    AuthModule,
    GamemodesModule,
    StoreModule,
    LeaderboardsModule,
    VotesModule,
    HealthModule,
    MinecraftModule,
  ],
})
export class AppModule {}
