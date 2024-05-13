import { Injectable } from '@nestjs/common';
import { Customer, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return this.prisma.customer.create({ data });
  }

  findAll(): Promise<any> {
    return this.prisma.customer.findMany();
  }

  findOne(id: number): Promise<Customer> {
    return this.prisma.customer.findFirst({
      where: {
        id: id,
      },
    });
  }

  update(id: number, data: Prisma.CustomerUpdateInput): Promise<Customer> {
    return this.prisma.customer.update({ where: { id: id }, data: data });
  }
  remove(id: number) {
    return this.prisma.customer.delete({ where: { id: id } });
  }
}
