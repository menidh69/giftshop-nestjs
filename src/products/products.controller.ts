import { UpdateProductDto } from './dto/update-product.dto';
import { CreatProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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

  @Patch('/:id')
  updatePoduct(@Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productsService.updateProduct(updateProductDto);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string): Promise<void> {
    return this.productsService.deleteProduct(id);
  }
}
