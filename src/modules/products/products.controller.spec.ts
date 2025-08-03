import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: mockService }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create with dto', async () => {
    const dto = { name: 'Product', price: 10 };
    await controller.create(dto as any);
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should call findAll', async () => {
    await controller.findAll();
    expect(mockService.findAll).toHaveBeenCalled();
  });

  it('should call findOne with id', async () => {
    await controller.findOne('id123');
    expect(mockService.findOne).toHaveBeenCalledWith('id123');
  });

  it('should call update with id and dto', async () => {
    const dto = { name: 'Updated' };
    await controller.update('id123', dto);
    expect(mockService.update).toHaveBeenCalledWith('id123', dto);
  });

  it('should call remove with id', async () => {
    await controller.remove('id123');
    expect(mockService.remove).toHaveBeenCalledWith('id123');
  });
});
