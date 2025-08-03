import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

const mockUser = {
  _id: 'user123',
  email: 'test@example.com',
  password: bcrypt.hashSync('1234', 10),
};

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn().mockResolvedValue(mockUser),
            create: jest.fn().mockResolvedValue(mockUser),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked-token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user if password is correct', async () => {
      const result = await service.validateUser('test@example.com', '1234');
      expect(result).toEqual(mockUser);
    });

    it('should throw UnauthorizedException if password is wrong', async () => {
      await expect(
        service.validateUser('test@example.com', 'wrongpassword'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValueOnce(null);
      await expect(
        service.validateUser('notfound@example.com', '1234'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('should return access_token on valid credentials', async () => {
      const result = await service.login('test@example.com', '1234');
      expect(result).toEqual({ access_token: 'mocked-token' });
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser._id,
        email: mockUser.email,
      });
    });
  });

  describe('register', () => {
    it('should return access_token after registration', async () => {
      const result = await service.register('test@example.com', '1234');
      expect(result).toEqual({ access_token: 'mocked-token' });
      expect(usersService.create).toHaveBeenCalledWith(
        'test@example.com',
        '1234',
      );
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser._id,
        email: mockUser.email,
      });
    });
  });
});
