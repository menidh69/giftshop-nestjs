import { GetOrdersDto } from './dto/get-orders.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './orders.entity';
import { OrdersRepository } from './orders.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Not } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(private orderRepository: OrdersRepository) {}

  async getOrders(getOrdersDto: GetOrdersDto) {
    const { fullfilled, date, querySize, offSet } = getOrdersDto;
    const data = await this.orderRepository.find({
      where: { fullfilled, date },
      take: querySize,
      skip: offSet,
    });
    return data;
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne(id);
    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }

  async createNewOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { date, amount, products } = createOrderDto;
    const newOrder = this.orderRepository.create({ date, amount, products });
    await this.orderRepository.save(newOrder);
    return newOrder;
  }

  async fullfillOrder(id: string): Promise<void> {
    const order = await this.getOrderById(id);
    order.fullfilled = true;
    await this.orderRepository.save(order);
    return;
  }
}
