import { User } from './../users/user.entity';
import { GetOrdersDto } from './dto/get-orders.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Order } from './orders.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/get-user.decorator';

@Controller('orders')
@UseGuards(AuthGuard())
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
  createNewOrder(@GetUser() user: User) {
    return this.orderService.createNewOrder(user);
  }

  @Post('/:id')
  fullfillOrder(@Param('id') id: string): Promise<void> {
    return this.orderService.fullfillOrder(id);
  }
}
