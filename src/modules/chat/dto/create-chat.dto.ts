import { IsString, IsArray } from 'class-validator';

export class CreateChatDto {
  @IsString()
  readonly name: string;

  @IsArray()
  readonly userIds: string[];
}
