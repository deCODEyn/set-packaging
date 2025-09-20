import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrdersInputDto } from './dto/pack-order.dto';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService],
    }).compile();
    service = module.get<OrdersService>(OrdersService);
  });

  it('deve ter o service definido', () => {
    expect(service).toBeDefined();
  });

  it('deve embalar os produtos corretamente', () => {
    const data: OrdersInputDto = {
      pedidos: [
        {
          pedido_id: 1,
          produtos: [
            { produto_id: 'PS5', dimensoes: { altura: 40, largura: 10, comprimento: 25 } },
            { produto_id: 'Volante', dimensoes: { altura: 40, largura: 30, comprimento: 30 } },
          ],
        },
      ],
    };
    const result = service.processOrders(data);
    expect(result.orders[0].boxes.length).toBeGreaterThan(0);
    expect(result.orders[0].boxes[0].products).toContain('PS5');
    expect(result.orders[0].boxes[0].products).toContain('Volante');
  });

  it('deve lidar com dimensões inválidas do produto', () => {
    const data: OrdersInputDto = {
      pedidos: [
        {
          pedido_id: 2,
          produtos: [
            { produto_id: 'Joystick', dimensoes: { altura: 0, largura: 20, comprimento: 10 } },
          ],
        },
      ],
    };
    const result = service.processOrders(data);
    expect(result.orders[0].boxes).toEqual([]);
    expect(result.orders[0].note).toContain('Pedido 2');
  });
});
