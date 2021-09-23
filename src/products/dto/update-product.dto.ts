import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  name?: string;
  price?: string;
  imgUrl?: string;
}
