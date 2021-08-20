import { CatsRepository } from 'src/repository/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //헤더의 토큰으로부터 추출
      secretOrKey: process.env.JWT_SECRET, //유출되면 안됨
      ignoreExpiration: false, //만료기간 설정
    });
  }

  async validate(payload: Payload) {
    //페이로드 , jwtGuard-> jwt.strategy의 validate를 수행함.
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      parseInt(payload.sub, 10),
    );

    if (cat) {
      return cat; //request.user 안에다가 들어감.
    } else {
      throw new UnauthorizedException('인증 실패');
    }
  }
}
