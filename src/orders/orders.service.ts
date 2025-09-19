import { Injectable } from '@nestjs/common';
import { OrdersInputDto, OrderDto } from './dto/pack-order.dto';
import { Product } from '../products/entities/product.entity';
import { packProducts } from './utils/set-packaging';

@Injectable()
export class OrdersService {
  processOrders(data: OrdersInputDto) {
    return {
      orders: data.pedidos.map((order: OrderDto) => {
        let invalid = false;

        const products = order.produtos.map((product) => {
          if (
            !product.dimensoes.altura ||
            !product.dimensoes.largura ||
            !product.dimensoes.comprimento
          ) {
            invalid = true;
            return null;
          }
          return new Product(
            product.produto_id,
            product.dimensoes.altura,
            product.dimensoes.largura,
            product.dimensoes.comprimento,
          );
        });
        if (invalid) {
          return {
            orderId: order.pedido_id,
            boxes: [],
            note: `Pedido ${order.pedido_id}: todos os produtos precisam ter altura, largura e comprimento`,
          };
        }
        return {
          orderId: order.pedido_id,
          boxes: packProducts(products as Product[]),
        };
      }),
    };
  }
}
