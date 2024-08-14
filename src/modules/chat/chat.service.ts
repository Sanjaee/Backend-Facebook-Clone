import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { AddParticipantDto } from './dto/add-participant.dto';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  // Create a new chat
  async createChat(createChatDto: CreateChatDto) {
    const { name, userIds } = createChatDto;
    const chat = await this.prisma.chat.create({
      data: {
        name,
        participants: {
          create: userIds.map(userId => ({ userId })),
        },
      },
    });
    return chat;
  }

  // Update an existing chat's details
  async updateChat(chatId: string, updateChatDto: UpdateChatDto) {
    const chat = await this.prisma.chat.update({
      where: { id: chatId },
      data: updateChatDto,
    });
    return chat;
  }

  // Add a new participant to an existing chat
  async addParticipant(addParticipantDto: AddParticipantDto) {
    const { userId, chatId } = addParticipantDto;
    const participant = await this.prisma.chatParticipant.create({
      data: {
        userId,
        chatId,
      },
    });
    return participant;
  }

  // Send a message in a chat
  async sendMessage(sendMessageDto: SendMessageDto) {
    const { chatId, userId, content } = sendMessageDto;
    const message = await this.prisma.message.create({
      data: {
        chatId,
        senderId: userId,
        content,
      },
    });
    return message;
  }

  // Get all messages from a chat
  async getMessages(chatId: string) {
    return this.prisma.message.findMany({
      where: { chatId },
      include: {
        sender: true, // Include user details
      },
    });
  }

  // Get all chats that a user is participating in
  async getChatsForUser(userId: string) {
    return this.prisma.chat.findMany({
      where: {
        participants: {
          some: {
            userId,
          },
        },
      },
      include: {
        participants: true,
      },
    });
  }
}
