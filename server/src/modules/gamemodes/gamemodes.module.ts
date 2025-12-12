import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { GamemodesController } from './gamemodes.controller';
import { GamemodesService } from './gamemodes.service';

@Module({
  imports: [PrismaModule],
  controllers: [GamemodesController],
  providers: [GamemodesService],
  exports: [GamemodesService],
})
export class GamemodesModule {}
