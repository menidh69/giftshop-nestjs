import { User } from './../users/user.entity';
import { ShoppingCart } from './shopping-cart.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ShoppingCartService } from './shopping-cart.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/get-user.decorator';

@Controller('shopping-cart')
@UseGuards(AuthGuard())
export class ShoppingCartController {
  constructor(private shoppingCartService: ShoppingCartService) {}

  @Get()
  getCart(@GetUser() user: User): Promise<ShoppingCart> {
    const { shoppingCart } = user;
    return this.shoppingCartService.getShoppingCart(shoppingCart.id);
  }

  @Post()
  addToCart(
    @Body('productId') productId: string,
    @GetUser() user: User,
  ): Promise<void> {
    const dto: AddToCartDto = { productId: productId, userId: user.id };
    console.log(productId);
    return this.shoppingCartService.addToCart(dto);
  }

  @Post('/remove')
  removeFromCart(
    @Body('productId') productId: string,
    @GetUser() user: User,
  ): Promise<void> {
    console.log(productId);
    return this.shoppingCartService.removeFromCart(productId, user);
  }
}
