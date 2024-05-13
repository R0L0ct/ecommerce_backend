import { Injectable } from '@nestjs/common';
import { OrderProduct, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderProductService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: Prisma.OrderProductCreateInput): Promise<OrderProduct> {
    return this.prisma.orderProduct.create({ data });
  }

  findAll(): Promise<any> {
    return this.prisma.orderProduct.findMany();
  }

  findOne(id: number): Promise<OrderProduct> {
    return this.prisma.orderProduct.findFirst({
      where: {
        id: id,
      },
    });
  }

  remove(id: number) {
    return this.prisma.orderProduct.delete({ where: { id: id } });
  }
}
