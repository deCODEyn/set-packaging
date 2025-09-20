import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { OrdersInputDto } from './dto/pack-order.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('pack')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  process(@Body() input: OrdersInputDto) {
    return this.ordersService.processOrders(input);
  }
}
