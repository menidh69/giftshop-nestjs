import { OrderProduct } from './../orders/orderProduct.entity';
import { Order } from './../orders/orders.entity';
import { CartProduct } from './../shopping-cart/cart-products.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  imgUrl: string;

  @OneToMany((_type) => CartProduct, (cartProduct) => cartProduct.product, {
    eager: false,
  })
  cartProducts: CartProduct[];

  @OneToMany((_type) => OrderProduct, (orderProduct) => orderProduct.product, {
    eager: false,
  })
  orderProducts: OrderProduct[];
}
