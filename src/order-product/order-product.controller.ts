import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderProductService } from './order-product.service';
import { Prisma } from '@prisma/client';

@ApiTags('order-product')
@Controller('order-product')
export class OrderProductController {
  constructor(private readonly orderProductService: OrderProductService) {}

  @Post()
  createOrderProduct(@Body() data: Prisma.OrderProductCreateInput) {
    return this.orderProductService.create(data);
  }

  @Get()
  findAllOrderProducts() {
    return this.orderProductService.findAll();
  }

  @Get(':id')
  findOrderProduct(@Param('id') id: string) {
    return this.orderProductService.findOne(+id);
  }

  @Delete(':id')
  removeOrderProduct(@Param('id') id: string) {
    return this.orderProductService.remove(+id);
  }
}
