import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateVoteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  username!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  serviceId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  serviceName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  ip?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  rewardCoins?: number;

  @IsOptional()
  @IsInt()
  timestamp?: number;

  @IsOptional()
  @IsString()
  userId?: string;
}
