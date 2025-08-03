import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/mongoose';
import { Product } from './product.schema';

const mockProduct = {
  _id: 'abc123',
  name: 'Test Product',
  description: 'Test Description',
  price: 100,
  category: 'Test',
};

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: {
            create: jest.fn().mockResolvedValue(mockProduct),
            find: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue([mockProduct]),
            }),
            findById: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockProduct),
            }),
            findByIdAndUpdate: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockProduct),
            }),
            findByIdAndDelete: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockProduct),
            }),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const result = await service.create(mockProduct as any);
    expect(result).toEqual(mockProduct);
  });

  it('should return all products', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockProduct]);
  });

  it('should return one product by id', async () => {
    const result = await service.findOne('abc123');
    expect(result).toEqual(mockProduct);
  });

  it('should update a product', async () => {
    const result = await service.update('abc123', { name: 'Updated' });
    expect(result).toEqual(mockProduct);
  });

  it('should delete a product', async () => {
    const result = await service.remove('abc123');
    expect(result).toBeUndefined();
  });
});
