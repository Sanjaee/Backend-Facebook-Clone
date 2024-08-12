import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { profile: true }, // Include profile if needed
    });
  }

  async create(data: any) {
    return this.prisma.user.create({
      data,
      include: { profile: true }, // Include profile if needed
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { profile: true }, // Include profile if needed
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: { profile: true }, // Include profile if needed
    });
  }
}
