import { Request, Response } from 'express';
import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StripeService } from './stripe.service';
import { StripeSessionDto } from './dto';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @MessagePattern('create.payment.session')
  createPaymentSession(@Payload() stripeSessionDto: StripeSessionDto) {
    return this.stripeService.createPaymentSession(stripeSessionDto);
  }

  @Post('webhook')
  async stripeWebhook(@Req() req: Request, @Res() res: Response) {
    return this.stripeService.stripeWebhook(req, res);
  }

  @Get('success')
  success() {
    return {
      ok: true,
      message: 'Payment successful',
    };
  }

  @Get('cancelled')
  cancel() {
    return {
      ok: false,
      message: 'Payment cancelled',
    };
  }
}
