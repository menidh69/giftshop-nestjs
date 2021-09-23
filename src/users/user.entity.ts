import { ShoppingCart } from './../shopping-cart/shopping-cart.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  admin: boolean;

  @OneToOne((_type) => ShoppingCart, (shoppingCart) => shoppingCart.user, {
    eager: true,
  })
  shoppingCart: ShoppingCart;
}
