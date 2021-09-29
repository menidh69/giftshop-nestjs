import { OrderProductRepository } from './orderProduct.repository';
import { PassportModule } from '@nestjs/passport';
import { CartProduct } from './../shopping-cart/cart-products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartRepository } from './../shopping-cart/shopping-cart.repository';
import { CartProductRepository } from './../shopping-cart/cart-product.repository';
import { OrdersRepository } from './orders.repository';
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShoppingCartRepository,
      CartProduct,
      CartProductRepository,
      OrdersRepository,
      OrderProductRepository,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
