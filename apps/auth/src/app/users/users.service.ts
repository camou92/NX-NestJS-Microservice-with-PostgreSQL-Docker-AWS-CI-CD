import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { hash } from 'bcryptjs';
import { CreateUserInput } from './dto/create-user.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: CreateUserInput) {
    return this.prismaService.user.create({
      data: {
        email: data.email,
        password: await hash(data.password, 10),
      },
    });
  }

  async getUsers() {
    return await this.prismaService.user.findMany();
  }

  async getUser(args: Prisma.UserWhereUniqueInput) {
    return await this.prismaService.user.findUniqueOrThrow({
      where: args
    })
  }
}