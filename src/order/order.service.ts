import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: Prisma.OrderCreateInput): Promise<Order> {
    return this.prisma.order.create({ data });
  }

  findAll(): Promise<any> {
    return this.prisma.order.findMany();
  }

  findOne(id: number): Promise<Order> {
    return this.prisma.order.findFirst({
      where: {
        id: id,
      },
    });
  }

  remove(id: number) {
    return this.prisma.order.delete({ where: { id: id } });
  }
}
