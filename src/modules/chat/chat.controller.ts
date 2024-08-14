import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { AddParticipantDto } from './dto/add-participant.dto';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create')
  createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatService.createChat(createChatDto);
  }

  @Post('update/:chatId')
  updateChat(@Param('chatId') chatId: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.updateChat(chatId, updateChatDto);
  }

  @Post('add-participant')
  addParticipant(@Body() addParticipantDto: AddParticipantDto) {
    return this.chatService.addParticipant(addParticipantDto);
  }

  @Post('send-message')
  sendMessage(@Body() sendMessageDto: SendMessageDto) {
    return this.chatService.sendMessage(sendMessageDto);
  }

  @Get('messages/:chatId')
  getMessages(@Param('chatId') chatId: string) {
    return this.chatService.getMessages(chatId);
  }

  @Get('user-chats/:userId')
  getChatsForUser(@Param('userId') userId: string) {
    return this.chatService.getChatsForUser(userId);
  }
}
