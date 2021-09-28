import { GetOrdersDto } from './dto/get-orders.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Order } from './orders.entity';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  getOrders(@Query() getOrdersDto: GetOrdersDto): Promise<Order[]> {
    return this.orderService.getOrders(getOrdersDto);
  }

  @Get('/:id')
  getOrderById(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOrderById(id);
  }

  @Post()
  createNewOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createNewOrder(createOrderDto);
  }

  @Post('/:id')
  fullfillOrder(@Param('id') id: string): Promise<void> {
    return this.orderService.fullfillOrder(id);
  }
}
