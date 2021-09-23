import { CreatProductDto } from './dto/create-product.dto';
import { ProductRepository } from './products.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productsRepository: ProductRepository,
  ) {}

  async getProducts(): Promise<Product[]> {
    const products: Product[] = await this.productsRepository.find();
    return products;
  }

  async createProduct(createProductDto: CreatProductDto): Promise<Product> {
    const { name, price, imgUrl } = createProductDto;
    const newProduct = this.productsRepository.create({
      name,
      price,
      imgUrl,
    });
    await this.productsRepository.save(newProduct);
    return newProduct;
  }

  async deleteProduct() {
    return;
  }

  async getProductById() {
    return;
  }

  async updateProduct() {
    return;
  }
}
