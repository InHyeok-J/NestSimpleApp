import { multerOptions } from './../common/utils/multer.options';
import { JwtAuthGuard } from './../auth/jwt/jwt.guard';
import { LoginRequestDto } from './../auth/dto/login.request.dto';
import { AuthService } from './../auth/auth.service';
import { CatResponseDto } from './dto/cat.response.dto';
import { CatRequestDto } from './dto/cats.request.dto';
import { SuccessInterceptor } from './../common/interceptors/success.interceptor';
import { CatsService } from './cats.service';
import {
  Controller,
  Get,
  Post,
  Put,
  UseInterceptors,
  Body,
  UseGuards,
  UploadedFile,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @Get('all')
  getAllcat() {
    return this.catsService.getAllCat();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat: CatResponseDto) {
    return cat;
  }

  @Get(':id')
  getOneCat() {
    return 'get One Cat';
  }

  @Post('signup')
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @Post('login')
  async login(@Body() body: LoginRequestDto) {
    console.log(body);
    return await this.authService.jwtLogIn(body);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions('cats')))
  @UseGuards(JwtAuthGuard)
  uploadCatImg(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() cat: CatResponseDto,
  ) {
    // return { image: `http://localhost:3000/media/cats/${file.filename}` };
    return this.catsService.uploadImg(cat, file);
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }
}
