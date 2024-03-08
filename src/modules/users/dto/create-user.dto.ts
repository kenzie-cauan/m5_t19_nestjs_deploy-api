import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// DTO -> Data Transfer Object -> Objeto de Tranferência de Dados.
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public name: string;

  @IsEmail()
  @IsString()
  @ApiProperty()
  public email: string;

  @IsString()
  @MinLength(4)
  @ApiProperty()
  @Transform(({ value }) => hashSync(value, 10), {
    groups: ['hashPassword'],
  })
  public password: string;
}
