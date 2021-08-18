import { AuthService } from './../auth/auth.service';
import { CatResponseDto } from './dto/cat.response.dto';
import { CatsRepository } from './../repository/cats.repository';
import { CatRequestDto } from './dto/cats.request.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaSerivce } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';

const dbNow = () => dayjs().add(9, 'hour').toDate();

@Injectable()
export class CatsService {
  constructor(private CatsRepository: CatsRepository) {}

  async signUp(body: CatRequestDto) {
    const exCats = await this.CatsRepository.findByEmail(body.email);
    if (exCats) {
      //   throw new HttpException('잘못된 요청?', 403);
      throw new UnauthorizedException('고양이는 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const createCat = await this.CatsRepository.create(
      body.email,
      hashedPassword,
      body.name,
    );

    return createCat;
  }
}
