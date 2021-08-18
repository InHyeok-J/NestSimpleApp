import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CatResponseDto {
  @ApiProperty({
    example: '1',
    description: 'id',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: 'email@email.com',
    description: 'email',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'catsname',
    description: 'name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'http://localhost:3000/imgscr',
    description: 'imgUrl',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  imgUrl: string;
}
