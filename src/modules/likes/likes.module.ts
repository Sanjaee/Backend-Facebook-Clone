import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { PrismaService } from '../prisma/prisma.service';
import { LikeController } from './likes.controller';

@Module({
  providers: [LikesService, PrismaService],
  controllers: [LikeController],
})
export class LikesModule {}
