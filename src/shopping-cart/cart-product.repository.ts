import { CartProduct } from './cart-products.entity';
import { User } from './../users/user.entity';
import { ShoppingCart } from './shopping-cart.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CartProduct)
export class CartProductRepository extends Repository<CartProduct> {}
