import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    return this.prisma.comment.create({ data: createCommentDto });
  }

  async findAll() {
    return this.prisma.comment.findMany();
  }

  async findOne(id: string) {
    return this.prisma.comment.findUnique({ where: { id } });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  async remove(id: string) {
    return this.prisma.comment.delete({ where: { id } });
  }
}
