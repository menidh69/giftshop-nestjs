import { ShoppingCartRepository } from './../shopping-cart/shopping-cart.repository';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { fullName, password, email } = createUserDto;
    //hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = this.create({
      fullName,
      password: hashedPassword,
      email,
    });
    try {
      await this.save(createdUser);
    } catch (error) {
      console.log(error);
      if (error.code === '23505' /*duplicate email*/) {
        throw new ConflictException('Email already registered');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return createdUser;
  }

  async getUsers(filterDto: GetUserFilterDto): Promise<User[]> {
    const { fullName, search } = filterDto;
    const query = this.createQueryBuilder('user');
    if (fullName) {
      query.andWhere('user.fullName = :fullName', { fullName: fullName });
    }
    if (search) {
      query.andWhere(
        'LOWER(user.fullName) LIKE LOWER(:search) OR LOWER(user.email) LIKE LOWER(:search)',
        {
          search: `%${search}%`,
        },
      );
    }

    const users = await query.getMany();
    return users;
  }
}
