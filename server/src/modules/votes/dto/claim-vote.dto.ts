import { IsNotEmpty, IsString } from 'class-validator';

export class ClaimVoteDto {
  @IsString()
  @IsNotEmpty()
  serviceId!: string;
}
