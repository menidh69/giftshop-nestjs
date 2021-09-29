import { CartProductRepository } from './../shopping-cart/cart-product.repository';
import { CartProduct } from './../shopping-cart/cart-products.entity';
import { ShoppingCart } from './../shopping-cart/shopping-cart.entity';
import { ShoppingCartRepository } from './../shopping-cart/shopping-cart.repository';
import { User } from './../users/user.entity';
import { GetOrdersDto } from './dto/get-orders.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './orders.entity';
import { OrdersRepository } from './orders.repository';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private orderRepository: OrdersRepository,
    @InjectRepository(ShoppingCartRepository)
    private shoppingCartRepository: ShoppingCartRepository,
    @InjectRepository(CartProductRepository)
    private cartProductRepository: CartProductRepository,
  ) {}

  async getOrders(getOrdersDto: GetOrdersDto) {
    const { fullfilled, date, querySize, offSet } = getOrdersDto;
    const data = await this.orderRepository.find({
      where: { fullfilled, date },
      take: querySize,
      skip: offSet,
    });
    return data;
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne(id);
    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }

  async createNewOrder(user: User): Promise<Order> {
    try {
      const { id } = user;
      const today = new Date().toString();
      const shoppingCart = await this.shoppingCartRepository.findOne({
        where: { user: id },
      });
      if (!shoppingCart) {
        throw new NotFoundException();
      }
      const products = shoppingCart.cartProducts;

      const newOrder = this.orderRepository.create({
        date: today,
        amount: amount(products),
        products,
      });
      await this.orderRepository.save(newOrder);
      shoppingCart.cartProducts = [];
      this.shoppingCartRepository.save(shoppingCart);
      const cartProducts = await this.cartProductRepository.find({
        where: { shoppingCart: shoppingCart.id },
      });
      cartProducts.forEach(async (prod) => {
        await this.cartProductRepository.delete(prod.id);
      });
      console.log(newOrder);
      return newOrder;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async fullfillOrder(id: string): Promise<void> {
    const order = await this.getOrderById(id);
    order.fullfilled = true;
    await this.orderRepository.save(order);
    return;
  }
}

const amount = (products: CartProduct[]) => {
  let total = 0;
  products.forEach((i) => {
    const { quantity, product } = i;
    const sum = quantity * parseInt(product.price);
    return () => (total += sum);
  });
  return total;
};
