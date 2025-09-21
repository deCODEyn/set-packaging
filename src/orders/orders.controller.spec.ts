import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersInputDto } from './dto/pack-order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();
    controller = module.get<OrdersController>(OrdersController);
  });

  it('deve ter o controller definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve devolver os pedidos embalados', () => {
    const data: OrdersInputDto = {
      pedidos: [
        {
          pedido_id: 1,
          produtos: [
            {
              produto_id: 'PS5',
              dimensoes: { altura: 40, largura: 10, comprimento: 25 },
            },
          ],
        },
      ],
    };
    const result = controller.process(data);
    expect(result.orders[0].boxes.length).toBeGreaterThan(0);
    expect(result.orders[0].boxes[0].products).toContain('PS5');
  });
});
