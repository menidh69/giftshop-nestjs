import { User } from './../users/user.entity';
import { ShoppingCart } from './shopping-cart.entity';
import { UsersRepository } from './../users/users.repository';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ShoppingCartRepository } from './shopping-cart.repository';
import { CartProductRepository } from './cart-product.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from 'src/products/products.repository';
import { NODATA } from 'dns';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(CartProductRepository)
    private cartProductRepository: CartProductRepository,
    @InjectRepository(ShoppingCartRepository)
    private shoppingCartRepository: ShoppingCartRepository,
    @InjectRepository(UsersRepository)
    private usersRepositry: UsersRepository,
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async addToCart(addToCartDto: AddToCartDto): Promise<void> {
    const { userId, productId } = addToCartDto;
    console.log(productId);
    const { shoppingCart } = await this.usersRepositry.findOne(userId);
    const product = await this.productRepository.findOne(productId);
    if (!shoppingCart || !product) {
      throw new NotFoundException();
    }
    const existingItem = await this.cartProductRepository.findOne({
      where: { product: product.id },
    });
    console.log(product.id);
    console.log(existingItem);
    if (existingItem) {
      existingItem.quantity += 1;
      this.cartProductRepository.save(existingItem);
      return;
    }
    const addedItem = this.cartProductRepository.create({
      shoppingCart,
      product,
    });
    await this.cartProductRepository.save(addedItem);

    return;
  }

  async removeFromCart(cartItemId: string, user: User): Promise<void> {
    const { id } = user;
    const { shoppingCart } = await this.usersRepositry.findOne(id);
    const existingItem = await this.cartProductRepository.findOne(cartItemId);
    if (!shoppingCart || !cartItemId) {
      console.log('not found');
      throw new NotFoundException();
    }

    if (existingItem.quantity <= 1) {
      await this.cartProductRepository.delete(existingItem);
      return;
    } else if (!existingItem) {
      throw new NotFoundException();
    } else {
      existingItem.quantity -= 1;
      this.cartProductRepository.save(existingItem);
      return;
    }
  }

  async getShoppingCart(id: string): Promise<ShoppingCart> {
    console.log(id);
    const cart = await this.shoppingCartRepository.findOne(id);
    console.log(cart);
    return cart;
  }
}
