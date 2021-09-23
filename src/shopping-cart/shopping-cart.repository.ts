import { User } from './../users/user.entity';
import { ShoppingCart } from './shopping-cart.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ShoppingCart)
export class ShoppingCartRepository extends Repository<ShoppingCart> {
  async createCartForUser(user: User): Promise<void> {
    const cart = this.create({ user });
    await this.save(cart);
    return;
  }
}
