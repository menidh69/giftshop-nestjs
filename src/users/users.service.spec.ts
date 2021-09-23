import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';

const mockUsersRepository = () => ({
  getUsers: jest.fn(),
  findOne: jest.fn(),
});

const mockCredentials = { email: 'meni@meni.com', password: '123456' };

describe('UsersService', () => {
  let service: UsersService;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useFactory: mockUsersRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(UsersRepository);
  });

  describe('gets all users successfully', async () => {
    repository.getUsers.mockResolvedValue('yeah');
    const result = await service.getUsers(null);
    expect(result).toEqual('yeah');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
