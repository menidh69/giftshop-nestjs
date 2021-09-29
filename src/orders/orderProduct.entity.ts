import { Product } from 'src/products/product.entity';
import { Order } from './orders.entity';

import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LargeNumberLike } from 'crypto';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((_type) => Order, (order) => order.products, {
    eager: false,
  })
  @JoinColumn()
  order: Order;

  @ManyToOne((_type) => Product, (product) => product.orderProducts, {
    eager: true,
  })
  @JoinColumn()
  product: Product;

  @Column({ default: 1 })
  quantity: number;
}
