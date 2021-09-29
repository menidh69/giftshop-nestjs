import { OrderProduct } from './orderProduct.entity';
import { Order } from './orders.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(OrderProduct)
export class OrderProductRepository extends Repository<OrderProduct> {}
