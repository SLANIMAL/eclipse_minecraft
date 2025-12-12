import { IsNotEmpty, IsString } from 'class-validator';

export class StartGoogleLoginDto {
  @IsString()
  @IsNotEmpty()
  redirectUri!: string;
}
