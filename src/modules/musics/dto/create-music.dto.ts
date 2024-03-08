import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateMusicDTO {
  @IsString()
  @ApiProperty()
  public name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public album?: string | undefined | null;

  @IsString()
  @ApiProperty()
  public genre: string;

  @IsString()
  @ApiProperty()
  public author: string;
}
