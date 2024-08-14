import { IsString } from 'class-validator';

export class AddParticipantDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly chatId: string;
}
