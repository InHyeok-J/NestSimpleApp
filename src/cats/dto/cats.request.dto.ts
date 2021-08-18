import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CatRequestDto {
  @ApiProperty({
    example: 'email@email.com',
    description: 'email',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'qwer1234',
    description: 'password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'catsname',
    description: 'name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
