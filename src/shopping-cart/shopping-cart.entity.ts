import { CartProduct } from './cart-products.entity';
import { User } from './../users/user.entity';
import { Product } from 'src/products/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class ShoppingCart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne((_type) => User, (user) => user.shoppingCart, { eager: false })
  @JoinColumn()
  @Exclude({ toPlainOnly: true })
  user: User;

  @OneToMany(
    (_type) => CartProduct,
    (cartProduct) => cartProduct.shoppingCart,
    {
      eager: true,
    },
  )
  cartProducts: CartProduct[];
}
