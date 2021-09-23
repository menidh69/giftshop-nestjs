import { SignInDto } from './dto/sign-in-creds.dto';
import { User } from './user.entity';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard())
  getUsers(@Query() filterDto: GetUserFilterDto): Promise<User[]> {
    return this.usersService.getUsers(filterDto);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }

  @Patch(':id')
  updateUserById(
    @Param('id') id: string,
    @Body('fullName') fullName: string,
  ): Promise<User> {
    return this.usersService.updateUser(id, fullName);
  }

  @Post('/signIn')
  signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    return this.usersService.signIn(signInDto);
  }
}
