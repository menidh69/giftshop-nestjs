import { Order } from './orders.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {}
