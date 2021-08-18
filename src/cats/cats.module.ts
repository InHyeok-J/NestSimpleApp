import { AuthModule } from './../auth/auth.module';
import { PrismaModule } from './../prisma/prisma.module';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { Module } from '@nestjs/common';
import { CatsRepository } from 'src/repository/cats.repository';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
})
export class CatsModule {}
