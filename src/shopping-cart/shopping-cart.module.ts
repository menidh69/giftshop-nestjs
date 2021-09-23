import { PassportModule } from '@nestjs/passport';
import { ProductRepository } from './../products/products.repository';
import { UsersRepository } from './../users/users.repository';
import { CartProductRepository } from './cart-product.repository';
import { ShoppingCartRepository } from './shopping-cart.repository';
import { CartProduct } from './cart-products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShoppingCartRepository,
      CartProduct,
      CartProductRepository,
      UsersRepository,
      ProductRepository,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
})
export class ShoppingCartModule {}
