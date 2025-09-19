import { Injectable } from '@nestjs/common';
import { OrdersInputDto, OrderDto } from './dto/create-order.dto';
import { Product } from '../products/entities/product.entity';
import { packProducts } from './utils/set-packaging';

@Injectable()
export class OrdersService {
  processOrders(data: OrdersInputDto) {
    return {
      orders: data.orders.map((order: OrderDto) => {
        const products = order.products.map(
          (product) => new Product(product.productId, product.dimensions.height, product.dimensions.width, product.dimensions.length),
        );
        return {
          orderId: order.orderId,
          boxes: packProducts(products),
        };
      }),
    };
  }
}
