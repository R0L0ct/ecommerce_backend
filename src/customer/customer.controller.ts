import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { Prisma } from '@prisma/client';

@ApiTags('customers')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  createCustomer(@Body() data: Prisma.CustomerCreateInput) {
    return this.customerService.create(data);
  }

  @Get()
  findAllCustomers() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findCustomer(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Post('/customer-email')
  findCustomerByEmail(@Body() { email }: { email: string }) {
    return this.customerService.findOneByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.CustomerUpdateInput) {
    return this.customerService.update(+id, data);
  }
  @Delete(':id')
  removeOrder(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
