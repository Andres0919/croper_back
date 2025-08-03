import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsPositive()
  price: number;

  @IsOptional()
  @IsString()
  category?: string;
}
