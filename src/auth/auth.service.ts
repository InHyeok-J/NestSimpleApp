import { LoginRequestDto } from './dto/login.request.dto';
import { CatsRepository } from 'src/repository/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;
    //해당 이메일이 있는지
    const exCat = await this.catsRepository.findByEmail(email);

    if (!exCat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    //password가 일치한지
    const passwordValid: boolean = await bcrypt.compare(
      password,
      exCat.password,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    //Jwt 프론트에 반환.

    const payload = { email: email, sub: exCat.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
