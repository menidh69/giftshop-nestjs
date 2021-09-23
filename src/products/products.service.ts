import { UpdateProductDto } from './dto/update-product.dto';
import { CreatProductDto } from './dto/create-product.dto';
import { ProductRepository } from './products.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async deleteProduct(id: string): Promise<void> {
    const deleted = await this.productsRepository.delete(id);
    if (deleted.affected === 0) {
      throw new NotFoundException();
    }
    return;
  }

  async getProductById() {
    return;
  }

  async updateProduct(updateProductDto: UpdateProductDto) {
    const { id } = updateProductDto;
    const data = Object.keys({ ...updateProductDto }).filter(
      (key) => key !== 'id',
    );
    const found = await this.productsRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    data.forEach((key) => {
      found[key] = updateProductDto[key];
    });
    this.productsRepository.save(found);
    return found;
  }
}
