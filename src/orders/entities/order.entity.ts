import { Product } from '../../products/entities/product.entity';
import { Box } from '../../boxes/entities/box.entity';

export class Order {
  orderId: number;
  products: Product[];
  boxes: Box[];
}
