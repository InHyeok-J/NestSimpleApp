import { Injectable, HttpException } from '@nestjs/common';
import { PrismaSerivce } from '../prisma/prisma.service';
import * as dayjs from 'dayjs';
import { Cat } from '@prisma/client';
import { CatResponseDto } from '../cats/dto/cat.response.dto';

const dbNow = () => dayjs().add(9, 'hour').toDate();

@Injectable()
export class CatsRepository {
  constructor(private prisma: PrismaSerivce) {}

  async findByEmail(email: string): Promise<Cat> {
    try {
      return await this.prisma.cat.findUnique({
        where: {
          email,
        },
      });
    } catch (err) {
      console.error(err);
      throw new HttpException('db Error', 400);
    }
  }

  async create(
    email: string,
    password: string,
    name: string,
  ): Promise<CatResponseDto> {
    try {
      return await this.prisma.cat.create({
        data: {
          email,
          password,
          name,
          createdAt: dbNow(),
        },
        select: {
          id: true,
          email: true,
          name: true,
          imgUrl: true,
        },
      });
    } catch (err) {
      console.error(err);
      throw new HttpException('db Error', 400);
    }
  }

  async findCatByIdWithoutPassword(id: number): Promise<CatResponseDto> {
    try {
      return await this.prisma.cat.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          email: true,
          name: true,
          imgUrl: true,
        },
      });
    } catch (err) {
      console.error(err);
      throw new HttpException('db Error', 400);
    }
  }

  async findByIdAndUpdateImg(
    id: number,
    fileName: string,
  ): Promise<CatResponseDto> {
    try {
      return await this.prisma.cat.update({
        where: {
          id,
        },
        data: {
          imgUrl: fileName,
        },
        select: {
          id: true,
          email: true,
          name: true,
          imgUrl: true,
        },
      });
    } catch (err) {
      console.error(err);
      throw new HttpException('db Error', 400);
    }
  }

  async findAllCat(): Promise<any> {
    try {
      return await this.prisma.cat.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          imgUrl: true,
        },
      });
    } catch (err) {
      console.error(err);
      throw new HttpException('db Error', 400);
    }
  }
}
