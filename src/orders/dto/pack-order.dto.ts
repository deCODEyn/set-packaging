import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class DimensionsDto {
  @IsDefined()
  @IsNumber()
  altura: number;

  @IsDefined()
  @IsNumber()
  largura: number;

  @IsDefined()
  @IsNumber()
  comprimento: number;
}

class ProductDto {
  @IsNotEmpty()
  produto_id: string;

  @ValidateNested()
  @Type(() => DimensionsDto)
  dimensoes: DimensionsDto;
}

export class OrderDto {
  @IsNumber()
  pedido_id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  produtos: ProductDto[];
}

export class OrdersInputDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  pedidos: OrderDto[];
}
