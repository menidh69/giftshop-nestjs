import { ShoppingCartRepository } from './../shopping-cart/shopping-cart.repository';
import { JwtPayload } from './jwt-payload.interface';
import { SignInDto } from './dto/sign-in-creds.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @InjectRepository(ShoppingCartRepository)
    private shoppingCartRepository: ShoppingCartRepository,
    private jwtService: JwtService,
  ) {}

  getUsers(filterDto: GetUserFilterDto): Promise<User[]> {
    return this.usersRepository.getUsers(filterDto);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.createUser(createUserDto);
    await this.shoppingCartRepository.createCartForUser(user);
    return user;
  }

  async getUserById(id: string): Promise<User> {
    const foundUser = await this.usersRepository.findOne(id);
    if (!foundUser) {
      throw new NotFoundException();
    }
    return foundUser;
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return;
  }
  async updateUser(id: string, fullName: string): Promise<User> {
    const user = await this.getUserById(id);
    user.fullName = fullName;
    await this.usersRepository.save(user);
    return user;
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { email, password } = signInDto;
    const user = await this.usersRepository.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Email or password are incorrect');
    }
  }
}
