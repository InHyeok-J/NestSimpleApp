import { LoginRequestDto } from './../auth/dto/login.request.dto';
import { AuthService } from './../auth/auth.service';
import { CatResponseDto } from './dto/cat.response.dto';
import { CatRequestDto } from './dto/cats.request.dto';
import { SuccessInterceptor } from './../common/interceptors/success.interceptor';
import { CatsService } from './cats.service';
import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  HttpException,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '전체 고양이 조회' })
  @Get()
  getAllCat() {
    return 'get all cats';
  }

  @Get(':id')
  getOneCat() {
    return 'get One Cat';
  }

  @ApiResponse({
    status: 500,
    description: 'Server Error..',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: CatResponseDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post('signup')
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async login(@Body() body: LoginRequestDto) {
    console.log(body);
    return await this.authService.jwtLogIn(body);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Get()
  loggout() {
    return 'get all cats';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }
}
