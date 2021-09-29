import { CartProduct } from './../shopping-cart/cart-products.entity';
import { Product } from 'src/products/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string;

  @Column()
  amount: number;

  @OneToMany((_type) => Product, (product) => product.orderProducts, {
    eager: true,
  })
  @JoinColumn()
  products: Product[];

  @Column({ default: false })
  fullfilled: boolean;
}
