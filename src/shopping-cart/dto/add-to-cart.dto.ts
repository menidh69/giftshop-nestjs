import { IsNotEmpty } from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  productId: string;
}
