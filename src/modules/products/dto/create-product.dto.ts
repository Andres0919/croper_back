import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Sample Product',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'This is a sample product',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 10.99,
    required: true,
  })
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'The category of the product',
    example: 'Electronics',
    required: false,
  })
  @IsOptional()
  @IsString()
  category?: string;
}
