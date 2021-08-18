import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable() //AuthGuard로 jwt.strategy가 자동으로 실행됨.
export class JwtAuthGuard extends AuthGuard('jwt') {}
