import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 'b3119fcc-9167-4d2c-ab22-831ec0742989',
      fullName: 'meni',
      email: 'meni@meni.com',
      password: 'xd',
    },
  ];

  getUsers() {
    return this.users;
  }

  getUsersWithFilter(filterDto: GetUserFilterDto) {
    const { fullName, email } = filterDto;

    //temp array
    let users = this.getUsers();

    if (fullName) {
      users = users.filter((u) => u.fullName !== fullName);
    }
    if (email) {
      users = users.filter((u) => u.email !== email);
    }

    return users;
  }

  createUser(createUserDto: CreateUserDto): User {
    const { fullName, password, email } = createUserDto;
    const user: User = {
      id: uuid(),
      fullName,
      email,
      password,
    };
    this.users.push(user);
    return user;
  }

  getUserById(id: string): User {
    const reqUser = this.users.find((user) => user.id === id);

    if (!reqUser) {
      throw new NotFoundException();
    }

    return reqUser;
  }

  deleteUserById(id: string): void {
    const found = this.getUserById(id);
    this.users.filter((user) => user.id !== found.id);
    return;
  }
}
