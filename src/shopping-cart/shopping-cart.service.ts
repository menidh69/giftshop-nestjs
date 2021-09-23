import { ShoppingCart } from './shopping-cart.entity';
import { UsersRepository } from './../users/users.repository';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ShoppingCartRepository } from './shopping-cart.repository';
import { CartProductRepository } from './cart-product.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from 'src/products/products.repository';

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
    const { shoppingCart } = await this.usersRepositry.findOne(userId);
    const product = await this.productRepository.findOne(productId);
    if (!shoppingCart || !product) {
      throw new NotFoundException();
    }
    const addedItem = this.cartProductRepository.create({
      shoppingCart,
      product,
    });
    await this.cartProductRepository.save(addedItem);

    return;
  }

  async getShoppingCart(id: string): Promise<ShoppingCart> {
    console.log(id);
    const cart = await this.shoppingCartRepository.findOne(id);
    console.log(cart);
    return cart;
  }
}
