import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';
import {  LikesModule } from './modules/likes/likes.module';
import { ChatModule } from './modules/chat/chat.module';


@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    PostsModule,
    CommentsModule,
    LikesModule, 
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
