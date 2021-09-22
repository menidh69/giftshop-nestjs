import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@Query() filterDto: GetUserFilterDto): User[] {
    //if we have filter, call getUsersWithFilter
    if (Object.keys(filterDto).length) {
      return this.usersService.getUsersWithFilter(filterDto);
    } else {
      return this.usersService.getUsers();
    }
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  getUserById(@Param('id') id: string): User {
    return this.usersService.getUserById(id);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string): void {
    return this.usersService.deleteUserById(id);
  }
}
