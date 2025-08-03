import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.schema';

const mockUser = {
  _id: 'user123',
  email: 'test@example.com',
  password: 'hashedpass',
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            create: jest.fn().mockResolvedValue(mockUser),
            findOne: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const result = await service.create(mockUser.email, mockUser.password);
    expect(result).toEqual(mockUser);
  });

  it('should find a user by email', async () => {
    const result = await service.findByEmail('test@example.com');
    expect(result).toEqual(mockUser);
  });
});
