import { Product } from './../products/product.entity';
import { ShoppingCart } from './shopping-cart.entity';
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
export class CartProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    (_type) => ShoppingCart,
    (shoppingCart) => shoppingCart.cartProducts,
    {
      eager: false,
    },
  )
  @JoinColumn()
  shoppingCart: ShoppingCart;

  @ManyToOne((_type) => Product, (product) => product.cartProducts, {
    eager: true,
  })
  @JoinColumn()
  product: Product;

  @Column({ default: 1 })
  quantity: number;
}
