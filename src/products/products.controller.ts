import { CreatProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Post()
  createProduct(@Body() createProductDto: CreatProductDto): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }
}
