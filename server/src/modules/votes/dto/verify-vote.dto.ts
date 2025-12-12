import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class VerifyVoteDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  serviceId!: string;

  @IsOptional()
  @IsString()
  signature?: string;
}
