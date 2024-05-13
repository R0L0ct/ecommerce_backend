import { Module } from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderProductController } from './order-product.controller';

@Module({
  controllers: [OrderProductController],
  providers: [OrderProductService, PrismaService],
})
export class OrderProductModule {}
