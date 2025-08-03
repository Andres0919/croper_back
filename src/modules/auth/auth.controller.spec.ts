import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  const mockResponse = {
    access_token: 'mocked-token',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should return access_token after registration', async () => {
      const dto: AuthDto = { email: 'test@example.com', password: '1234' };
      mockAuthService.register.mockResolvedValueOnce(mockResponse);

      const result = await controller.register(dto);
      expect(result).toEqual(mockResponse);
      expect(authService.register).toHaveBeenCalledWith(
        dto.email,
        dto.password,
      );
    });
  });

  describe('login', () => {
    it('should return access_token after login', async () => {
      const dto: AuthDto = { email: 'test@example.com', password: '1234' };
      mockAuthService.login.mockResolvedValueOnce(mockResponse);

      const result = await controller.login(dto);
      expect(result).toEqual(mockResponse);
      expect(authService.login).toHaveBeenCalledWith(dto.email, dto.password);
    });
  });
});
