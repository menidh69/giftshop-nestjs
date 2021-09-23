import { IsNotEmpty, IsString } from 'class-validator';

export class CreatProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  price: string;

  @IsNotEmpty()
  @IsString()
  imgUrl: string;
}
