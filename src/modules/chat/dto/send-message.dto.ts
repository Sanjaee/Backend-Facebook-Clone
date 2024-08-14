import { IsString } from 'class-validator';

export class SendMessageDto {
  @IsString()
  readonly chatId: string;

  @IsString()
  readonly userId: string;

  @IsString()
  readonly content: string;
}
