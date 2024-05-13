import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { Prisma } from '@prisma/client';

@ApiTags('orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() data: Prisma.OrderCreateInput) {
    return this.orderService.create(data);
  }

  @Get()
  findAllOrders() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOrder(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Delete(':id')
  removeOrder(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
