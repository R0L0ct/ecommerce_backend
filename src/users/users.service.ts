import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  findAll(): Promise<any> {
    return this.prisma.user.findMany();
  }

  findOne(username: string): Promise<any> {
    return this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });
  }

  findOneById(id: number): Promise<any> {
    return this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
  }

  update(id: number, data: UpdateUserDto): Promise<UpdateUserDto> {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id: id } });
  }
}
