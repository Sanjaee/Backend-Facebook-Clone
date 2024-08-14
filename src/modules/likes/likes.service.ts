import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}

  async countLikesOnPost(postId: string) {
    return this.prisma.like.count({
      where: { postId },
    });
  }

  async countLikesOnComment(commentId: string) {
    return this.prisma.like.count({
      where: { commentId },
    });
  }
  async likePost(userId: string, postId: string) {
    return this.prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
  }

  async unlikePost(userId: string, postId: string) {
    return this.prisma.like.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
  }

  async likeComment(userId: string, commentId: string) {
    return this.prisma.like.create({
      data: {
        userId,
        commentId,
      },
    });
  }

  async unlikeComment(userId: string, commentId: string) {
    return this.prisma.like.delete({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    });
  }
}
