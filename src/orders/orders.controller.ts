import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { OrdersInputDto } from './dto/pack-order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('pack')
  @HttpCode(200)
  process(@Body() input: OrdersInputDto) {
    return this.ordersService.processOrders(input);
  }
}
