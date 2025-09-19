import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { OrdersInputDto } from './dto/create-order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('pack')
  process(@Body() input: OrdersInputDto) {
    return this.ordersService.processOrders(input);
  }
}
