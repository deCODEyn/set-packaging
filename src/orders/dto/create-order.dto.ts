import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class DimensionsDto {
  @IsNumber() height: number;
  @IsNumber() width: number;
  @IsNumber() length: number;
}

class ProductDto {
  @IsNotEmpty() productId: string;
  @ValidateNested() @Type(() => DimensionsDto) dimensions: DimensionsDto;
}

export class OrderDto {
  @IsNumber() orderId: number;
  @IsArray() @ValidateNested({ each: true }) @Type(() => ProductDto)
  products: ProductDto[];
}

export class OrdersInputDto {
  @IsArray() @ValidateNested({ each: true }) @Type(() => OrderDto)
  orders: OrderDto[];
}
