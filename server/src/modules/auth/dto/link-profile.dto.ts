import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class LinkProfileDto {
  @Transform(({ value, obj }) => {
    const fallback =
      value ??
      obj?.minecraftusername ??
      obj?.username ??
      obj?.ign ??
      obj?.minecraft_username ??
      obj?.MinecraftUsername;
    if (typeof fallback === 'string') {
      return fallback.trim();
    }
    return fallback;
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  @Matches(/^[A-Za-z0-9_]+$/, {
    message: 'Minecraft username can only contain letters, numbers, and underscores',
  })
  minecraftUsername!: string;
}
