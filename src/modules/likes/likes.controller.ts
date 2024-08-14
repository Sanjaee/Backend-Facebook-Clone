import { Controller, Post, Delete, Param, Body, Get } from '@nestjs/common';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikeController {
  constructor(private readonly likesService: LikesService) {}


  @Get('count/post/:postId')
  async getLikesCountOnPost(@Param('postId') postId: string) {
    return this.likesService.countLikesOnPost(postId);
  }

  @Get('count/comment/:commentId')
  async getLikesCountOnComment(@Param('commentId') commentId: string) {
    return this.likesService.countLikesOnComment(commentId);
  }

  @Post('post')
  async likePost(
    @Body('userId') userId: string,
    @Body('postId') postId: string,
  ) {
    return this.likesService.likePost(userId, postId);
  }

  @Post('comment')
  async likeComment(
    @Body('userId') userId: string,
    @Body('commentId') commentId: string,
  ) {
    return this.likesService.likeComment(userId, commentId);
  }

  @Delete('post')
  async unlikePost(
    @Body('userId') userId: string,
    @Body('postId') postId: string,
  ) {
    return this.likesService.unlikePost(userId, postId);
  }

  @Delete('comment')
  async unlikeComment(
    @Body('userId') userId: string,
    @Body('commentId') commentId: string,
  ) {
    return this.likesService.unlikeComment(userId, commentId);
  }
}
